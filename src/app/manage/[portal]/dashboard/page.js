import ManageDashboardStats from "@/components/manage/ManageDashboardStats";
import ManageShell from "@/components/manage/ManageShell";
import { requirePortalSession } from "@/lib/cms/auth";
import { getDashboardStats } from "@/lib/cms/getDashboardStats";
import {
	getModulesForRole,
	getPortal,
	getSidebarModules,
} from "@/lib/cms/portals";
import { redirect, notFound } from "next/navigation";

export const metadata = {
	robots: { index: false, follow: false },
};

export default async function ManageDashboardPage({ params }) {
	const { portal } = await params;
	const portalConfig = getPortal(portal);

	if (!portalConfig) {
		notFound();
	}

	const session = await requirePortalSession(portal);
	if (!session) {
		redirect(portalConfig.loginPath);
	}

	const modules = getModulesForRole(session.role);
	const contentModules = getSidebarModules(portal, session.role);
	const stats = await getDashboardStats(session.role);
	const firstName = session.name.split(" ")[0];

	return (
		<ManageShell
			portalId={portal}
			portalLabel={portalConfig.label}
			portalIcon={portalConfig.icon}
			userName={session.name}
			userRole={session.role}
			pageTitle="Dashboard"
			pageSubtitle="Overview of your content workspace and publishing activity."
			contentModules={contentModules}
		>
			<div className="manage-welcome">
				<div className="manage-welcome__honeycomb" aria-hidden="true" />
				<div className="manage-welcome__content">
					<span className="sub-title text-white">
						<i className="tji-manage" aria-hidden="true" />
						Welcome back
					</span>
					<h2 className="manage-welcome__title">
						Hello, {firstName}. Ready to update content?
					</h2>
					<p>
						You have access to {modules.length} content module
						{modules.length === 1 ? "" : "s"} in the {portalConfig.label} portal.
					</p>
				</div>
				<div className="manage-welcome__stats">
					<div className="manage-welcome__stat">
						<strong>{stats.totalItems}</strong>
						<span>Items</span>
					</div>
					<div className="manage-welcome__stat">
						<strong>{stats.totalPages}</strong>
						<span>Pages</span>
					</div>
					<div className="manage-welcome__stat">
						<strong>Live</strong>
						<span>Publishing</span>
					</div>
				</div>
			</div>

			<ManageDashboardStats stats={stats} />
		</ManageShell>
	);
}
