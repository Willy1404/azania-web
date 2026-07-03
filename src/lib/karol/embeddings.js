import OpenAI from "openai";

let client = null;

export function getOpenAIClient() {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) return null;
	if (!client) {
		client = new OpenAI({ apiKey });
	}
	return client;
}

export function isKarolConfigured() {
	return Boolean(process.env.OPENAI_API_KEY);
}

export async function createEmbedding(text, model = "text-embedding-3-small") {
	const openai = getOpenAIClient();
	if (!openai) {
		throw new Error("OPENAI_API_KEY is not configured.");
	}

	const input = text.replace(/\s+/g, " ").trim().slice(0, 8000);
	const response = await openai.embeddings.create({ model, input });
	return response.data[0].embedding;
}

export async function createEmbeddings(texts, model = "text-embedding-3-small") {
	const openai = getOpenAIClient();
	if (!openai) {
		throw new Error("OPENAI_API_KEY is not configured.");
	}

	const input = texts.map((text) => text.replace(/\s+/g, " ").trim().slice(0, 8000));
	const response = await openai.embeddings.create({ model, input });
	return response.data.map((item) => item.embedding);
}
