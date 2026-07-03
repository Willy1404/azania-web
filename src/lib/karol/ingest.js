import { getPrisma } from "@/lib/db";
import { splitIntoChunks } from "@/lib/karol/chunking";
import { createEmbeddings, isKarolConfigured } from "@/lib/karol/embeddings";
import { extractTextFromBuffer } from "@/lib/karol/extract";
import { getKarolSettings } from "@/lib/karol/settings";
import { serializeEmbedding } from "@/lib/karol/vectors";

export async function indexDocumentText(documentId, text, metadata = {}) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");

	const settings = await getKarolSettings();
	const normalizedText = text.replace(/\s+/g, " ").trim();
	const chunks = splitIntoChunks(normalizedText);

	if (!chunks.length) {
		await prisma.karolDocument.update({
			where: { id: documentId },
			data: {
				status: "failed",
				errorMsg: "No readable text found.",
				chunkCount: 0,
				sourceText: normalizedText || null,
			},
		});
		return 0;
	}

	await prisma.karolChunk.deleteMany({ where: { documentId } });

	let embeddings = chunks.map(() => []);
	if (isKarolConfigured()) {
		try {
			embeddings = await createEmbeddings(chunks, settings.embeddingModel);
		} catch (error) {
			console.warn("[karol] Embedding generation failed, storing text-only chunks:", error?.message);
		}
	}

	const rows = chunks.map((content, chunkIndex) => ({
		documentId,
		content,
		embedding: serializeEmbedding(embeddings[chunkIndex] || []),
		chunkIndex,
		metadata: JSON.stringify({ ...metadata, chunkIndex }),
	}));

	for (let i = 0; i < rows.length; i += 20) {
		await prisma.karolChunk.createMany({ data: rows.slice(i, i + 20) });
	}

	await prisma.karolDocument.update({
		where: { id: documentId },
		data: {
			status: "indexed",
			chunkCount: rows.length,
			sourceText: normalizedText,
			errorMsg: null,
			updatedAt: new Date(),
		},
	});

	return rows.length;
}

export async function ingestUploadedDocument({
	buffer,
	filename,
	mimeType,
	title,
	category,
	uploadedBy,
}) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");

	const document = await prisma.karolDocument.create({
		data: {
			title,
			category,
			filename,
			mimeType,
			sourceType: "upload",
			status: "processing",
			uploadedBy,
		},
	});

	try {
		const text = await extractTextFromBuffer(buffer, mimeType, filename);
		await indexDocumentText(document.id, text, { title, category, filename });
		return prisma.karolDocument.findUnique({ where: { id: document.id } });
	} catch (error) {
		await prisma.karolDocument.update({
			where: { id: document.id },
			data: {
				status: "failed",
				errorMsg: error.message || "Indexing failed.",
			},
		});
		throw error;
	}
}

export async function reindexDocument(documentId) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");

	const document = await prisma.karolDocument.findUnique({ where: { id: documentId } });
	if (!document) throw new Error("Document not found.");

	await prisma.karolDocument.update({
		where: { id: documentId },
		data: { status: "processing", errorMsg: null },
	});

	if (document.sourceType === "cms") {
		const { syncCmsDocumentById } = await import("@/lib/karol/cms-sync");
		return syncCmsDocumentById(documentId);
	}

	if (document.sourceText) {
		await indexDocumentText(document.id, document.sourceText, {
			title: document.title,
			category: document.category,
			filename: document.filename,
		});
		return documentId;
	}

	throw new Error("No stored text found for this document. Please upload it again.");
}

export async function deleteKarolDocument(documentId) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");
	await prisma.karolDocument.delete({ where: { id: documentId } });
}

export async function reindexAllDocuments() {
	const { syncAllCmsContent } = await import("@/lib/karol/cms-sync");
	return syncAllCmsContent();
}
