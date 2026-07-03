import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis;
const DB_RETRY_MS = 15_000;

function parsePoolConfig(databaseUrl) {
	try {
		const url = new URL(databaseUrl);
		return {
			host: url.hostname,
			port: Number(url.port) || 3306,
			user: decodeURIComponent(url.username),
			password: decodeURIComponent(url.password),
			database: url.pathname.replace(/^\//, ""),
			connectionLimit: 5,
			connectTimeout: 3000,
			acquireTimeout: 3000,
		};
	} catch {
		return databaseUrl;
	}
}

export function isDatabaseUnavailable() {
	const markedAt = globalForPrisma.dbUnavailableAt;
	if (!markedAt) return false;
	if (Date.now() - markedAt > DB_RETRY_MS) {
		globalForPrisma.dbUnavailableAt = undefined;
		return false;
	}
	return true;
}

export function markDatabaseUnavailable() {
	globalForPrisma.dbUnavailableAt = Date.now();
	globalForPrisma.prisma = null;
}

export function createPrismaClient() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl || isDatabaseUnavailable()) {
		return null;
	}

	try {
		const config = parsePoolConfig(databaseUrl);
		const adapter = new PrismaMariaDb(config);
		return new PrismaClient({ adapter });
	} catch (error) {
		console.warn("[db] Failed to initialize Prisma:", error?.message || error);
		markDatabaseUnavailable();
		return null;
	}
}

export function getPrisma() {
	if (isDatabaseUnavailable()) {
		return null;
	}
	if (!globalForPrisma.prisma) {
		globalForPrisma.prisma = createPrismaClient();
	}
	return globalForPrisma.prisma;
}

/** @deprecated Use getPrisma() — may be null when the database is unavailable */
export const prisma = getPrisma();

export default getPrisma;
