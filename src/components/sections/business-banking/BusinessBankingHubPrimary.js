"use client";
import SectionServiceCardHover from "@/components/shared/cards/SectionServiceCardHover";
import makeWowDelay from "@/libs/makeWowDelay";
import { useState } from "react";

const categoryOrder = [
	{ id: 1, name: "Alternative Channels" },
	{ id: 2, name: "Business Facilities" },
	{ id: 3, name: "Advisory and Facilitation" },
];

const categoryImages = [
	"/images/b1.png",
	"/images/b2.png",
	"/images/b3.png",
	"/images/b4.png",
	"/images/b5.png",
	"/images/b6.png",
];

const BusinessBankingHubPrimary = ({ pages = [] }) => {
	const [activeCategory, setActiveCategory] = useState(1);
	const activePages = pages.filter((p) => p.categoryId === activeCategory);
	const activeName =
		categoryOrder.find((c) => c.id === activeCategory)?.name || "";

	return (
		<>
			<section className="section-gap-bottom">
				<div className="container">
					<div className="azania-section-intro azania-section-intro--business wow fadeInUp">
						<div className="row align-items-center">
							<div className="col-lg-7">
								<span className="sub-title">
									<i className="tji-box"></i>Business Banking
								</span>
								<h2 className="sec-title title-anim">
									Solutions built for enterprises, SMEs, and growing
									businesses
								</h2>
								<p className="desc">
									From digital channels and merchant services to trade finance
									and advisory — explore structured solutions designed for how
									your business operates.
								</p>
							</div>
							<div className="col-lg-5">
								<div className="azania-hub-stats">
									<div className="azania-hub-stat">
										<h3>18+</h3>
										<p>Business solutions</p>
									</div>
									<div className="azania-hub-stat">
										<h3>9</h3>
										<p>Digital channels</p>
									</div>
									<div className="azania-hub-stat">
										<h3>24/7</h3>
										<p>Digital access</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="tj-service-section section-gap section-gap-top">
				<div className="container">
					<div className="row row-gap-5">
						<div className="col-lg-3">
							<div className="azania-category-nav wow fadeInUp">
								<h4 className="widget-title mb-4">Browse by category</h4>
								<ul>
									{categoryOrder.map((category) => (
										<li key={category.id}>
											<button
												type="button"
												className={`w-100 text-start border-0 bg-transparent ${
													activeCategory === category.id ? "active" : ""
												}`}
												onClick={() => setActiveCategory(category.id)}
												style={{
													cursor: "pointer",
													padding: "12px 18px",
													borderRadius: "8px",
													fontWeight: 500,
													backgroundColor:
														activeCategory === category.id
															? "var(--tj-color-theme-primary)"
															: "transparent",
													color:
														activeCategory === category.id
															? "var(--tj-color-common-white)"
															: "inherit",
												}}
											>
												{category.name}
											</button>
										</li>
									))}
								</ul>
							</div>
							<div className="azania-sidebar-banner wow fadeInUp mt-4">
								<img src="/images/ban11.png" alt="Azania Bank Business Banking" />
							</div>
							<div className="azania-info-card wow fadeInUp mt-4 azania-hub-sidebar-card">
								<div className="card-icon">
									<i className="tji-phone"></i>
								</div>
								<h4 className="title">Business Support</h4>
								<p className="desc mb-0">
									Call +255 000 000 000 or visit your nearest branch for
									assistance.
								</p>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="sec-heading style-2 mb-4">
								<h3 className="sec-title">{activeName}</h3>
							</div>
							<div className="row row-gap-4">
								{activePages.map((page, idx) => (
									<div key={page.slug} className="col-md-6">
										<SectionServiceCardHover
											page={page}
											basePath="/business-banking"
											image={categoryImages[idx % categoryImages.length]}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section-gap section-gap-top">
				<div className="container">
					<div className="sec-heading style-2 text-center">
						<span className="sub-title wow fadeInUp">
							<i className="tji-process-1"></i>Getting Started
						</span>
						<h2 className="sec-title title-anim">How to access business banking</h2>
					</div>
					<div className="azania-process-steps">
						{[
							{
								step: "Step 01",
								title: "Open a business account",
								desc: "Visit any branch with registration documents to open your account.",
							},
							{
								step: "Step 02",
								title: "Choose your solutions",
								desc: "Select channels, facilities, or advisory services that fit your needs.",
							},
							{
								step: "Step 03",
								title: "Start banking with support",
								desc: "Your relationship manager helps with setup, limits, and onboarding.",
							},
						].map((item, idx) => (
							<div
								key={item.step}
								className="azania-process-step wow fadeInUp"
								data-wow-delay={makeWowDelay(idx, 0.1)}
							>
								<span className="step-num">{item.step}</span>
								<h4 className="title">{item.title}</h4>
								<p className="desc mb-0">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default BusinessBankingHubPrimary;
