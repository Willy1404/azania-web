import { getPrisma } from "@/lib/db";
import { getKarolStatus } from "@/lib/karol/status";

export async function getKarolAnalytics() {
	const prisma = getPrisma();
	if (!prisma) {
		return {
			totalChats: 0,
			activeUsers: 0,
			avgResponseTimeMs: 0,
			satisfactionRate: 0,
			languages: [],
			topQuestions: [],
			topProducts: [],
			failedResponses: 0,
		};
	}

	const [totalChats, activeUsers, assistantMessages, feedbackUp, feedbackDown, languages] =
		await Promise.all([
			prisma.karolConversation.count(),
			prisma.karolConversation.groupBy({ by: ["sessionId"], _count: true }),
			prisma.karolMessage.findMany({
				where: { role: "assistant" },
				select: {
					content: true,
					responseTimeMs: true,
					failed: true,
					sources: true,
					createdAt: true,
				},
				orderBy: { createdAt: "desc" },
				take: 500,
			}),
			prisma.karolFeedback.count({ where: { rating: "up" } }),
			prisma.karolFeedback.count({ where: { rating: "down" } }),
			prisma.karolConversation.groupBy({ by: ["language"], _count: true }),
		]);

	const avgResponseTimeMs =
		assistantMessages.reduce((sum, msg) => sum + (msg.responseTimeMs || 0), 0) /
			(assistantMessages.length || 1);

	const questionCounts = new Map();
	const productCounts = new Map();

	for (const msg of assistantMessages) {
		if (msg.sources) {
			try {
				const sources = JSON.parse(msg.sources);
				for (const source of sources) {
					const key = source.category || source.title;
					productCounts.set(key, (productCounts.get(key) || 0) + 1);
				}
			} catch {
				// ignore malformed audit data
			}
		}
	}

	const userMessages = await prisma.karolMessage.findMany({
		where: { role: "user" },
		select: { content: true },
		orderBy: { createdAt: "desc" },
		take: 200,
	});

	for (const msg of userMessages) {
		const key = msg.content.trim().slice(0, 120);
		if (key) questionCounts.set(key, (questionCounts.get(key) || 0) + 1);
	}

	const topQuestions = [...questionCounts.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 8)
		.map(([question, count]) => ({ question, count }));

	const topProducts = [...productCounts.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 8)
		.map(([product, count]) => ({ product, count }));

	const totalFeedback = feedbackUp + feedbackDown;
	const status = await getKarolStatus();

	return {
		...status,
		totalChats,
		activeUsers: activeUsers.length,
		avgResponseTimeMs: Math.round(avgResponseTimeMs),
		satisfactionRate: totalFeedback ? Math.round((feedbackUp / totalFeedback) * 100) : 0,
		feedbackUp,
		feedbackDown,
		languages: languages.map((item) => ({
			language: item.language || "unknown",
			count: item._count,
		})),
		topQuestions,
		topProducts,
		failedResponses: assistantMessages.filter((msg) => msg.failed).length,
	};
}

export async function getUnansweredQuestions(limit = 50) {
	const prisma = getPrisma();
	if (!prisma) return [];

	const messages = await prisma.karolMessage.findMany({
		where: { role: "assistant", failed: true },
		include: {
			conversation: {
				select: {
					sessionId: true,
					language: true,
					messages: {
						orderBy: { createdAt: "asc" },
						select: { id: true, role: true, content: true },
					},
				},
			},
		},
		orderBy: { createdAt: "desc" },
		take: limit,
	});

	return messages.map((msg) => {
		const convMessages = msg.conversation.messages || [];
		const index = convMessages.findIndex((item) => item.id === msg.id);
		const previous = index > 0 ? convMessages[index - 1] : null;

		return {
			id: msg.id,
			answer: msg.content,
			userQuestion: previous?.role === "user" ? previous.content : null,
			language: msg.conversation.language,
			sessionId: msg.conversation.sessionId,
			createdAt: msg.createdAt,
		};
	});
}

export async function getKarolFeedback(limit = 50) {
	const prisma = getPrisma();
	if (!prisma) return [];

	return prisma.karolFeedback.findMany({
		include: {
			message: {
				select: { content: true, conversationId: true, createdAt: true },
			},
		},
		orderBy: { createdAt: "desc" },
		take: limit,
	});
}

export async function getKarolConversations(limit = 50) {
	const prisma = getPrisma();
	if (!prisma) return [];

	const conversations = await prisma.karolConversation.findMany({
		include: {
			messages: {
				orderBy: { createdAt: "asc" },
				take: 20,
			},
		},
		orderBy: { updatedAt: "desc" },
		take: limit,
	});

	return conversations;
}
