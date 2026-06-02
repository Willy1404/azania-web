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
} from "@/lib/cms/portals";
import { redirect, notFound } from "next/navigation";

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
		: await getContentSingleton(contentKey, []);

	const shellProps = {
		portalId: portal,
		portalLabel: portalConfig.label,
		portalIcon: portalConfig.icon,
		userName: session.name,
		userRole: session.role,
		pageTitle: module.label,
		pageSubtitle: module.description,
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
