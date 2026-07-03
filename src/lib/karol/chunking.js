const CHUNK_SIZE = 1400;
const CHUNK_OVERLAP = 200;

export function splitIntoChunks(text) {
	const normalized = text.replace(/\r\n/g, "\n").trim();
	if (!normalized) return [];

	const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
	const chunks = [];
	let current = "";

	const pushCurrent = () => {
		const piece = current.trim();
		if (piece) chunks.push(piece);
		current = "";
	};

	for (const paragraph of paragraphs) {
		if (`${current}\n\n${paragraph}`.length <= CHUNK_SIZE) {
			current = current ? `${current}\n\n${paragraph}` : paragraph;
			continue;
		}

		pushCurrent();

		if (paragraph.length <= CHUNK_SIZE) {
			current = paragraph;
			continue;
		}

		let start = 0;
		while (start < paragraph.length) {
			const end = Math.min(start + CHUNK_SIZE, paragraph.length);
			chunks.push(paragraph.slice(start, end).trim());
			if (end >= paragraph.length) break;
			start = Math.max(end - CHUNK_OVERLAP, start + 1);
		}
	}

	pushCurrent();
	return chunks;
}
