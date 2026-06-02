"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import Image from "next/image";
import Link from "next/link";

const BusinessBankingDetailsPrimary = ({ option }) => {
	const {
		currentItem,
		items,
		currentId,
		isPrevItem,
		isNextItem,
		prevSlug,
		nextSlug,
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

	return (
		<section className="tj-service-area section-gap">
			<div className="container">
				<div className="row row-gap-5">
					<div className="col-lg-8">
						<div className="post-details-wrapper">
							<div className="blog-images wow fadeInUp" data-wow-delay=".1s">
								<Image
									src="/images/service/service-details.webp"
									alt={title || "Business Banking"}
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
													src="/images/service/service-3.webp"
													alt={title || "Business Banking"}
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
													src="/images/service/service-4.webp"
													alt={title || "Business Banking"}
													width={420}
													height={420}
													style={{ height: "auto" }}
												/>
											</div>
										</div>
									</div>
								</div>
								<h3 className="wow fadeInUp" data-wow-delay=".3s">
									Key Benefits for Your Business
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
												isPrevItem
													? `/business-banking/${prevSlug}`
													: "#"
											}
										>
											<span>
												<i className="tji-arrow-left"></i>
											</span>
											Previous
										</Link>
									</div>
								</div>
								<Link href={"/business-banking"} className="tj-nav-post__grid">
									<i className="tji-window"></i>
								</Link>
								<div
									className="tj-nav__post next"
									style={{ visibility: isNextItem ? "visible" : "hidden" }}
								>
									<div className="tj-nav-post__nav next_post">
										<Link
											href={
												isNextItem
													? `/business-banking/${nextSlug}`
													: "#"
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
						<aside className="tj-main-sidebar">
							<div
								className="tj-sidebar-widget service-categories wow fadeInUp"
								data-wow-delay=".1s"
							>
								<h4 className="widget-title">{category}</h4>
								<ul>
									{sidebarItems?.map((item) => (
										<li key={item.slug}>
											<Link
												className={`${slug === item.slug ? "active" : ""}`}
												href={`/business-banking/${item.slug}`}
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
							<div
								className="tj-sidebar-widget widget-feature-item wow fadeInUp"
								data-wow-delay=".3s"
							>
								<div className="feature-box">
									<div className="feature-content">
										<h2 className="title">Need Help?</h2>
										<span>Talk to Azania Bank</span>
										<Link
											className="read-more feature-contact"
											href="tel:+255000000000"
										>
											<i className="tji-phone-3"></i>
											<span>+255 000 000 000</span>
										</Link>
									</div>
									<div className="feature-images">
										<img src="/images/service/service-ad.webp" alt="" />
									</div>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BusinessBankingDetailsPrimary;
