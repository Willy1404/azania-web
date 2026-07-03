"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import {
	azaniaWhatsappConfig,
	azaniaWhatsappFeatures,
	azaniaWhatsappGuideSteps,
	azaniaWhatsappMenuOptions,
} from "@/libs/azaniaWhatsappBanking";
import Image from "next/image";

const AzaniaWhatsappBanking = ({
	titleLarge,
	shortDesc,
	desc1,
	desc2,
	faqs = [],
	whatsappConfig: cmsConfig = {},
}) => {
	const config = { ...azaniaWhatsappConfig, ...cmsConfig };
	const guideSteps = cmsConfig.guideSteps?.length
		? cmsConfig.guideSteps
		: azaniaWhatsappGuideSteps;
	const menuOptions = cmsConfig.menuOptions?.length
		? cmsConfig.menuOptions
		: azaniaWhatsappMenuOptions;
	const featureList = cmsConfig.featureList?.length
		? cmsConfig.featureList
		: azaniaWhatsappFeatures;

	const {
		eyebrow,
		heroTitle,
		heroGuideLabel,
		ctaText,
		ctaUrl,
		whatsappNumber,
		lifestyleImage,
		qrImage,
		featuresTitle,
		featuresSubtitle,
		qrLabel,
	} = config;

	return (
		<div className="azania-wa-page">
			<section className="azania-wa-hero wow fadeInUp">
				<div className="row align-items-stretch g-4 g-lg-5">
					<div className="col-lg-6">
						<span className="azania-wa-hero__eyebrow">{eyebrow}</span>
						<h2 className="azania-wa-hero__title title-anim">
							{heroTitle || titleLarge}
						</h2>
						<p className="azania-wa-hero__desc">
							{desc1} {desc2}
						</p>
						<div className="azania-wa-hero__cta">
							<ButtonPrimary
								text={ctaText}
								url={ctaUrl}
								className="azania-wa-hero__btn"
							/>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="azania-wa-guide-card">
							<div className="azania-wa-guide-card__header">
								<span className="azania-wa-guide-card__icon">
									<i className="tji-comment"></i>
								</span>
								<div>
									<h3 className="azania-wa-guide-card__title">{heroGuideLabel}</h3>
									<p className="azania-wa-guide-card__subtitle">
										Follow these steps to start banking on WhatsApp
									</p>
								</div>
							</div>

							<ol className="azania-wa-guide-card__steps">
								{guideSteps.map((item) => (
									<li key={item.step}>
										<span className="azania-wa-guide-card__step-num">{item.step}</span>
										<div>
											<strong>{item.title}</strong>
											<p>{item.desc}</p>
										</div>
									</li>
								))}
							</ol>

							<div className="azania-wa-guide-card__menu">
								<span className="azania-wa-guide-card__menu-label">Quick menu options</span>
								<div className="azania-wa-guide-card__menu-pills">
									{menuOptions.map((option) => (
										<span key={option}>{option}</span>
									))}
								</div>
							</div>

							<div className="azania-wa-guide-card__footer">
								<span className="azania-wa-guide-card__number">
									<i className="tji-phone-3"></i>
									{whatsappNumber}
								</span>
								<a
									className="azania-wa-guide-card__link"
									href={ctaUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									Open in WhatsApp
									<i className="tji-arrow-right"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="azania-wa-features wow fadeInUp" data-wow-delay=".1s">
				<div className="azania-wa-features__inner">
					<div className="row g-4 g-lg-5">
						<div className="col-lg-5">
							<div className="azania-wa-features__media">
								<div className="azania-wa-features__photo">
									<Image
										src={lifestyleImage}
										alt="WhatsApp Banking"
										width={520}
										height={360}
										style={{ width: "100%", height: "auto" }}
									/>
								</div>
								<div className="azania-wa-features__qr">
									<span className="azania-wa-features__qr-label">{qrLabel}</span>
									<div className="azania-wa-features__qr-image">
										<Image
											src={qrImage}
											alt="WhatsApp QR code"
											width={200}
											height={200}
											style={{ width: "100%", height: "auto" }}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-7">
							<h3 className="azania-wa-features__title">{featuresTitle}</h3>
							<p className="azania-wa-features__intro">
								{shortDesc ||
									"Access essential banking services through WhatsApp — secure, guided, and available when you need it."}
							</p>
							<h4 className="azania-wa-features__subtitle">{featuresSubtitle}</h4>
							<div className="azania-wa-features__grid">
								{featureList.map((feature, idx) => (
									<div key={feature} className="azania-wa-feature-item">
										<span className="azania-wa-feature-item__num">{idx + 1}</span>
										<p>{feature}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{faqs?.length ? (
				<section className="azania-wa-faq">
					<h3 className="azania-wa-faq__title wow fadeInUp">Frequently asked questions</h3>
					<BootstrapWrapper>
						<div className="accordion tj-faq style-2 wow fadeInUp" id="faqWhatsapp">
							{faqs.map((faq, idx) => (
								<div
									key={idx}
									className={`accordion-item ${idx === 0 ? "active" : ""}`}
								>
									<button
										className={`faq-title ${idx === 0 ? "" : "collapsed"}`}
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#faq-wa-${idx + 1}`}
										aria-expanded={idx === 0 ? "true" : "false"}
									>
										{faq.question}
									</button>
									<div
										id={`faq-wa-${idx + 1}`}
										className={`collapse ${idx === 0 ? "show" : ""}`}
										data-bs-parent="#faqWhatsapp"
									>
										<div className="accordion-body faq-text">
											<p>{faq.answer}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</BootstrapWrapper>
				</section>
			) : null}
		</div>
	);
};

export default AzaniaWhatsappBanking;
