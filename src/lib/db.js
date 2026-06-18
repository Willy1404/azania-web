import fs from "fs";
import path from "path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis;

function findBundledDatabase() {
	const candidates = [
		path.join(process.cwd(), "dev.db"),
		path.join(process.cwd(), "prisma", "dev.db"),
	];
	return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function resolveDatabaseUrl() {
	const raw = process.env.DATABASE_URL || "file:./dev.db";
	if (!raw.startsWith("file:")) return raw;

	let filePath = raw.replace(/^file:/, "");
	if (!path.isAbsolute(filePath)) {
		filePath = path.join(process.cwd(), filePath.replace(/^\.\//, ""));
	}

	// Vercel serverless has a read-only app dir — copy SQLite to /tmp on first use.
	if (process.env.VERCEL) {
		const tmpPath = path.join("/tmp", "azania-cms.db");
		if (!fs.existsSync(tmpPath)) {
			const source = fs.existsSync(filePath) ? filePath : findBundledDatabase();
			if (!source) {
				console.error("[db] No SQLite database found to copy on Vercel.");
				return raw;
			}
			fs.copyFileSync(source, tmpPath);
		}
		return `file:${tmpPath}`;
	}

	return `file:${filePath}`;
}

function createPrismaClient() {
	try {
		const adapter = new PrismaBetterSqlite3({
			url: resolveDatabaseUrl(),
		});
		return new PrismaClient({ adapter });
	} catch (error) {
		console.error("[db] Failed to initialize Prisma:", error);
		return null;
	}
}

export function getPrisma() {
	if (!globalForPrisma.prisma) {
		globalForPrisma.prisma = createPrismaClient();
	}
	return globalForPrisma.prisma;
}

/** @deprecated Use getPrisma() — may be null when SQLite is unavailable */
export const prisma = getPrisma();

export default getPrisma;
