import Link from "next/link";
import ManageLoginForm from "@/components/manage/ManageLoginForm";
import { getPortal } from "@/lib/cms/portals";
import { notFound } from "next/navigation";

export const metadata = {
	robots: { index: false, follow: false },
};

const PORTAL_ACCENTS = {
	admin: "#338ba8",
	"business-banking": "#338ba8",
	"personal-banking": "#338ba8",
	"treasury-capital": "#338ba8",
};

export default async function ManageLoginPage({ params }) {
	const { portal } = await params;
	const portalConfig = getPortal(portal);

	if (!portalConfig) {
		notFound();
	}

	const accent = PORTAL_ACCENTS[portal] || PORTAL_ACCENTS.admin;

	return (
		<div
			className="manage-auth-page"
			style={{ "--manage-portal-accent": accent }}
		>
			<div
				className="manage-auth-page__bg"
				style={{ backgroundImage: "url('/images/wall.png')" }}
				aria-hidden="true"
			/>
			<div className="manage-auth-page__overlay" aria-hidden="true" />

			<div className="manage-auth-page__content">
				<Link href="/manage" className="manage-auth-page__logo">
					<img src="/images/logos/azanialogo.png" alt="Azania Bank" />
				</Link>

				<ManageLoginForm
					portalId={portal}
					portalLabel={portalConfig.label}
				/>

				<p className="manage-auth-page__back">
					<Link href="/manage">← All management portals</Link>
				</p>
			</div>
		</div>
	);
}
