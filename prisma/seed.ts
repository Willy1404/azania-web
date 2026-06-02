import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });
const fakeDataDir = path.join(__dirname, "../public/fakedata");

const SINGLE = "__single__";

async function seedCollection(contentKey: string, filename: string) {
	const filePath = path.join(fakeDataDir, filename);
	if (!fs.existsSync(filePath)) return;
	const items = JSON.parse(fs.readFileSync(filePath, "utf8"));
	for (const item of items) {
		await prisma.contentEntry.upsert({
			where: {
				contentKey_slug: { contentKey, slug: item.slug },
			},
			create: {
				contentKey,
				slug: item.slug,
				data: JSON.stringify(item),
				updatedBy: "seed",
			},
			update: {
				data: JSON.stringify(item),
				updatedBy: "seed",
			},
		});
	}
}

async function seedSingleton(contentKey: string, data: unknown) {
	await prisma.contentEntry.upsert({
		where: {
			contentKey_slug: { contentKey, slug: SINGLE },
		},
		create: {
			contentKey,
			slug: SINGLE,
			data: JSON.stringify(data),
			updatedBy: "seed",
		},
		update: {
			data: JSON.stringify(data),
			updatedBy: "seed",
		},
	});
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

	for (const user of users) {
		await prisma.user.upsert({
			where: { email: user.email },
			create: { ...user, password },
			update: { name: user.name, role: user.role, password },
		});
	}

	await seedCollection("business_banking_pages", "business-banking-pages.json");
	await seedCollection("personal_banking_pages", "personal-banking-pages.json");
	await seedCollection("treasury_capital_pages", "treasury-capital-pages.json");

	const homeNews = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "home-news.json"), "utf8")
	);
	await seedSingleton("home_news", homeNews);

	const forexRates = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "forex-rates.json"), "utf8")
	);
	await seedSingleton("forex_rates", forexRates);

	const navItems = JSON.parse(
		fs.readFileSync(path.join(fakeDataDir, "nav-items.json"), "utf8")
	);
	await seedSingleton("nav_items", navItems);

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
	]);

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
	]);

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
	]);

	console.log("Database seeded successfully.");
	console.log("Default password for all users: ChangeMe123!");
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
