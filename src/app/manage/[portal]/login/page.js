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

	const features = [
		"Role-based access control",
		"Live content publishing",
		"Photo, video & document uploads",
	];

	return (
		<div className="manage-auth-page">
			<div className="manage-auth-page__brand">
				<div className="manage-auth-page__mesh" aria-hidden="true" />
				<div className="manage-auth-page__honeycomb" aria-hidden="true" />
				<div className="manage-auth-page__glow manage-auth-page__glow--tl" aria-hidden="true" />
				<div className="manage-auth-page__glow manage-auth-page__glow--br" aria-hidden="true" />

				<div className="manage-auth-page__brand-inner manage-animate-in">
					<Link href="/manage" className="manage-auth-page__logo-link">
						<img
							src="/images/logos/azanialogo.png"
							alt="Azania Bank"
							className="manage-auth-page__logo"
						/>
					</Link>

					<div className="manage-auth-page__badge">
						<i className={portalConfig.icon} aria-hidden="true" />
						<span>{portalConfig.label}</span>
					</div>

					<h1 className="manage-auth-page__title">
						Secure content <span>management</span>
					</h1>

					<p className="manage-auth-page__desc">
						Authorized Azania Bank staff can update website content, upload
						media, and publish changes to the live site.
					</p>

					<ul className="manage-auth-page__features">
						{features.map((feature, index) => (
							<li
								key={feature}
								className="manage-animate-in"
								style={{ animationDelay: `${0.12 + index * 0.08}s` }}
							>
								<span className="manage-auth-page__check">
									<i className="tji-check" aria-hidden="true" />
								</span>
								{feature}
							</li>
						))}
					</ul>

					<div className="manage-auth-page__stats manage-animate-in" style={{ animationDelay: "0.36s" }}>
						<div>
							<strong>4</strong>
							<span>Portals</span>
						</div>
						<div>
							<strong>10+</strong>
							<span>Modules</span>
						</div>
						<div>
							<strong>Live</strong>
							<span>Publishing</span>
						</div>
					</div>

					<div className="manage-auth-page__visual manage-animate-in" style={{ animationDelay: "0.44s" }} aria-hidden="true">
						<div className="manage-auth-page__visual-glow" />
						<img src="/images/ban11.png" alt="" />
					</div>
				</div>
			</div>

			<div className="manage-auth-page__form-wrap">
				<div className="manage-auth-page__orb manage-auth-page__orb--1" aria-hidden="true" />
				<div className="manage-auth-page__orb manage-auth-page__orb--2" aria-hidden="true" />
				<div className="manage-auth-page__form-bg" aria-hidden="true" />

				<div className="manage-auth-page__form-inner">
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
		</div>
	);
}
