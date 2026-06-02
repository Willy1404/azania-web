import Link from "next/link";
import ManageShell from "@/components/manage/ManageShell";
import { requirePortalSession } from "@/lib/cms/auth";
import {
	getModulesForRole,
	getPortal,
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
	const firstName = session.name.split(" ")[0];

	return (
		<ManageShell
			portalId={portal}
			portalLabel={portalConfig.label}
			portalIcon={portalConfig.icon}
			userName={session.name}
			userRole={session.role}
			pageTitle="Dashboard"
			pageSubtitle="Select a content module to edit and publish changes to the website."
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
						<strong>{modules.length}</strong>
						<span>Modules</span>
					</div>
					<div className="manage-welcome__stat">
						<strong>Live</strong>
						<span>Publishing</span>
					</div>
					<div className="manage-welcome__stat">
						<strong>Secure</strong>
						<span>Access</span>
					</div>
				</div>
			</div>

			<div className="manage-section-head">
				<h2>Content modules</h2>
				<p>Pick a module to manage pages, media, and published information.</p>
			</div>

			<div className="manage-modules">
				{modules.map((module, index) => (
					<Link
						key={module.key}
						href={`/manage/${portal}/content/${module.key}`}
						className="manage-module-card manage-animate-in"
						style={{ animationDelay: `${index * 0.06}s` }}
					>
						<div className="manage-module-card__icon">
							<i className={module.icon} aria-hidden="true" />
						</div>
						<div className="manage-module-card__body">
							<span className="manage-module-card__tag">Module</span>
							<h3>{module.label}</h3>
							<p>{module.description}</p>
						</div>
						<span className="manage-module-card__link">
							Open editor
							<i className="tji-arrow-right-long" aria-hidden="true" />
						</span>
					</Link>
				))}
			</div>
		</ManageShell>
	);
}
