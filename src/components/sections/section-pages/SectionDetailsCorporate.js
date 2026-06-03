"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import SectionPageSidebar from "@/components/shared/sidebar/SectionPageSidebar";
import getSectionPageImage from "@/libs/getSectionPageImage";
import Image from "next/image";
import Link from "next/link";

const SectionDetailsCorporate = ({ option }) => {
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
		desc1,
		desc2,
		features,
		benefits,
		faqs,
		category,
		slug,
		icon,
	} = currentItem || {};

	const heroImage = getSectionPageImage(slug, 0);

	return (
		<>
			<section className="azania-corporate-header">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-7">
							<span className="sub-title d-block mb-3">
								<i className={icon || "tji-manage"}></i> {category}
							</span>
							<h1 className="title title-anim mb-3">{titleLarge}</h1>
							<p className="desc mb-4">{desc1}</p>
							<div>
								{features?.map((feature) => (
									<span key={feature} className="feature-pill">
										{feature}
									</span>
								))}
							</div>
						</div>
						<div className="col-lg-5 mt-4 mt-lg-0">
							<div className="azania-corporate-visual wow fadeInUp">
								<Image
									src={heroImage}
									alt={title || "Treasury & Capital"}
									width={560}
									height={360}
									style={{ width: "100%", height: "auto" }}
								/>
							</div>
							<div className="text-lg-end">
								<Link href="/support" className="tj-primary-btn">
									<span className="btn-text">
										<span>Contact Treasury</span>
									</span>
									<span className="btn-icon">
										<i className="tji-arrow-right-long"></i>
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="tj-service-area section-gap">
				<div className="container">
					<div className="row row-gap-5">
						<div className="col-lg-8">
							<p className="wow fadeInUp">{desc2}</p>

							<div className="azania-corporate-metrics">
								{benefits?.map((benefit) => (
									<div
										key={benefit.number}
										className="azania-corporate-metric wow fadeInUp"
									>
										<span className="number">{benefit.number}</span>
										<h4 className="title">{benefit.title}</h4>
										<p className="desc mb-0">{benefit.desc}</p>
									</div>
								))}
							</div>

							<h3 className="wow fadeInUp">Frequently asked questions</h3>
							<BootstrapWrapper>
								<div className="accordion tj-faq style-2" id="faqCorporate">
									{faqs?.map((faq, idx) => (
										<div
											key={idx}
											className={`accordion-item wow fadeInUp ${
												idx === 0 ? "active" : ""
											}`}
										>
											<button
												className={`faq-title ${idx === 0 ? "" : "collapsed"}`}
												type="button"
												data-bs-toggle="collapse"
												data-bs-target={`#faq-c-${idx + 1}`}
												aria-expanded={idx === 0 ? "true" : "false"}
											>
												{faq.question}
											</button>
											<div
												id={`faq-c-${idx + 1}`}
												className={`collapse ${idx === 0 ? "show" : ""}`}
												data-bs-parent="#faqCorporate"
											>
												<div className="accordion-body faq-text">
													<p>{faq.answer}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</BootstrapWrapper>

							<div className="tj-post__navigation mb-0 wow fadeInUp mt-5">
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
						<div className="col-lg-4">
							<SectionPageSidebar
								title="Treasury & Capital"
								items={items}
								currentSlug={slug}
								basePath={basePath}
								image={heroImage}
								helpTitle="Treasury Desk"
								helpText="Institutional support"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SectionDetailsCorporate;
