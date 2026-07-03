import ManageContentPageClient from "@/components/manage/ManageContentPageClient";
import { requirePortalSession } from "@/lib/cms/auth";
import {
	getContentCollection,
	getContentSingleton,
} from "@/lib/cms/content";
import {
	canManageContent,
	CONTENT_MODULES,
	getPortal,
	getSidebarModules,
} from "@/lib/cms/portals";
import { redirect, notFound } from "next/navigation";
import { homepageDefaults } from "@/libs/homepageDefaults";

export const metadata = {
	robots: { index: false, follow: false },
};

export default async function ManageContentPage({ params }) {
	const { portal, contentKey } = await params;
	const portalConfig = getPortal(portal);
	const module = CONTENT_MODULES[contentKey];

	if (!portalConfig || !module) {
		notFound();
	}

	const session = await requirePortalSession(portal);
	if (!session) {
		redirect(portalConfig.loginPath);
	}

	if (!canManageContent(session.role, contentKey)) {
		notFound();
	}

	const initialData = module.collection
		? await getContentCollection(contentKey, [])
		: contentKey === "homepage"
			? {
					config: await getContentSingleton("homepage", homepageDefaults),
					news: await getContentSingleton("home_news", []),
					forex: await getContentSingleton("forex_rates", null),
				}
			: contentKey === "about_azania_bank"
				? {
						reports: await getContentSingleton("reports", []),
					}
				: contentKey === "support"
					? {
							faq: await getContentSingleton("faq_items", []),
							tariff: await getContentSingleton("tariff_sections", []),
						}
					: contentKey === "karol_ai"
						? {
								faq: await getContentSingleton("faq_items", []),
								settings: await getContentSingleton("karol_settings", null),
							}
					: await getContentSingleton(contentKey, []);

	const shellProps = {
		portalId: portal,
		portalLabel: portalConfig.label,
		portalIcon: portalConfig.icon,
		userName: session.name,
		userRole: session.role,
		pageTitle: module.label,
		pageSubtitle: module.description,
		contentModules: getSidebarModules(portal, session.role),
	};

	return (
		<ManageContentPageClient
			shellProps={shellProps}
			portalId={portal}
			contentKey={contentKey}
			module={module}
			initialData={initialData}
		/>
	);
}
