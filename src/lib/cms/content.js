import { getPrisma } from "@/lib/db";

const SINGLE_SLUG = "__single__";

export async function getContentCollection(contentKey, fallback = []) {
	const prisma = getPrisma();
	if (!prisma) return fallback;

	try {
	const entries = await prisma.contentEntry.findMany({
		where: { contentKey },
		orderBy: { slug: "asc" },
	});

	if (!entries.length) return fallback;

	return entries
		.map((entry) => {
			try {
				return JSON.parse(entry.data);
			} catch {
				return null;
			}
		})
		.filter(Boolean)
		.sort((a, b) => (a.id || 0) - (b.id || 0));
	} catch (error) {
		console.error(`[cms] getContentCollection(${contentKey}):`, error);
		return fallback;
	}
}

export async function getContentSingleton(contentKey, fallback = null) {
	const prisma = getPrisma();
	if (!prisma) return fallback;

	try {
	const entry = await prisma.contentEntry.findUnique({
		where: {
			contentKey_slug: {
				contentKey,
				slug: SINGLE_SLUG,
			},
		},
	});

	if (!entry) return fallback;

	try {
		return JSON.parse(entry.data);
	} catch {
		return fallback;
	}
	} catch (error) {
		console.error(`[cms] getContentSingleton(${contentKey}):`, error);
		return fallback;
	}
}

export async function saveContentCollectionItem({
	contentKey,
	slug,
	data,
	updatedBy,
}) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");
	return prisma.contentEntry.upsert({
		where: {
			contentKey_slug: { contentKey, slug },
		},
		create: {
			contentKey,
			slug,
			data: JSON.stringify(data),
			updatedBy,
		},
		update: {
			data: JSON.stringify(data),
			updatedBy,
		},
	});
}

export async function saveContentSingleton({ contentKey, data, updatedBy }) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");
	return prisma.contentEntry.upsert({
		where: {
			contentKey_slug: {
				contentKey,
				slug: SINGLE_SLUG,
			},
		},
		create: {
			contentKey,
			slug: SINGLE_SLUG,
			data: JSON.stringify(data),
			updatedBy,
		},
		update: {
			data: JSON.stringify(data),
			updatedBy,
		},
	});
}

export async function saveContentCollectionBulk({
	contentKey,
	items,
	updatedBy,
}) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");
	await prisma.$transaction(async (tx) => {
		await tx.contentEntry.deleteMany({ where: { contentKey } });
		for (const item of items) {
			if (!item?.slug) continue;
			await tx.contentEntry.create({
				data: {
					contentKey,
					slug: item.slug,
					data: JSON.stringify(item),
					updatedBy,
				},
			});
		}
	});
}

export { SINGLE_SLUG };
