import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { azaniaLipaSolutions } from "../src/libs/azaniaLipaSolutions";
import {
	azaniaWhatsappConfig,
	azaniaWhatsappFeatures,
	azaniaWhatsappGuideSteps,
	azaniaWhatsappMenuOptions,
} from "../src/libs/azaniaWhatsappBanking";
import { homepageDefaults } from "../src/libs/homepageDefaults";
import { KAROL_DEFAULT_SETTINGS } from "../src/lib/karol/constants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaMariaDb(databaseUrl);
const prisma = new PrismaClient({ adapter });
const fakeDataDir = path.join(__dirname, "../public/fakedata");

const SINGLE = "__single__";

async function seedCollection(contentKey: string, filename: string) {
	const filePath = path.join(fakeDataDir, filename);
	if (!fs.existsSync(filePath)) return { created: 0, skipped: 0 };
	let items = JSON.parse(fs.readFileSync(filePath, "utf8"));

	if (contentKey === "business_banking_pages") {
		items = items.map((item: { slug: string }) => {
			if (item.slug === "azania-lipa") {
				return {
					...item,
					layout: "product",
					bannerImage: "/images/ban.png",
					heroImage: "/images/scan3.png",
					solutions: azaniaLipaSolutions,
					asideConfig: {
						ctaText: "Register for Azania LIPA",
						ctaUrl: "/open-account",
						solutionsLabel: "Our collection solutions",
						photoTitle: "Built for growing businesses",
						photoDesc:
							"From retail counters to online stores — collect payments your way with Azania LIPA.",
						supportTitle: "Business support",
						stats: [
							{ value: "24/7", label: "Digital collections" },
							{ value: "Real-time", label: "Payment alerts" },
						],
					},
				};
			}
			if (item.slug === "whatsapp-banking") {
				return {
					...item,
					layout: "whatsapp",
					bannerImage: "/images/ban.png",
					whatsappConfig: {
						...azaniaWhatsappConfig,
						guideSteps: azaniaWhatsappGuideSteps,
						menuOptions: azaniaWhatsappMenuOptions,
						featureList: azaniaWhatsappFeatures,
					},
				};
			}
			return {
				...item,
				layout: item.layout || "product",
				bannerImage: item.bannerImage || "/images/ban.png",
			};
		});
	}

	let created = 0;
	let skipped = 0;

	for (const item of items) {
		const existing = await prisma.contentEntry.findUnique({
			where: {
				contentKey_slug: { contentKey, slug: item.slug },
			},
		});

		if (existing) {
			skipped += 1;
			continue;
		}

		await prisma.contentEntry.create({
			data: {
				contentKey,
				slug: item.slug,
				data: JSON.stringify(item),
				updatedBy: "seed",
			},
		});
		created += 1;
	}

	return { created, skipped };
}

async function seedSingleton(contentKey: string, data: unknown) {
	const existing = await prisma.contentEntry.findUnique({
		where: {
			contentKey_slug: { contentKey, slug: SINGLE },
		},
	});

	if (existing) {
		return { created: 0, skipped: 1 };
	}

	await prisma.contentEntry.create({
		data: {
			contentKey,
			slug: SINGLE,
			data: JSON.stringify(data),
			updatedBy: "seed",
		},
	});

	return { created: 1, skipped: 0 };
}

