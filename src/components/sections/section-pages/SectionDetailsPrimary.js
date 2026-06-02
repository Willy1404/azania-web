"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import SectionPageSidebar from "@/components/shared/sidebar/SectionPageSidebar";
import getSectionPageImage from "@/libs/getSectionPageImage";
import Image from "next/image";
import Link from "next/link";

const SectionDetailsPrimary = ({ option }) => {
	const {
		currentItem,
		items,
		isPrevItem,
		isNextItem,
		prevSlug,
		nextSlug,
		basePath,
		benefitsTitle = "Key Benefits",
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
	} = currentItem || {};

	const sidebarItems = items?.filter((item) => item.category === category);
	const heroImage = getSectionPageImage(slug, 0);
	const secondaryImage = getSectionPageImage(slug, 1);
	const tertiaryImage = getSectionPageImage(slug, 2);

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src={heroImage}
									alt={title || "Azania Bank"}
									width={870}
									height={450}
									style={{ height: "auto" }}
								/>
							</div>
							<h2 className="title title-anim">{titleLarge}</h2>
							<div className="blog-text">
								<p className="wow fadeInUp" data-wow-delay=".3s">
									{desc1}
								</p>
								<p className="wow fadeInUp" data-wow-delay=".3s">
									{desc2}
								</p>
								<ul className="wow fadeInUp" data-wow-delay=".3s">
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
											<div
												className="image-box wow fadeInUp"
												data-wow-delay=".3s"
											>
												<Image
													src={secondaryImage}
													alt={title || "Azania Bank"}
													width={420}
													height={420}
													style={{ height: "auto" }}
												/>
											</div>
										</div>
										<div className="col-sm-6">
											<div
												className="image-box wow fadeInUp"
												data-wow-delay=".5s"
											>
												<Image
													src={tertiaryImage}
													alt={title || "Azania Bank"}
													width={420}
													height={420}
													style={{ height: "auto" }}
												/>
											</div>
										</div>
									</div>
								</div>
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									{benefitsTitle}
								</h3>
								<div className="details-content-box">
									{benefits?.map((benefit, idx) => (
										<div
											key={idx}
											className="service-details-item wow fadeInUp"
											data-wow-delay={`${0.2 + idx * 0.2}s`}
										>
											{idx > 0 ? (
												<div className="service-number">
													<span className="number">{benefit.number}</span>
													<h6 className="title">{benefit.title}</h6>
													<div className="desc">
														<p>{benefit.desc}</p>
													</div>
												</div>
											) : (
												<>
													<span className="number">{benefit.number}</span>
													<h6 className="title">{benefit.title}</h6>
													<div className="desc">
														<p>{benefit.desc}</p>
													</div>
												</>
											)}
										</div>
									))}
								</div>
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Frequently asked questions
								</h3>
								<BootstrapWrapper>
									<div className="accordion tj-faq style-2" id="faqOne">
										{faqs?.map((faq, idx) => (
											<div
												key={idx}
												className={`accordion-item wow fadeInUp ${
													idx === 0 ? "active" : ""
												}`}
												data-wow-delay=".3s"
											>
												<button
													className={`faq-title ${
														idx === 0 ? "" : "collapsed"
													}`}
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#faq-${idx + 1}`}
													aria-expanded={idx === 0 ? "true" : "false"}
												>
													{faq.question}
												</button>
												<div
													id={`faq-${idx + 1}`}
													className={`collapse ${idx === 0 ? "show" : ""}`}
													data-bs-parent="#faqOne"
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
							<div
								className="tj-post__navigation mb-0 wow fadeInUp"
								data-wow-delay="0.3s"
							>
								<div
									className="tj-nav__post previous"
									style={{ visibility: isPrevItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav prev_post">
										<Link
											href={
												isPrevItem ? `${basePath}/${prevSlug}` : "#"
											}
										>
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
										<Link
											href={
												isNextItem ? `${basePath}/${nextSlug}` : "#"
											}
										>
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
					<div className="col-lg-4">
						<SectionPageSidebar
							title={category}
							items={sidebarItems}
							currentSlug={slug}
							basePath={basePath}
							image={heroImage}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SectionDetailsPrimary;
