import * as cheerio from "cheerio";

export async function extractTextFromBuffer(buffer, mimeType, filename = "") {
	switch (mimeType) {
		case "text/plain":
		case "text/markdown":
			return buffer.toString("utf8");
		case "text/html":
			return extractHtml(buffer.toString("utf8"));
		case "application/pdf":
			return extractPdf(buffer);
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			return extractDocx(buffer);
		default:
			throw new Error(`Unsupported file type: ${mimeType || filename}`);
	}
}

function extractHtml(html) {
	const $ = cheerio.load(html);
	$("script, style, noscript").remove();
	return $("body").text().replace(/\s+/g, " ").trim();
}

async function extractPdf(buffer) {
	const pdfParse = (await import("pdf-parse")).default;
	const result = await pdfParse(buffer);
	return result.text || "";
}

async function extractDocx(buffer) {
	const mammoth = await import("mammoth");
	const result = await mammoth.extractRawText({ buffer });
	return result.value || "";
}
