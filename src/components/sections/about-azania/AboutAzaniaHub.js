import Link from "next/link";

const AboutAzaniaHub = () => {
	return (
		<>
			<section className="section-gap-bottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<div className="sec-heading style-2 wow fadeInUp">
								<span className="sub-title">
									<i className="tji-excellence"></i>Our Story
								</span>
								<h2 className="sec-title title-anim">
									Banking beyond ordinary — rooted in Tanzania, built for the
									future
								</h2>
								<p className="desc">
									Azania Bank is committed to empowering individuals,
									businesses, and institutions with trusted financial services,
									transparent governance, and meaningful community impact.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section-gap-top section-gap-bottom">
				<div className="container">
					<div className="row row-gap-4">
						<div className="col-lg-6">
							<Link href="/about" className="azania-portal-card azania-portal-card--about wow fadeInUp">
								<div className="portal-icon">
									<i className="tji-excellence"></i>
								</div>
								<h3 className="title">About Azania Bank</h3>
								<p className="desc">
									Discover our mission, leadership, values, and the people
									behind a bank that puts customers first.
								</p>
								<span className="text-btn">
									<span className="btn-text">
										<span>Read Our Story</span>
									</span>
									<span className="btn-icon">
										<i className="tji-arrow-right-long"></i>
									</span>
								</span>
							</Link>
						</div>
						<div className="col-lg-6">
							<Link href="/reports" className="azania-portal-card azania-portal-card--reports wow fadeInUp" data-wow-delay=".2s">
								<div className="portal-icon">
									<i className="tji-budget"></i>
								</div>
								<h3 className="title">Financial & Regulatory Reports</h3>
								<p className="desc">
									Access annual reports, quarterly statements, and regulatory
									disclosures with full transparency.
								</p>
								<span className="text-btn">
									<span className="btn-text">
										<span>View Reports</span>
									</span>
									<span className="btn-icon">
										<i className="tji-arrow-right-long"></i>
									</span>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AboutAzaniaHub;
