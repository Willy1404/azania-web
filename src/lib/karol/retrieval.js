import { getPrisma } from "@/lib/db";
import { createEmbedding, isKarolConfigured } from "@/lib/karol/embeddings";
import { expandQueryForRetrieval, scoreKeywordMatch } from "@/lib/karol/keyword";
import { getKarolSettings } from "@/lib/karol/settings";
import { cosineSimilarity, parseEmbedding } from "@/lib/karol/vectors";

async function loadChunks(prisma) {
	return prisma.karolChunk.findMany({
		include: {
			document: {
				select: { id: true, title: true, category: true, sourceType: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});
}

function rankByKeyword(question, chunks, limit) {
	return chunks
		.map((chunk) => ({
			...chunk,
			score: scoreKeywordMatch(question, chunk.content, chunk.document?.title || ""),
		}))
		.filter((chunk) => chunk.score > 0.15)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);
}

export async function retrieveRelevantChunks(question, limit = 6) {
	const prisma = getPrisma();
	if (!prisma) return [];

	const settings = await getKarolSettings();
	const maxResults = limit || settings.maxChunks;
	const searchQuery = expandQueryForRetrieval(question);
	const chunks = await loadChunks(prisma);
	if (!chunks.length) return [];

	const keywordRanked = rankByKeyword(searchQuery, chunks, maxResults);

	if (!isKarolConfigured()) {
		return keywordRanked.filter((chunk) => chunk.score >= 0.2);
	}

	try {
		const queryEmbedding = await createEmbedding(question, settings.embeddingModel);
		const vectorRanked = chunks
			.map((chunk) => {
				const embedding = parseEmbedding(chunk.embedding);
				const vectorScore = embedding.length
					? cosineSimilarity(queryEmbedding, embedding)
					: 0;
				const keywordScore = scoreKeywordMatch(question, chunk.content, chunk.document?.title || "");
				return {
					...chunk,
					score: vectorScore * 0.75 + keywordScore * 0.25,
				};
			})
			.filter((chunk) => chunk.score >= settings.minSimilarity * 0.85)
			.sort((a, b) => b.score - a.score)
			.slice(0, maxResults);

		return vectorRanked.length ? vectorRanked : keywordRanked;
	} catch (error) {
		console.warn("[karol] Vector retrieval failed, using keyword search:", error?.message);
		return keywordRanked;
	}
}
