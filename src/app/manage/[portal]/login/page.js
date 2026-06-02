import Link from "next/link";
import ManageLoginForm from "@/components/manage/ManageLoginForm";
import { getPortal } from "@/lib/cms/portals";
import { notFound } from "next/navigation";

export const metadata = {
	robots: { index: false, follow: false },
};

export default async function ManageLoginPage({ params }) {
	const { portal } = await params;
	const portalConfig = getPortal(portal);

	if (!portalConfig) {
		notFound();
	}

	return (
		<div className="manage-auth-page">
			<div
				className="manage-auth-page__brand"
				style={{ backgroundImage: "url('/images/bg/pheader-bg.webp')" }}
			>
				<div className="manage-auth-page__overlay" aria-hidden="true" />
				<div className="manage-auth-page__honeycomb" aria-hidden="true" />
				<div className="manage-auth-page__glow" aria-hidden="true" />

				<div className="manage-auth-page__brand-inner">
					<Link href="/manage">
						<img
							src="/images/logos/azanialogo.png"
							alt="Azania Bank"
							className="manage-auth-page__logo"
						/>
					</Link>

					<span className="sub-title text-white">
						<i className={portalConfig.icon} aria-hidden="true" />
						{portalConfig.label}
					</span>

					<h1 className="manage-auth-page__title">
						Secure content <span>management</span>
					</h1>

					<p className="manage-auth-page__desc">
						Authorized Azania Bank staff can update website content, upload
						media, and publish changes to the live site.
					</p>

					<ul className="manage-auth-page__features">
						<li>
							<span className="manage-auth-page__check">
								<i className="tji-check" aria-hidden="true" />
							</span>
							Role-based access control
						</li>
						<li>
							<span className="manage-auth-page__check">
								<i className="tji-check" aria-hidden="true" />
							</span>
							Live content publishing
						</li>
						<li>
							<span className="manage-auth-page__check">
								<i className="tji-check" aria-hidden="true" />
							</span>
							Photo, video & document uploads
						</li>
					</ul>

					<div className="manage-auth-page__visual" aria-hidden="true">
						<img src="/images/ban11.png" alt="" />
					</div>
				</div>
			</div>

			<div className="manage-auth-page__form-wrap">
				<div className="manage-auth-page__form-bg" aria-hidden="true" />
				<ManageLoginForm
					portalId={portal}
					portalLabel={portalConfig.label}
					portalIcon={portalConfig.icon}
				/>
				<p className="manage-auth-page__back">
					<Link href="/manage">
						<i className="tji-arrow-right-long" aria-hidden="true" />
						All management portals
					</Link>
				</p>
			</div>
		</div>
	);
}
