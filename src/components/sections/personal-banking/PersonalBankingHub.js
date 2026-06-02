"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";

const visualMap = {
	"for-the-future": "/images/o1.png",
	"for-today": "/images/vinesh.png",
	"for-the-family": "/images/b3.png",
	loans: "/images/b4.png",
};

const PersonalBankingHub = ({ pages = [] }) => {
	const mainPages = pages.filter((p) => p.slug !== "loans");
	const loansPage = pages.find((p) => p.slug === "loans");

	return (
		<>
			<section className="section-gap-bottom">
				<div className="container">
					<div className="row align-items-center azania-personal-row flex-column-reverse flex-lg-row">
						<div className="col-lg-6">
							<div className="azania-personal-visual wow fadeInLeft">
								<img src="/images/ban11.png" alt="Personal Banking" />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="wow fadeInRight">
								<span className="sub-title">
									<i className="tji-user"></i>Personal Banking
								</span>
								<h2 className="sec-title title-anim">
									Banking that fits your life, today and tomorrow
								</h2>
								<p className="desc">
									Whether you are planning ahead, managing daily finances, or
									supporting your family — Azania Bank personal solutions are
									designed around real life in Tanzania.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section-gap-top section-gap-bottom">
				<div className="container">
					{mainPages.map((page, idx) => (
						<div
							key={page.slug}
							className={`row azania-personal-row ${idx % 2 ? "flex-lg-row-reverse" : ""}`}
						>
							<div className="col-lg-6">
								<div
									className="azania-personal-visual wow fadeInUp"
									data-wow-delay=".2s"
								>
									<img
										src={visualMap[page.slug] || "/images/o1.png"}
										alt={page.title}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="wow fadeInUp" data-wow-delay=".3s">
									<div className="azania-page-heading">
										<div className="heading-icon">
											<i className={page.icon || "tji-user"}></i>
										</div>
										<h3 className="sec-title title mb-0">{page.title}</h3>
									</div>
									<p className="desc">{page.shortDesc}</p>
									<ul className="mt-3 mb-4">
										{page.features?.slice(0, 3).map((feature) => (
											<li key={feature} className="mb-2">
												<span className="me-2">
													<i className="tji-check"></i>
												</span>
												{feature}
											</li>
										))}
									</ul>
									<ButtonPrimary
										text={"Explore " + page.title}
										url={`/personal-banking/${page.slug}`}
									/>
								</div>
							</div>
						</div>
					))}

					{loansPage ? (
						<div className="row mt-4">
							<div className="col-12">
								<div className="azania-personal-highlight wow fadeInUp">
									<div className="row align-items-center">
										<div className="col-lg-8">
											<span className="sub-title text-white opacity-75">
												Quick Link
											</span>
											<h3 className="title">{loansPage.title}</h3>
											<p className="desc">{loansPage.shortDesc}</p>
										</div>
										<div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
											<Link
												href={`/personal-banking/${loansPage.slug}`}
												className="tj-primary-btn"
											>
												<span className="btn-text">
													<span>View Loan Options</span>
												</span>
												<span className="btn-icon">
													<i className="tji-arrow-right-long"></i>
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</section>
		</>
	);
};

export default PersonalBankingHub;
