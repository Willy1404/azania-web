import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../public/uploads/cms");

const MIME_BY_EXT = {
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".mp4": "video/mp4",
	".webm": "video/webm",
	".mov": "video/quicktime",
	".pdf": "application/pdf",
};

function getKind(mimeType) {
	if (mimeType.startsWith("image/")) return "image";
	if (mimeType.startsWith("video/")) return "video";
	if (mimeType === "application/pdf") return "document";
	return null;
}

async function main() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error("DATABASE_URL is not configured.");
	}

	const prisma = new PrismaClient({ adapter: new PrismaMariaDb(databaseUrl) });

	let migrated = 0;
	let skipped = 0;

	try {
		const entries = await fs.readdir(uploadDir, { withFileTypes: true });

		for (const entry of entries) {
			if (!entry.isFile() || entry.name === ".gitkeep") continue;

			const filepath = path.join(uploadDir, entry.name);
			const ext = path.extname(entry.name).toLowerCase();
			const mimeType = MIME_BY_EXT[ext];
			const kind = mimeType ? getKind(mimeType) : null;

			if (!kind) {
				console.warn(`Skipping unsupported file: ${entry.name}`);
				skipped += 1;
				continue;
			}

			const existing = await prisma.mediaAsset.findFirst({
				where: { filename: entry.name },
			});

			if (existing) {
				skipped += 1;
				continue;
			}

			const buffer = await fs.readFile(filepath);
			await prisma.mediaAsset.create({
				data: {
					filename: entry.name,
					mimeType,
					kind,
					size: buffer.length,
					data: buffer,
					uploadedBy: "migrate-uploads",
				},
			});

			migrated += 1;
			console.log(`Migrated: ${entry.name}`);
		}

		console.log(`Done. ${migrated} file(s) moved into database, ${skipped} skipped.`);
		console.log("Update CMS image URLs from /uploads/cms/... to /api/cms/media/{id} if needed.");
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
