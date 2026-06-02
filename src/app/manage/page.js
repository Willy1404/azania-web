import Link from "next/link";
import { PORTALS } from "@/lib/cms/portals";

export const metadata = {
	title: "Management Portals | Azania Bank",
	robots: { index: false, follow: false },
};

const stats = [
	{ value: "4", label: "Role portals" },
	{ value: "10+", label: "Content modules" },
	{ value: "Live", label: "Site updates" },
	{ value: "Secure", label: "Staff access" },
];

export default function ManageHomePage() {
	return (
		<div className="manage-portals-page">
			<section
				className="manage-page-hero"
				style={{ backgroundImage: "url('/images/bg/pheader-bg.webp')" }}
			>
				<div className="manage-page-hero__overlay" aria-hidden="true" />
				<div className="manage-page-hero__honeycomb" aria-hidden="true" />
				<div className="manage-page-hero__blur" aria-hidden="true" />

				<div className="container">
					<div className="manage-page-hero__content">
						<Link href="/" className="manage-page-hero__logo">
							<img src="/images/logos/azanialogo.png" alt="Azania Bank" />
						</Link>

						<span className="sub-title text-white">
							<i className="tji-manage" aria-hidden="true" />
							Content Management
						</span>

						<h1 className="manage-page-hero__title">
							Manage your <span>Azania Bank</span> website
						</h1>

						<p className="manage-page-hero__desc">
							Choose your role portal to sign in and update banking pages, news,
							support content, and media. Each team has a dedicated secure
							workspace.
						</p>

						<div className="manage-stats">
							{stats.map((stat) => (
								<div key={stat.label} className="manage-stats__item">
									<strong>{stat.value}</strong>
									<span>{stat.label}</span>
								</div>
							))}
						</div>
					</div>

					<div className="manage-page-hero__visual" aria-hidden="true">
						<img src="/images/ban11.png" alt="" />
					</div>
				</div>
			</section>

			<section className="manage-portals-section">
				<div className="container">
					<div className="sec-heading sec-heading-centered manage-portals-section__heading">
						<span className="sub-title">
							<i className="tji-strategy" aria-hidden="true" />
							Select Portal
						</span>
						<h2 className="sec-title">
							Sign in to your <span>workspace</span>
						</h2>
					</div>

					<div className="row row-gap-4">
						{Object.values(PORTALS).map((portal, index) => (
							<div key={portal.id} className="col-lg-6">
								<Link
									href={portal.loginPath}
									className="manage-portal-card manage-animate-in"
									style={{ animationDelay: `${index * 0.08}s` }}
								>
									<div className="manage-portal-card__top">
										<span className="manage-portal-card__number">
											{String(index + 1).padStart(2, "0")}
										</span>
										<div className="manage-portal-card__icon">
											<i className={portal.icon} aria-hidden="true" />
										</div>
									</div>
									<div className="manage-portal-card__body">
										<h3>{portal.label}</h3>
										<p>{portal.description}</p>
									</div>
									<span className="manage-portal-card__cta">
										Sign in to portal
										<i className="tji-arrow-right-long" aria-hidden="true" />
									</span>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			<footer className="manage-public-footer">
				<div className="container">
					<p>© {new Date().getFullYear()} Azania Bank · Authorized staff only</p>
					<Link href="/">Back to public website</Link>
				</div>
			</footer>
		</div>
	);
}
