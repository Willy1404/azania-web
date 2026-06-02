import Link from "next/link";
import Image from "next/image";

const SectionPageSidebar = ({
	title = "Quick Links",
	items = [],
	currentSlug,
	basePath,
	image = "/images/o1.png",
	helpTitle = "Need Help?",
	helpText = "Talk to Azania Bank",
}) => {
	return (
		<aside className="tj-main-sidebar">
			{items?.length ? (
				<div
					className="tj-sidebar-widget service-categories wow fadeInUp"
					data-wow-delay=".1s"
				>
					<h4 className="widget-title">{title}</h4>
					<ul>
						{items.map((item) => (
							<li key={item.slug}>
								<Link
									className={`${currentSlug === item.slug ? "active" : ""}`}
									href={`${basePath}/${item.slug}`}
								>
									{item.title}
									<span className="icon">
										<i className="tji-arrow-right"></i>
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}

			<div
				className="tj-sidebar-widget widget-feature-item wow fadeInUp"
				data-wow-delay=".2s"
			>
				<div className="feature-box">
					<div className="feature-content">
						<h2 className="title">{helpTitle}</h2>
						<span>{helpText}</span>
						<Link
							className="read-more feature-contact"
							href="tel:+255000000000"
						>
							<i className="tji-phone-3"></i>
							<span>+255 000 000 000</span>
						</Link>
					</div>
					<div className="feature-images">
						<Image
							src={image}
							alt="Azania Bank"
							width={280}
							height={180}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</div>
			</div>

			<div
				className="tj-sidebar-widget wow fadeInUp azania-sidebar-promo"
				data-wow-delay=".3s"
			>
				<div className="azania-info-card">
					<div className="card-icon">
						<i className="tji-user"></i>
					</div>
					<h4 className="title">Open an Account</h4>
					<p className="desc">
						Start your journey with Azania Bank today.
					</p>
					<Link href="/open-account" className="text-btn">
						<span className="btn-text">
							<span>Get Started</span>
						</span>
						<span className="btn-icon">
							<i className="tji-arrow-right-long"></i>
						</span>
					</Link>
				</div>
			</div>
		</aside>
	);
};

export default SectionPageSidebar;
