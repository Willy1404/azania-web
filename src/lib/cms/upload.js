import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/cms");

const ALLOWED_TYPES = {
	image: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
	video: ["video/mp4", "video/webm", "video/quicktime"],
	document: ["application/pdf"],
};

const MAX_SIZE = {
	image: 10 * 1024 * 1024,
	video: 50 * 1024 * 1024,
	document: 20 * 1024 * 1024,
};

function sanitizeFilename(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9.-]/g, "-")
		.replace(/-+/g, "-")
		.slice(0, 80);
}

function getMediaKind(mimeType) {
	if (ALLOWED_TYPES.image.includes(mimeType)) return "image";
	if (ALLOWED_TYPES.video.includes(mimeType)) return "video";
	if (ALLOWED_TYPES.document.includes(mimeType)) return "document";
	return null;
}

export async function saveUploadedFile(file) {
	if (!file || typeof file === "string") {
		throw new Error("No file provided.");
	}

	const kind = getMediaKind(file.type);
	if (!kind) {
		throw new Error("Unsupported file type. Use JPG, PNG, WebP, GIF, MP4, WebM, or PDF.");
	}

	if (file.size > MAX_SIZE[kind]) {
		throw new Error(`File is too large. Maximum size is ${MAX_SIZE[kind] / (1024 * 1024)}MB.`);
	}

	await fs.mkdir(UPLOAD_DIR, { recursive: true });

	const ext = path.extname(file.name) || (kind === "document" ? ".pdf" : "");
	const filename = `${Date.now()}-${sanitizeFilename(path.basename(file.name, ext))}${ext}`;
	const filepath = path.join(UPLOAD_DIR, filename);

	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(filepath, buffer);

	return {
		url: `/uploads/cms/${filename}`,
		kind,
		filename,
	};
}
