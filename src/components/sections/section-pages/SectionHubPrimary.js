"use client";
import SectionPageCard from "@/components/shared/cards/SectionPageCard";
import makeWowDelay from "@/libs/makeWowDelay";

const SectionHubPrimary = ({ pages, categories, basePath }) => {
	return (
		<div className="tj-service-section service-4 section-gap">
			<div className="container">
				{categories.map((category, categoryIdx) => {
					const categoryPages = pages.filter(
						(page) => page.categoryId === category.id
					);

					if (!categoryPages.length) return null;

					return (
						<div
							key={category.id}
							className={categoryIdx ? "section-gap-top" : ""}
						>
							<div className="row">
								<div className="col-lg-12">
									<div className="sec-heading style-2 text-center">
										<span
											className="sub-title wow fadeInUp"
											data-wow-delay=".1s"
										>
											<i className="tji-box"></i>
											{category.name}
										</span>
										<h2 className="sec-title title-anim">
											{category.heading || `${category.name} Solutions`}
										</h2>
									</div>
								</div>
							</div>
							<div className="row row-gap-4">
								{categoryPages.map((page, idx) => (
									<div
										key={page.slug || page.href}
										className="col-lg-4 col-md-6 wow fadeInUp"
										data-wow-delay={makeWowDelay(idx, 0.1)}
									>
										<SectionPageCard page={page} basePath={basePath} />
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SectionHubPrimary;
