import path from "path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis;

function resolveDatabaseUrl() {
	const raw = process.env.DATABASE_URL || "file:./dev.db";
	if (!raw.startsWith("file:")) return raw;

	const filePath = raw.replace(/^file:/, "");
	if (path.isAbsolute(filePath)) return raw;

	const absolute = path.join(process.cwd(), filePath.replace(/^\.\//, ""));
	return `file:${absolute}`;
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
