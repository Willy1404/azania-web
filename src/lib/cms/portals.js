export const PORTALS = {
	admin: {
		id: "admin",
		label: "Administration",
		description: "Full site management including About, Support, and all banking content.",
		icon: "tji-manage",
		roles: ["ADMIN"],
		dashboardPath: "/manage/admin/dashboard",
		loginPath: "/manage/admin/login",
	},
	"business-banking": {
		id: "business-banking",
		label: "Business Banking",
		description: "Manage business banking products, pages, and related content.",
		icon: "tji-budget",
		roles: ["ADMIN", "BUSINESS_BANKING"],
		dashboardPath: "/manage/business-banking/dashboard",
		loginPath: "/manage/business-banking/login",
	},
	"personal-banking": {
		id: "personal-banking",
		label: "Personal Banking",
		description: "Manage personal banking products and pages.",
		icon: "tji-user",
		roles: ["ADMIN", "PERSONAL_BANKING"],
		dashboardPath: "/manage/personal-banking/dashboard",
		loginPath: "/manage/personal-banking/login",
	},
	"treasury-capital": {
		id: "treasury-capital",
		label: "Treasury & Capital",
		description: "Manage treasury, forex, and capital market content.",
		icon: "tji-worldwide",
		roles: ["ADMIN", "TREASURY_CAPITAL"],
		dashboardPath: "/manage/treasury-capital/dashboard",
		loginPath: "/manage/treasury-capital/login",
	},
};

/** Admin sidebar mirrors the main website navigation. */
export const ADMIN_NAV_MODULE_KEYS = [
	"homepage",
	"business_banking_pages",
	"personal_banking_pages",
	"treasury_capital_pages",
	"about_azania_bank",
	"support",
	"karol_ai",
];

export const CONTENT_MODULES = {
	homepage: {
		label: "Home",
		description: "Hero banner, about section, news cards, and forex panel on the homepage.",
		icon: "tji-home",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/homepage",
	},
	business_banking_pages: {
		label: "Business Banking",
		description: "Product and service detail pages under Business Banking.",
		icon: "tji-operations",
		collection: true,
		roles: ["ADMIN", "BUSINESS_BANKING"],
		editPath: "/manage/{portal}/content/business_banking_pages",
	},
	personal_banking_pages: {
		label: "Personal Banking",
		description: "Personal banking product pages.",
		icon: "tji-user",
		collection: true,
		roles: ["ADMIN", "PERSONAL_BANKING"],
		editPath: "/manage/{portal}/content/personal_banking_pages",
	},
	treasury_capital_pages: {
		label: "Treasury & Capital",
		description: "Treasury, forex, and capital market pages.",
		icon: "tji-worldwide",
		collection: true,
		roles: ["ADMIN", "TREASURY_CAPITAL"],
		editPath: "/manage/{portal}/content/treasury_capital_pages",
	},
	about_azania_bank: {
		label: "About Azania Bank",
		description: "About page content and financial reports.",
		icon: "tji-excellence",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/about_azania_bank",
	},
	support: {
		label: "Support",
		description: "FAQ, tariff guide, and support centre content.",
		icon: "tji-box",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/support",
	},
	home_news: {
		label: "Home News & Insight",
		description: "News items on the homepage (managed via Home module).",
		icon: "tji-comment",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/home_news",
		hiddenFromSidebar: true,
	},
	forex_rates: {
		label: "Forex Rates",
		description: "Foreign exchange rates on the homepage.",
		icon: "tji-budget",
		collection: false,
		roles: ["ADMIN", "TREASURY_CAPITAL"],
		editPath: "/manage/{portal}/content/forex_rates",
		adminHiddenFromSidebar: true,
	},
	faq_items: {
		label: "FAQ",
		description: "Frequently asked questions (managed via Support module).",
		icon: "tji-box",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/faq_items",
		hiddenFromSidebar: true,
	},
	reports: {
		label: "Financial Reports",
		description: "Reports listing (managed via About Azania Bank module).",
		icon: "tji-envelop",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/reports",
		hiddenFromSidebar: true,
	},
	tariff_sections: {
		label: "Tariff Guide",
		description: "Fee tables (managed via Support module).",
		icon: "tji-process-1",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/tariff_sections",
		hiddenFromSidebar: true,
	},
	nav_items: {
		label: "Navigation Menu",
		description: "Main website navigation structure.",
		icon: "tji-strategy",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/nav_items",
		hiddenFromSidebar: true,
	},
	karol_ai: {
		label: "Karol AI",
		description: "AI assistant knowledge base, conversations, analytics, and chatbot settings.",
		icon: "tji-comment",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/karol_ai",
	},
};

export function getSidebarModules(portalId, role) {
	const order = new Map(ADMIN_NAV_MODULE_KEYS.map((key, index) => [key, index]));

	let modules = getModulesForRole(role).filter((module) => {
		if (module.hiddenFromSidebar) return false;
		if (role === "ADMIN" && module.adminHiddenFromSidebar) return false;
		return true;
	});

	if (role === "ADMIN") {
		modules = modules.filter((module) => ADMIN_NAV_MODULE_KEYS.includes(module.key));
	}

	modules.sort((a, b) => {
		const aOrder = order.get(a.key);
		const bOrder = order.get(b.key);
		if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
		if (aOrder !== undefined) return -1;
		if (bOrder !== undefined) return 1;
		return a.label.localeCompare(b.label);
	});

	return modules.map((module) => ({
		key: module.key,
		label: module.label,
		icon: module.icon,
		href: `/manage/${portalId}/content/${module.key}`,
	}));
}

export function getPortal(portalId) {
	return PORTALS[portalId] || null;
}

export function canAccessPortal(userRole, portalId) {
	const portal = getPortal(portalId);
	if (!portal) return false;
	return portal.roles.includes(userRole);
}

export function getModulesForRole(role) {
	return Object.entries(CONTENT_MODULES)
		.filter(([, module]) => module.roles.includes(role))
		.map(([key, module]) => ({ key, ...module }));
}

export function canManageContent(userRole, contentKey) {
	const module = CONTENT_MODULES[contentKey];
	if (!module) return false;
	return module.roles.includes(userRole);
}
