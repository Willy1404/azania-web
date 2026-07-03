import { getContentCollection, getContentSingleton } from "@/lib/cms/content";
import { getPrisma } from "@/lib/db";
import { indexDocumentText } from "@/lib/karol/ingest";

const BANK_CONTACT_TEXT = `Azania Bank Customer Care
Visit any Azania Bank branch across Tanzania for in-person support.
Website: https://www.azaniabank.co.tz
Contact page: /contact
For account opening, visit a branch with valid ID and proof of address.
For lost or stolen cards, contact the bank immediately to block your card.
Banking hours: Monday to Friday, 8:00 AM to 5:00 PM (branches).`;

function collectStrings(value, parts = []) {
	if (!value) return parts;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed) parts.push(trimmed);
		return parts;
	}
	if (Array.isArray(value)) {
		for (const item of value) collectStrings(item, parts);
		return parts;
	}
	if (typeof value === "object") {
		for (const key of ["title", "name", "label", "desc", "description", "content", "body", "summary", "intro", "overview", "text", "answer", "question", "fee", "service", "ctaText", "tagline", "phone", "phoneNumber", "number"]) {
			if (value[key]) collectStrings(value[key], parts);
		}
		for (const nested of ["items", "features", "faqs", "steps", "benefits", "requirements", "products", "sections", "solutions", "rates", "guideSteps", "menuOptions", "featureList", "stats"]) {
			if (value[nested]) collectStrings(value[nested], parts);
		}
	}
	return parts;
}

function flattenPage(page) {
	return collectStrings(page).join("\n\n");
}

function flattenHomepage(homepage) {
	const parts = [
		"Azania Bank homepage",
		homepage?.hero?.titleMain,
		homepage?.hero?.titleSub,
		homepage?.hero?.tagline,
		homepage?.about?.eyebrow,
		homepage?.about?.title,
		homepage?.about?.description,
		homepage?.newsSection?.title,
	];
	return parts.filter(Boolean).join("\n\n");
}

async function upsertCmsDocument({ title, category, sourceKey, text }) {
	const prisma = getPrisma();
	if (!prisma) throw new Error("Database unavailable");

	const normalized = text.replace(/\s+/g, " ").trim();
	if (!normalized) return null;

	let document = await prisma.karolDocument.findFirst({
		where: { sourceType: "cms", sourceKey },
	});

	if (
		document?.sourceText === normalized &&
		document.status === "indexed" &&
		document.chunkCount > 0
	) {
		return { action: "unchanged", chunks: document.chunkCount };
	}

	const isNew = !document;

	if (!document) {
		document = await prisma.karolDocument.create({
			data: {
				title,
				category,
				sourceType: "cms",
				sourceKey,
				status: "processing",
				uploadedBy: "cms-sync",
			},
		});
	} else {
		await prisma.karolDocument.update({
			where: { id: document.id },
			data: { title, category, status: "processing", errorMsg: null },
		});
	}

	const chunks = await indexDocumentText(document.id, normalized, { title, category, sourceKey });
	return { action: isNew ? "created" : "updated", chunks };
}

export async function syncAllCmsContent() {
	const results = [];

	results.push(
		await upsertCmsDocument({
			title: "Customer Care & Contact",
			category: "Branch Information",
			sourceKey: "bank:contact",
			text: BANK_CONTACT_TEXT,
		})
	);

	const faqItems = await getContentSingleton("faq_items", []);
	for (const [index, item] of faqItems.entries()) {
		const text = `Question: ${item.question}\nAnswer: ${item.answer}`;
		results.push(
			await upsertCmsDocument({
				title: item.question,
				category: "FAQs",
				sourceKey: `faq:${index}`,
				text,
			})
		);
	}

	const tariff = await getContentSingleton("tariff_sections", []);
	for (const [sIndex, section] of tariff.entries()) {
		const lines = (section.items || []).map((row) => `${row.service}: ${row.fee}`);
		const text = `${section.title}\n${lines.join("\n")}`;
		results.push(
			await upsertCmsDocument({
				title: section.title,
				category: "Charges",
				sourceKey: `tariff:${sIndex}`,
				text,
			})
		);
	}

	const forex = await getContentSingleton("forex_rates", null);
	if (forex?.rates?.length) {
		const lines = forex.rates.map(
			(rate) => `${rate.currency || rate.code}: Buy ${rate.buy} / Sell ${rate.sell}`
		);
		results.push(
			await upsertCmsDocument({
				title: "Forex Rates",
				category: "Forex Rates",
				sourceKey: "forex_rates",
				text: `Official forex rates\n${lines.join("\n")}`,
			})
		);
	}

	const homepage = await getContentSingleton("homepage", null);
	if (homepage) {
		results.push(
			await upsertCmsDocument({
				title: "Azania Bank Homepage",
				category: "Website Pages",
				sourceKey: "homepage",
				text: flattenHomepage(homepage),
			})
		);
	}

	const reports = await getContentSingleton("reports", []);
	for (const [index, report] of reports.entries()) {
		const text = [report.title, report.desc, report.type, report.year].filter(Boolean).join("\n");
		results.push(
			await upsertCmsDocument({
				title: report.title || `Report ${index + 1}`,
				category: "Policies",
				sourceKey: `reports:${index}`,
				text,
			})
		);
	}

	for (const [key, category] of [
		["business_banking_pages", "Website Pages"],
		["personal_banking_pages", "Website Pages"],
		["treasury_capital_pages", "Website Pages"],
	]) {
		const pages = await getContentCollection(key, []);
		for (const page of pages) {
			if (!page.slug || page.slug.includes("-hub")) continue;
			results.push(
				await upsertCmsDocument({
					title: page.title,
					category,
					sourceKey: `${key}:${page.slug}`,
					text: flattenPage(page),
				})
			);
		}
	}

	const summary = results.filter(Boolean).reduce(
		(acc, item) => {
			acc.total += 1;
			acc[item.action] = (acc[item.action] || 0) + 1;
			acc.totalChunks += item.chunks || 0;
			return acc;
		},
		{ total: 0, created: 0, updated: 0, unchanged: 0, totalChunks: 0 }
	);

	return {
		indexed: summary.total,
		...summary,
	};
}

export async function syncCmsDocumentById(documentId) {
	const prisma = getPrisma();
	const document = await prisma.karolDocument.findUnique({ where: { id: documentId } });
	if (!document?.sourceKey) throw new Error("CMS document source not found.");
	await syncAllCmsContent();
	return documentId;
}
