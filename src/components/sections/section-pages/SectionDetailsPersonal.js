"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import SectionPageSidebar from "@/components/shared/sidebar/SectionPageSidebar";
import getSectionPageImage from "@/libs/getSectionPageImage";
import Image from "next/image";
import Link from "next/link";

const SectionDetailsPersonal = ({ option }) => {
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
	const secondaryImage = getSectionPageImage(slug, 1);

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-4">
						<SectionPageSidebar
							title="Personal Banking"
							items={items}
							currentSlug={slug}
							basePath={basePath}
							image={heroImage}
							helpTitle="Personal Banking Support"
							helpText="We are here to help"
						/>
					</div>
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							<div className="azania-detail-personal-hero wow fadeInUp">
								<Image
									src={heroImage}
									alt={title || "Personal Banking"}
									width={870}
									height={450}
									style={{ height: "auto", width: "100%" }}
								/>
							</div>
							<div className="azania-page-heading wow fadeInUp">
								<div className="heading-icon">
									<i className={icon || "tji-user"}></i>
								</div>
								<h2 className="title title-anim">{titleLarge}</h2>
							</div>
							<div className="blog-text">
								<p className="wow fadeInUp">{desc1}</p>
								<p className="wow fadeInUp">{desc2}</p>
								<ul className="wow fadeInUp">
									{features?.map((feature, idx) => (
										<li key={idx}>
											<span>
												<i className="tji-check"></i>
											</span>
											{feature}
										</li>
									))}
								</ul>
								<div className="images-wrap">
									<div className="row">
										<div className="col-sm-6">
											<div className="image-box wow fadeInUp">
												<Image
													src={heroImage}
													alt={title || "Personal Banking"}
													width={420}
													height={420}
													style={{ height: "auto" }}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div
												className="image-box wow fadeInUp"
												data-wow-delay=".2s"
											>
												<Image
													src={secondaryImage}
													alt={title || "Personal Banking"}
													width={420}
													height={420}
													style={{ height: "auto" }}
												/>
											</div>
										</div>
									</div>
								</div>
								<h3 className="wow fadeInUp mt-4">Why choose this</h3>
								<div className="azania-benefit-grid">
									{benefits?.map((benefit) => (
										<div
											key={benefit.number}
											className="azania-benefit-card wow fadeInUp"
										>
											<h4 className="title">{benefit.title}</h4>
											<p className="desc mb-0">{benefit.desc}</p>
										</div>
									))}
								</div>
								<h3 className="wow fadeInUp">Common questions</h3>
								<BootstrapWrapper>
									<div className="accordion tj-faq style-2" id="faqPersonal">
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
													data-bs-target={`#faq-p-${idx + 1}`}
													aria-expanded={idx === 0 ? "true" : "false"}
												>
													{faq.question}
												</button>
												<div
													id={`faq-p-${idx + 1}`}
													className={`collapse ${idx === 0 ? "show" : ""}`}
													data-bs-parent="#faqPersonal"
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
							<div className="tj-post__navigation mb-0 wow fadeInUp">
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
				</div>
			</div>
		</section>
	);
};

export default SectionDetailsPersonal;
