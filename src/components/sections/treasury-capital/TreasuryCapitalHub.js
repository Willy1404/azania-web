"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";

const TreasuryCapitalHub = ({ pages = [] }) => {

	return (
		<>
			<section className="section-gap-bottom">
				<div className="container">
					<div className="azania-section-intro azania-section-intro--treasury wow fadeInUp">
						<div className="row align-items-center">
							<div className="col-lg-7">
								<span className="sub-title">
									<i className="tji-worldwide"></i>Treasury & Capital
								</span>
								<h2 className="sec-title title-anim">
									Institutional-grade treasury and capital market services
								</h2>
								<p className="desc">
									FOREX, capital markets, and investment banking solutions for
									corporates and institutions — delivered with the expertise of
									Azania Capital Limited.
								</p>
							</div>
							<div className="col-lg-5">
								<div className="azania-hub-stats">
									<div className="azania-hub-stat azania-hub-stat--dark">
										<h3>FX</h3>
										<p>Multi-currency solutions</p>
									</div>
									<div className="azania-hub-stat azania-hub-stat--dark">
										<h3>ACL</h3>
										<p>Azania Capital Limited</p>
									</div>
									<div className="azania-hub-stat azania-hub-stat--dark">
										<h3>CMS</h3>
										<p>Capital market services</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="tj-service-section section-gap">
				<div className="container">
					<div className="row row-gap-4">
						{pages.map((page, idx) => (
							<div key={page.slug} className="col-lg-4 col-md-6">
								<div
									className="service-item style-6 wow fadeInUp h-100"
									data-wow-delay={`${0.2 + idx * 0.1}s`}
								>
									<h4 className="title">
										<Link href={`/treasury-and-capital/${page.slug}`}>
											{page.title}
										</Link>
									</h4>
									<div className="service-icon">
										<i className={page.icon || "tji-manage"}></i>
									</div>
									<div className="service-content">
										<p className="desc">{page.shortDesc}</p>
										<Link
											className="text-btn"
											href={`/treasury-and-capital/${page.slug}`}
										>
											<span className="btn-text">
												<span>Learn More</span>
											</span>
											<span className="btn-icon">
												<i className="tji-arrow-right-long"></i>
											</span>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="section-gap-top section-gap-bottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<div className="sec-heading style-2">
								<span className="sub-title wow fadeInUp">
									<i className="tji-excellence"></i>Institutional Banking
								</span>
								<h2 className="sec-title title-anim">
									Speak to our treasury desk
								</h2>
								<p className="desc wow fadeInUp">
									For FOREX transactions, capital market participation, or
									Azania Capital services, contact our specialist team.
								</p>
								<div className="wow fadeInUp mt-4">
									<ButtonPrimary text={"Contact Treasury"} url={"/support"} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default TreasuryCapitalHub;
