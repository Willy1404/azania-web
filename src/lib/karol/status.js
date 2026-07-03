import { getPrisma } from "@/lib/db";
import { isKarolConfigured } from "@/lib/karol/embeddings";
import { getKarolSettings } from "@/lib/karol/settings";

export async function getKarolStatus() {
	const prisma = getPrisma();
	const settings = await getKarolSettings();
	const hasApiKey = isKarolConfigured();

	let knowledgeChunks = 0;
	let knowledgeDocuments = 0;

	if (prisma) {
		[knowledgeChunks, knowledgeDocuments] = await Promise.all([
			prisma.karolChunk.count(),
			prisma.karolDocument.count({ where: { status: "indexed" } }),
		]);
	}

	return {
		enabled: settings.enabled,
		hasApiKey,
		model: settings.model,
		knowledgeChunks,
		knowledgeDocuments,
		ready: settings.enabled && knowledgeChunks > 0 && (hasApiKey || knowledgeChunks > 0),
		aiMode: hasApiKey ? "openai-responses" : knowledgeChunks > 0 ? "knowledge-base" : "unconfigured",
	};
}
