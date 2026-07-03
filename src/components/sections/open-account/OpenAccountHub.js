"use client";

import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import {
	openAccountCategories,
	openAccountOptions,
	openAccountVideos,
} from "@/libs/openAccountContent";
import Image from "next/image";
import { useMemo, useState } from "react";

const optionIcons = {
	savings: "tji-budget",
	dhamira: "tji-strategy",
	watoto: "tji-user",
	"current-personal": "tji-operations",
	"business-current": "tji-manage",
	sme: "tji-budget",
	diaspora: "tji-worldwide",
	"download-form": "tji-envelop",
	"visit-branch": "tji-location",
	documents: "tji-box",
	"internet-banking": "tji-worldwide",
	"mobile-banking": "tji-phone",
	"whatsapp-banking": "tji-comment",
	"apply-ib": "tji-strategy",
};

const OpenAccountHub = () => {
	const [activeCategory, setActiveCategory] = useState("personal");
	const categoryOptions = openAccountOptions[activeCategory] || [];
	const [activeOptionId, setActiveOptionId] = useState(
		categoryOptions[0]?.id || ""
	);

	const activeOption = useMemo(() => {
		const options = openAccountOptions[activeCategory] || [];
		return (
			options.find((option) => option.id === activeOptionId) || options[0]
		);
	}, [activeCategory, activeOptionId]);

	const handleCategoryChange = (categoryId) => {
		setActiveCategory(categoryId);
		const firstOption = openAccountOptions[categoryId]?.[0];
		setActiveOptionId(firstOption?.id || "");
	};

	return (
		<>
			<section className="azania-open-account-tabs">
				<div className="container">
					<div className="azania-open-account-tabs__panel wow fadeInUp">
						<div className="azania-open-account-tabs__header">
							<div>
								<span className="azania-open-account-tabs__eyebrow">
									<i className="tji-excellence" aria-hidden="true" />
									Open an Account
								</span>
								<h2 className="azania-open-account-tabs__heading">
									Personalized Banking Experience
								</h2>
								<p className="azania-open-account-tabs__lead">
									Select a category, then choose the option that best matches
									what you want to do today.
								</p>
							</div>
							<div className="azania-open-account-tabs__count" aria-hidden="true">
								<strong>{categoryOptions.length}</strong>
								<span>
									{openAccountCategories.find((c) => c.id === activeCategory)
										?.label || "Options"}
								</span>
							</div>
						</div>

						<div
							className="azania-open-account-tabs__nav wow fadeInUp"
							data-wow-delay=".05s"
							role="tablist"
							aria-label="Account opening categories"
						>
							{openAccountCategories.map((category) => (
								<button
									key={category.id}
									type="button"
									role="tab"
									aria-selected={activeCategory === category.id}
									className={
										activeCategory === category.id ? "is-active" : undefined
									}
									onClick={() => handleCategoryChange(category.id)}
								>
									<span className="azania-open-account-tabs__nav-icon">
										<i className={category.icon} aria-hidden="true" />
									</span>
									<span className="azania-open-account-tabs__nav-text">
										<strong>{category.label}</strong>
										<small>{category.desc}</small>
									</span>
								</button>
							))}
						</div>

						<div
							className="azania-open-account-tabs__cards wow fadeInUp"
							data-wow-delay=".1s"
							role="tabpanel"
						>
							{categoryOptions.map((option) => {
								const isActive = activeOptionId === option.id;
								return (
									<button
										key={option.id}
										type="button"
										className={`azania-open-account-tabs__card${
											isActive ? " is-active" : ""
										}`}
										onClick={() => setActiveOptionId(option.id)}
										aria-pressed={isActive}
									>
										<span className="azania-open-account-tabs__card-icon">
											<i
												className={optionIcons[option.id] || "tji-box"}
												aria-hidden="true"
											/>
										</span>
										<span className="azania-open-account-tabs__card-body">
											<strong>{option.label}</strong>
											<small>{option.subtitle}</small>
										</span>
										<span className="azania-open-account-tabs__card-arrow">
											<i className="tji-arrow-right-long" aria-hidden="true" />
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<section className="azania-open-account-detail section-gap">
				<div className="container">
					<div className="row g-4 g-xl-5">
						<div className="col-lg-8">
							<div className="azania-open-account-detail__intro wow fadeInUp">
								<div className="azania-open-account-detail__eyebrow">
									<span className="line" aria-hidden="true" />
									<span>{activeOption?.label?.toUpperCase()}</span>
									<span className="line" aria-hidden="true" />
								</div>
								<h2 className="azania-open-account-detail__title">
									Bank Anytime, Anywhere With Azania Bank
								</h2>
								<p className="azania-open-account-detail__lead">
									{activeOption?.subtitle}
								</p>
							</div>

							{activeOption ? (
								<div className="azania-open-account-feature wow fadeInUp" data-wow-delay=".1s">
									<div className="row g-0 align-items-stretch">
										<div className="col-md-5">
											<div className="azania-open-account-feature__media">
												<Image
													src={activeOption.image}
													alt={activeOption.title}
													width={480}
													height={560}
													className="img-fluid"
												/>
											</div>
										</div>
										<div className="col-md-7">
											<div className="azania-open-account-feature__body">
												<h3>{activeOption.title}</h3>
												<p>{activeOption.subtitle}</p>
												<h4>Features &amp; Benefits</h4>
												<div className="azania-open-account-feature__grid">
													{activeOption.features.map((feature, index) => (
														<div
															key={`${activeOption.id}-${feature.title}`}
															className="azania-open-account-feature__item"
														>
															<span className="azania-open-account-feature__num">
																{index + 1}
															</span>
															<div>
																<strong>{feature.title}</strong>
																<p>{feature.desc}</p>
															</div>
														</div>
													))}
												</div>
												{activeOption.href ? (
													<div className="azania-open-account-feature__cta">
														<ButtonPrimary
															text={activeOption.ctaText || "Learn More"}
															url={activeOption.href}
															className={activeOption.external ? "btn-dark" : ""}
														/>
													</div>
												) : null}
											</div>
										</div>
									</div>
								</div>
							) : null}
						</div>

						<div className="col-lg-4">
							<div className="azania-open-account-videos">
								{openAccountVideos.map((video, index) => (
									<div
										key={video.id}
										className="azania-open-account-videos__card wow fadeInUp"
										data-wow-delay={`${0.1 + index * 0.1}s`}
									>
										<div className="azania-open-account-videos__header">
											<span className="azania-open-account-videos__icon">
												<i className="tji-user" aria-hidden="true" />
											</span>
											<h3>{video.title}</h3>
										</div>
										<div className="azania-open-account-videos__embed">
											<Image
												src={video.thumbnail}
												alt=""
												fill
												className="azania-open-account-videos__thumb"
											/>
											<a
												href="/contact"
												className="azania-open-account-videos__play"
												aria-label={`Watch: ${video.title}`}
											>
												<i className="fa-solid fa-play" aria-hidden="true" />
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OpenAccountHub;
