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

export const CONTENT_MODULES = {
	business_banking_pages: {
		label: "Business Banking Pages",
		description: "Product and service detail pages under Business Banking.",
		icon: "tji-operations",
		collection: true,
		roles: ["ADMIN", "BUSINESS_BANKING"],
		editPath: "/manage/{portal}/content/business_banking_pages",
	},
	personal_banking_pages: {
		label: "Personal Banking Pages",
		description: "Personal banking product pages.",
		icon: "tji-user",
		collection: true,
		roles: ["ADMIN", "PERSONAL_BANKING"],
		editPath: "/manage/{portal}/content/personal_banking_pages",
	},
	treasury_capital_pages: {
		label: "Treasury & Capital Pages",
		description: "Treasury, forex, and capital market pages.",
		icon: "tji-worldwide",
		collection: true,
		roles: ["ADMIN", "TREASURY_CAPITAL"],
		editPath: "/manage/{portal}/content/treasury_capital_pages",
	},
	home_news: {
		label: "Home News & Insight",
		description: "News items on the homepage.",
		icon: "tji-comment",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/home_news",
	},
	forex_rates: {
		label: "Forex Rates",
		description: "Foreign exchange rates on the homepage.",
		icon: "tji-budget",
		collection: false,
		roles: ["ADMIN", "TREASURY_CAPITAL"],
		editPath: "/manage/{portal}/content/forex_rates",
	},
	faq_items: {
		label: "FAQ",
		description: "Frequently asked questions.",
		icon: "tji-box",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/faq_items",
	},
	reports: {
		label: "Financial Reports",
		description: "Reports listing on the Reports page.",
		icon: "tji-envelop",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/reports",
	},
	tariff_sections: {
		label: "Tariff Guide",
		description: "Fee tables on the tariff guide page.",
		icon: "tji-process-1",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/tariff_sections",
	},
	nav_items: {
		label: "Navigation Menu",
		description: "Main website navigation structure.",
		icon: "tji-strategy",
		collection: false,
		roles: ["ADMIN"],
		editPath: "/manage/{portal}/content/nav_items",
	},
};

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