async function main() {
	const password = await bcrypt.hash("ChangeMe123!", 12);

	const users = [
		{
			email: "admin@azaniabank.co.tz",
			name: "Site Administrator",
			role: "ADMIN" as const,
		},
		{
			email: "business@azaniabank.co.tz",
			name: "Business Banking Manager",
			role: "BUSINESS_BANKING" as const,
		},
		{
			email: "personal@azaniabank.co.tz",
			name: "Personal Banking Manager",
			role: "PERSONAL_BANKING" as const,
		},
		{
			email: "treasury@azaniabank.co.tz",
			name: "Treasury & Capital Manager",
			role: "TREASURY_CAPITAL" as const,
		},
	];

	let usersCreated = 0;
	let usersSkipped = 0;

	for (const user of users) {
		const existing = await prisma.user.findUnique({ where: { email: user.email } });
		if (existing) {
			usersSkipped += 1;
			continue;
		}

		await prisma.user.create({
			data: { ...user, password },
		});
		usersCreated += 1;
	}

	const contentStats = [];

	contentStats.push(
		await seedCollection("business_banking_pages", "business-banking-pages.json")
	);
	contentStats.push(
		await seedCollection("personal_banking_pages", "personal-banking-pages.json")
	);
	contentStats.push(
		await seedCollection("treasury_capital_pages", "treasury-capital-pages.json")
	);

	const homeNews = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "home-news.json"), "utf8")
	);
	contentStats.push(await seedSingleton("home_news", homeNews));
	contentStats.push(await seedSingleton("homepage", homepageDefaults));

	const forexRates = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "forex-rates.json"), "utf8")
	);
	contentStats.push(await seedSingleton("forex_rates", forexRates));

	const navItems = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "nav-items.json"), "utf8")
	);
	contentStats.push(await seedSingleton("nav_items", navItems));
	contentStats.push(await seedSingleton("karol_settings", KAROL_DEFAULT_SETTINGS));

	contentStats.push(
		await seedSingleton("faq_items", [
			{
				question: "How do I open an account with Azania Bank?",
				answer:
					"Visit any Azania Bank branch with valid identification, proof of address, and completed account opening forms. Our staff will guide you through the process.",
			},
			{
				question: "What digital banking channels are available?",
				answer:
					"Azania Bank offers mobile banking, internet banking, WhatsApp banking, and agency banking (WAKALA) for eligible accounts.",
			},
			{
				question: "How can I reset my internet banking password?",
				answer:
					"Contact your branch or call our customer support line. You may also use the password reset option on the internet banking login page if enabled.",
			},
			{
				question: "What are your banking hours?",
				answer:
					"Branches are typically open Monday to Friday, 8:00 AM to 5:00 PM. Agency banking points may have extended hours.",
			},
			{
				question: "How do I report a lost or stolen card?",
				answer:
					"Contact Azania Bank immediately by phone or visit your nearest branch to block your card and request a replacement.",
			},
			{
				question: "Where can I find current fees and charges?",
				answer:
					"View our Tariff Guide under the Support menu or request a copy at any Azania Bank branch.",
			},
		])
	);

	contentStats.push(
		await seedSingleton("reports", [
			{
				year: "2025",
				title: "Annual Report 2025",
				desc: "Comprehensive overview of Azania Bank performance, strategy, and governance for the financial year.",
				type: "Annual",
			},
			{
				year: "2024",
				title: "Annual Report 2024",
				desc: "Financial statements, management discussion, and corporate governance report.",
				type: "Annual",
			},
			{
				year: "2025",
				title: "Quarterly Financial Statement Q4 2025",
				desc: "Unaudited quarterly results and key performance indicators.",
				type: "Quarterly",
			},
		])
	);

	contentStats.push(
		await seedSingleton("tariff_sections", [
			{
				title: "Account Maintenance",
				items: [
					{ service: "Current Account", fee: "TZS 15,000 / month" },
					{ service: "Savings Account", fee: "TZS 5,000 / month" },
				],
			},
			{
				title: "Transfers & Payments",
				items: [
					{ service: "Internal Transfer", fee: "TZS 1,000" },
					{ service: "RTGS Transfer", fee: "TZS 5,000" },
				],
			},
		])
	);

	const totals = contentStats.reduce(
		(acc, stat) => ({
			created: acc.created + stat.created,
			skipped: acc.skipped + stat.skipped,
		}),
		{ created: 0, skipped: 0 }
	);

	console.log("Database seeded successfully.");
	console.log(`Users: ${usersCreated} created, ${usersSkipped} already existed (unchanged).`);
	console.log(
		`Content: ${totals.created} entries created, ${totals.skipped} existing entries left unchanged.`
	);
	console.log("Default password for new users: ChangeMe123!");

	try {
		const { syncAllCmsContent } = await import("../src/lib/karol/cms-sync");
		const karolResult = await syncAllCmsContent();
		console.log(
			`Karol: ${karolResult.total} documents (${karolResult.created} new, ${karolResult.updated} updated, ${karolResult.unchanged} unchanged).`
		);
	} catch (error) {
		console.warn("Karol knowledge sync skipped:", error?.message || error);
	}
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
