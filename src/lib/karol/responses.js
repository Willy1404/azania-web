import { getKarolFallbackMessage } from "@/lib/karol/constants";
import { getOpenAIClient } from "@/lib/karol/embeddings";
import { isBankingQuestion, isConversationalMessage } from "@/lib/karol/conversational";

function buildInstructions({ settings, context, hasContext, message, language }) {
	const fallback = getKarolFallbackMessage(language);
	const system = `${settings.systemPrompt}

Language for this reply: ${language === "sw" ? "Swahili" : "English"}.`;

	if (hasContext) {
		return `${system}

Official Azania Bank knowledge-base context (use this for banking answers):
${context}

When you answer a banking question from context, you may end with:
Related questions:
- question one
- question two
- question three`;
	}

	if (isConversationalMessage(message) || !isBankingQuestion(message)) {
		return `${system}

This is casual conversation, not a specific banking lookup. Reply naturally and briefly in the customer's language. Do not use a fallback or "contact customer care" message.`;
	}

	return `${system}

No official context was found for this banking question. Reply with exactly: "${fallback}"`;
}

function buildResponseInput({ history, message }) {
	const items = history.slice(-10).map((item) => ({
		role: item.role === "assistant" ? "assistant" : "user",
		content: item.content,
	}));

	items.push({ role: "user", content: message });
	return items;
}

function buildModelOptions(settings) {
	if (/^gpt-5/i.test(settings.model)) {
		return { reasoning: { effort: "medium" } };
	}

	return { temperature: settings.temperature };
}

export async function createKarolResponse({
	settings,
	message,
	history,
	context,
	hasContext,
	language,
}) {
	const openai = getOpenAIClient();
	if (!openai) {
		throw new Error("OPENAI_API_KEY is not configured.");
	}

	const fallback = getKarolFallbackMessage(language);
	const response = await openai.responses.create({
		model: settings.model,
		instructions: buildInstructions({ settings, context, hasContext, message, language }),
		input: buildResponseInput({ history, message }),
		...buildModelOptions(settings),
	});

	return response.output_text?.trim() || fallback;
}
