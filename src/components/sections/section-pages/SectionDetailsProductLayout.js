"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import AzaniaProductSolutions from "@/components/sections/section-pages/AzaniaProductSolutions";
import AzaniaProductAside from "@/components/shared/sidebar/AzaniaProductAside";
import getPageSolutions from "@/libs/getPageSolutions";
import getSectionPageImage from "@/libs/getSectionPageImage";
import Image from "next/image";
import Link from "next/link";

const SectionDetailsProductLayout = ({
	option,
	faqId = "faqProduct",
	asideConfig = {},
}) => {
	const {
		currentItem,
		items,
		isPrevItem,
		isNextItem,
		prevSlug,
		nextSlug,
		basePath,
	} = option || {};
	const {
		title,
		titleLarge,
		shortDesc,
		desc1,
		desc2,
		features,
		faqs,
		category,
		slug,
		icon,
		heroImage: cmsHeroImage,
		asideConfig: cmsAsideConfig,
	} = currentItem || {};

	const solutions = getPageSolutions(slug, currentItem);
	const heroImage = cmsHeroImage || getSectionPageImage(slug, 0);
	const mergedAside = { ...asideConfig, ...(cmsAsideConfig || {}) };
	const sidebarItems = items?.filter(
		(item) =>
			!category ||
			(item.category === category && item.title !== category && item.slug !== slug)
	);
	const relatedItems = (sidebarItems?.length ? sidebarItems : items)
		?.filter((item) => item.slug !== slug)
		.slice(0, 4);

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper azania-product-detail">
							<div
								className="azania-product-detail__hero wow fadeInUp"
								data-wow-delay=".1s"
							>
								<Image
									src={heroImage}
									alt={title || "Azania Bank"}
									width={870}
									height={450}
									style={{ width: "100%", height: "auto" }}
									priority
								/>
							</div>
							<AzaniaProductSolutions
								solutions={solutions}
								titleLarge={titleLarge}
								shortDesc={shortDesc}
								desc1={desc1}
								desc2={desc2}
							/>
						</div>
					</div>
					<div className="col-lg-4">
						<AzaniaProductAside
							title={title}
							shortDesc={shortDesc}
							icon={icon}
							features={features}
							relatedItems={relatedItems}
							basePath={basePath}
							solutions={solutions}
							heroImage={heroImage}
							{...mergedAside}
						/>
					</div>
				</div>
				{faqs?.length ? (
					<div className="azania-product-faq wow fadeInUp" data-wow-delay=".2s">
						<h3>Frequently asked questions</h3>
						<BootstrapWrapper>
							<div className="accordion tj-faq style-2" id={faqId}>
								{faqs.map((faq, idx) => (
									<div
										key={idx}
										className={`accordion-item ${idx === 0 ? "active" : ""}`}
									>
										<button
											className={`faq-title ${idx === 0 ? "" : "collapsed"}`}
											type="button"
											data-bs-toggle="collapse"
											data-bs-target={`#${faqId}-${idx + 1}`}
											aria-expanded={idx === 0 ? "true" : "false"}
										>
											{faq.question}
										</button>
										<div
											id={`${faqId}-${idx + 1}`}
											className={`collapse ${idx === 0 ? "show" : ""}`}
											data-bs-parent={`#${faqId}`}
										>
											<div className="accordion-body faq-text">
												<p>{faq.answer}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</BootstrapWrapper>
					</div>
				) : null}
				<div className="azania-product-nav wow fadeInUp" data-wow-delay="0.3s">
					<div className="tj-post__navigation mb-0">
						<div
							className="tj-nav__post previous"
							style={{ visibility: isPrevItem ? "visible" : "hidden" }}
						>
							<div className="tj-nav-post__nav prev_post">
								<Link href={isPrevItem ? `${basePath}/${prevSlug}` : "#"}>
									<span>
										<i className="tji-arrow-left"></i>
									</span>
									Previous
								</Link>
							</div>
						</div>
						<Link href={basePath} className="tj-nav-post__grid">
							<i className="tji-window"></i>
						</Link>
						<div
							className="tj-nav__post next"
							style={{ visibility: isNextItem ? "visible" : "hidden" }}
						>
							<div className="tj-nav-post__nav next_post">
								<Link href={isNextItem ? `${basePath}/${nextSlug}` : "#"}>
									Next
									<span>
										<i className="tji-arrow-right"></i>
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionDetailsProductLayout;
