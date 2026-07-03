import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

const defaultSteps = [
	{
		step: "01",
		title: "Open an account",
		desc: "Visit any Azania Bank branch with your registration documents.",
	},
	{
		step: "02",
		title: "Choose your solution",
		desc: "Select the product or channel that fits your needs.",
	},
	{
		step: "03",
		title: "Start banking",
		desc: "Complete onboarding and begin using your chosen service.",
	},
];

const AzaniaProductAside = ({
	title,
	shortDesc,
	icon = "tji-budget",
	features = [],
	relatedItems = [],
	basePath,
	solutions = [],
	heroImage = "/images/ban11.png",
	ctaText = "Get Started",
	ctaUrl = "/open-account",
	solutionsLabel = "Our solutions",
	photoTitle = "Built for your business",
	photoDesc = "Explore Azania Bank solutions designed to help you grow with confidence.",
	supportTitle = "Need help?",
	steps = defaultSteps,
	stats = [
		{ value: "24/7", label: "Digital access" },
		{ value: "Secure", label: "Banking services" },
	],
}) => {
	return (
		<aside className="azania-lipa-aside">
			<div className="azania-lipa-aside__sticky">
				<div className="azania-lipa-aside__card azania-lipa-aside__card--cta wow fadeInUp">
					<div className="azania-lipa-aside__cta-icon">
						<i className={icon}></i>
					</div>
					<h4 className="azania-lipa-aside__cta-title">{title}</h4>
					{shortDesc ? (
						<p className="azania-lipa-aside__cta-desc">{shortDesc}</p>
					) : null}
					<ButtonPrimary text={ctaText} url={ctaUrl} className="w-100" />
				</div>

				{solutions?.length ? (
					<div className="azania-lipa-aside__section wow fadeInUp" data-wow-delay=".05s">
						<h5 className="azania-lipa-aside__label">{solutionsLabel}</h5>
						<div className="azania-lipa-aside__image-cards">
							{solutions.map((solution) => (
								<a
									key={solution.id}
									href={`#product-${solution.id}`}
									className="azania-lipa-aside__image-card"
								>
									<div className="azania-lipa-aside__image-card-media">
										<Image
											src={solution.image}
											alt={solution.title}
											width={120}
											height={120}
										/>
									</div>
									<div className="azania-lipa-aside__image-card-body">
										<strong>{solution.title}</strong>
										<p>{solution.description}</p>
										<span className="azania-lipa-aside__image-card-link">
											Learn more <i className="tji-arrow-right"></i>
										</span>
									</div>
								</a>
							))}
						</div>
					</div>
				) : null}

				<div className="azania-lipa-aside__stats wow fadeInUp" data-wow-delay=".1s">
					{stats.map((stat) => (
						<div key={stat.label} className="azania-lipa-aside__stat-card">
							<span className="azania-lipa-aside__stat-value">{stat.value}</span>
							<span className="azania-lipa-aside__stat-label">{stat.label}</span>
						</div>
					))}
				</div>

				{features?.length ? (
					<div
						className="azania-lipa-aside__card wow fadeInUp"
						data-wow-delay=".12s"
					>
						<h5 className="azania-lipa-aside__label">Key highlights</h5>
						<ul className="azania-lipa-aside__list">
							{features.map((feature) => (
								<li key={feature}>
									<span className="azania-lipa-aside__check">
										<i className="tji-check"></i>
									</span>
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</div>
				) : null}

				<div
					className="azania-lipa-aside__card azania-lipa-aside__card--photo wow fadeInUp"
					data-wow-delay=".14s"
				>
					<div className="azania-lipa-aside__photo-banner">
						<Image
							src={heroImage}
							alt={title || "Azania Bank"}
							width={400}
							height={220}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
					<div className="azania-lipa-aside__photo-caption">
						<strong>{photoTitle}</strong>
						<p>{photoDesc}</p>
					</div>
				</div>

				<div
					className="azania-lipa-aside__card wow fadeInUp"
					data-wow-delay=".16s"
				>
					<h5 className="azania-lipa-aside__label">How to get started</h5>
					<ol className="azania-lipa-aside__steps">
						{steps.map((item) => (
							<li key={item.step}>
								<span className="azania-lipa-aside__step-num">{item.step}</span>
								<div>
									<strong>{item.title}</strong>
									<p>{item.desc}</p>
								</div>
							</li>
						))}
					</ol>
				</div>

				<div
					className="azania-lipa-aside__card azania-lipa-aside__card--support wow fadeInUp"
					data-wow-delay=".18s"
				>
					<h5 className="azania-lipa-aside__label">{supportTitle}</h5>
					<p className="azania-lipa-aside__support-text">
						Speak to our team for setup, guidance, and onboarding support.
					</p>
					<Link className="azania-lipa-aside__phone" href="tel:+255000000000">
						<i className="tji-phone-3"></i>
						<span>+255 000 000 000</span>
					</Link>
					<Link className="azania-lipa-aside__link" href="/support">
						Visit support centre
						<i className="tji-arrow-right"></i>
					</Link>
				</div>

				{relatedItems?.length ? (
					<div
						className="azania-lipa-aside__card wow fadeInUp"
						data-wow-delay=".2s"
					>
						<h5 className="azania-lipa-aside__label">Related pages</h5>
						<div className="azania-related-pills">
							{relatedItems.map((item) => (
								<Link key={item.slug} href={`${basePath}/${item.slug}`}>
									{item.title}
								</Link>
							))}
						</div>
					</div>
				) : null}
			</div>
		</aside>
	);
};

export default AzaniaProductAside;
