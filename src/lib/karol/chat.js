import { getPrisma } from "@/lib/db";
import { getKarolFallbackMessage } from "@/lib/karol/constants";
import {
	getConversationalReply,
	isBankingQuestion,
	isConversationalMessage,
} from "@/lib/karol/conversational";
import { isKarolConfigured } from "@/lib/karol/embeddings";
import { retrieveRelevantChunks } from "@/lib/karol/retrieval";
import { createKarolResponse } from "@/lib/karol/responses";
import { getKarolSettings } from "@/lib/karol/settings";

function detectLanguage(text) {
	const swahiliHints =
		/\b(ni|na|kwa|ya|huduma|akaunti|mkopo|bei|habari|asante|ninawezaje|nini|je|gani|naweza|kuuliza|swali|mambo|shikamoo|karibu|tafadhali|ndiyo|bila|shaka)\b/i;
	return swahiliHints.test(text) ? "sw" : "en";
}

function buildContext(chunks) {
	return chunks
		.map(
			(chunk, index) =>
				`[Source ${index + 1}: ${chunk.document.title} | ${chunk.document.category}]\n${chunk.content}`
		)
		.join("\n\n---\n\n");
}

function parseRelatedQuestions(content) {
	const match = content.match(/Related questions:\s*([\s\S]*)$/i);
	if (!match) return { answer: content.trim(), related: [] };
	const answer = content.slice(0, match.index).trim();
	const related = match[1]
		.split("\n")
		.map((line) => line.replace(/^[-*\d.]+\s*/, "").trim())
		.filter(Boolean)
		.slice(0, 3);
	return { answer, related };
}

function cleanChunkText(content) {
	const faqAnswer = content.match(/Answer:\s*([\s\S]+)$/i);
	if (content.match(/^Question:/i) && faqAnswer) {
		return faqAnswer[1].replace(/\s+/g, " ").trim();
	}

	return content
		.replace(/^Question:\s*/i, "")
		.replace(/\s*Answer:\s*/i, "\n\n")
		.replace(/\s+/g, " ")
		.trim();
}

function buildExtractiveAnswer(chunks, language) {
	if (!chunks.length) return null;

	const text = cleanChunkText(chunks[0].content);
	let answer = text;

	if (answer.length > 1400) {
		answer = `${answer.slice(0, 1400).trim()}...`;
	}

	if (language === "sw") {
		return `Hivi ndivyo Azania Bank inavyotoa taarifa:\n\n${answer}`;
	}

	return answer;
}

function buildRelatedFromChunks(chunks) {
	const related = [];

	for (const chunk of chunks.slice(1, 5)) {
		const faqMatch = chunk.content.match(/^Question:\s*(.+?)(?:\n|$)/i);
		if (faqMatch?.[1]) {
			related.push(faqMatch[1].trim());
			continue;
		}
		if (chunk.document?.title && !related.includes(chunk.document.title)) {
			related.push(chunk.document.title);
		}
	}

	return related.slice(0, 3);
}

async function runOpenAiChat({ settings, message, history, chunks, language }) {
	const context = buildContext(chunks);
	const hasContext = chunks.length > 0;
	const fallback = getKarolFallbackMessage(language);

	const rawAnswer = await createKarolResponse({
		settings,
		message,
		history,
		context,
		hasContext,
		language,
	});

	const { answer, related } = parseRelatedQuestions(rawAnswer);
	const failed =
		isBankingQuestion(message) &&
		(!hasContext || answer.includes(fallback) || answer.length < 8);

	return { answer, related, failed };
}

function runKnowledgeBaseChat({ chunks, language }) {
	const answer = buildExtractiveAnswer(chunks, language);
	if (!answer) {
		return {
			answer: getKarolFallbackMessage(language),
			related: [],
			failed: true,
		};
	}

	return {
		answer,
		related: buildRelatedFromChunks(chunks),
		failed: false,
	};
}

export async function runKarolChat({ sessionId, message, history = [] }) {
	const settings = await getKarolSettings();
	const language = detectLanguage(message);

	if (!settings.enabled) {
		return {
			answer:
				language === "sw"
					? "Karol haipatikani kwa sasa. Tafadhali wasiliana na huduma kwa wateja."
					: "Karol is currently unavailable. Please contact customer care.",
			language,
			sources: [],
			relatedQuestions: [],
			failed: true,
			responseTimeMs: 0,
		};
	}

	const started = Date.now();
	const bankingQuestion = isBankingQuestion(message);
	const chunks = bankingQuestion
		? await retrieveRelevantChunks(message, settings.maxChunks)
		: [];

	let answer;
	let related = [];
	let failed;

	if (isKarolConfigured()) {
		try {
			const result = await runOpenAiChat({ settings, message, history, chunks, language });
			answer = result.answer;
			related = result.related;
			failed = result.failed;
		} catch (error) {
			console.warn("[karol] OpenAI chat failed, using knowledge-base fallback:", error?.message);
			const conversationalReply = getConversationalReply(message, language, settings);
			const fallback = runKnowledgeBaseChat({ chunks, language });
			answer =
				conversationalReply ||
				fallback.answer ||
				getKarolFallbackMessage(language);
			related = fallback.related;
			failed = !conversationalReply && fallback.failed;
		}
	} else {
		const conversationalReply = getConversationalReply(message, language, settings);
		if (conversationalReply) {
			answer = conversationalReply;
			failed = false;
		} else {
			const result = runKnowledgeBaseChat({ chunks, language });
			answer = result.answer;
			related = result.related;
			failed = result.failed;
		}
	}

	const sources = chunks.map((chunk) => ({
		documentId: chunk.document.id,
		title: chunk.document.title,
		category: chunk.document.category,
		score: Number((chunk.score || 0).toFixed(3)),
		excerpt: chunk.content.slice(0, 220),
	}));

	const responseTimeMs = Date.now() - started;
	const conversation = await saveConversationTurn({
		sessionId,
		language,
		userMessage: message,
		assistantMessage: answer,
		sources,
		relatedQuestions: related,
		responseTimeMs,
		failed,
	});

	return {
		answer,
		language,
		sources,
		relatedQuestions: related,
		failed,
		responseTimeMs,
		conversationId: conversation.conversationId,
		messageId: conversation.messageId,
	};
}

async function saveConversationTurn({
	sessionId,
	language,
	userMessage,
	assistantMessage,
	sources,
	relatedQuestions,
	responseTimeMs,
	failed,
}) {
	const prisma = getPrisma();
	if (!prisma) {
		return { conversationId: null, messageId: null };
	}

	let conversation = await prisma.karolConversation.findFirst({
		where: { sessionId },
		orderBy: { updatedAt: "desc" },
	});

	if (!conversation) {
		conversation = await prisma.karolConversation.create({
			data: { sessionId, language },
		});
	}

	await prisma.karolMessage.create({
		data: {
			conversationId: conversation.id,
			role: "user",
			content: userMessage,
		},
	});

	const assistant = await prisma.karolMessage.create({
		data: {
			conversationId: conversation.id,
			role: "assistant",
			content: assistantMessage,
			sources: JSON.stringify(sources),
			relatedQuestions: JSON.stringify(relatedQuestions),
			responseTimeMs,
			failed,
		},
	});

	await prisma.karolConversation.update({
		where: { id: conversation.id },
		data: { language, updatedAt: new Date() },
	});

	return { conversationId: conversation.id, messageId: assistant.id };
}
