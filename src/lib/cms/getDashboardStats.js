import {
	getContentCollection,
	getContentSingleton,
} from "@/lib/cms/content";
import { ADMIN_NAV_MODULE_KEYS, getModulesForRole } from "@/lib/cms/portals";

async function countModuleItems(module) {
	if (module.key === "homepage") {
		const news = await getContentSingleton("home_news", []);
		const newsCount = Array.isArray(news) ? news.length : 0;
		return newsCount + 1;
	}

	if (module.key === "about_azania_bank") {
		const reports = await getContentSingleton("reports", []);
		return Array.isArray(reports) ? reports.length : 0;
	}

	if (module.key === "support") {
		const faq = await getContentSingleton("faq_items", []);
		const tariff = await getContentSingleton("tariff_sections", []);
		const faqCount = Array.isArray(faq) ? faq.length : 0;
		const tariffCount = Array.isArray(tariff) ? tariff.length : 0;
		return faqCount + tariffCount;
	}

	if (module.collection) {
		const items = await getContentCollection(module.key, []);
		return Array.isArray(items) ? items.length : 0;
	}

	const data = await getContentSingleton(module.key, null);
	if (Array.isArray(data)) return data.length;
	if (data && typeof data === "object") {
		if (Array.isArray(data.rates)) return data.rates.length;
		if (Array.isArray(data.items)) return data.items.length;
		if (Array.isArray(data.sections)) return data.sections.length;
		return Object.keys(data).length > 0 ? 1 : 0;
	}

	return 0;
}

export async function getDashboardStats(role) {
	const modules = getModulesForRole(role).filter((module) => {
		if (module.hiddenFromSidebar) return false;
		if (role === "ADMIN" && module.adminHiddenFromSidebar) return false;
		return true;
	});

	if (role === "ADMIN") {
		const filtered = modules.filter((module) =>
			ADMIN_NAV_MODULE_KEYS.includes(module.key)
		);
		const order = new Map(ADMIN_NAV_MODULE_KEYS.map((key, index) => [key, index]));
		filtered.sort((a, b) => order.get(a.key) - order.get(b.key));
		modules.splice(0, modules.length, ...filtered);
	}
	const breakdown = await Promise.all(
		modules.map(async (module) => ({
			key: module.key,
			label: module.label,
			icon: module.icon,
			count: await countModuleItems(module),
			isCollection: Boolean(module.collection),
		}))
	);

	const totalItems = breakdown.reduce((sum, item) => sum + item.count, 0);
	const pageModules = breakdown.filter((item) => item.isCollection);
	const totalPages = pageModules.reduce((sum, item) => sum + item.count, 0);
	const singletonModules = breakdown.length - pageModules.length;

	return {
		modulesCount: modules.length,
		totalItems,
		totalPages,
		singletonModules,
		breakdown,
	};
}
