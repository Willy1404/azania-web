import Link from "next/link";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const SupportHub = () => {
	return (
		<>
			<section className="azania-support-contact section-gap-bottom">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="sec-heading text-center style-2">
								<span className="sub-title wow fadeInUp">
									<i className="tji-box"></i>We are here to help
								</span>
								<h2 className="sec-title title-anim">Reach Azania Bank Support</h2>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						<div className="col-xl-4 col-lg-4 col-sm-6">
							<div className="contact-item style-2 wow fadeInUp">
								<div className="contact-icon">
									<i className="tji-phone"></i>
								</div>
								<h3 className="contact-title">Call us</h3>
								<Link href="tel:+255000000000">+255 000 000 000</Link>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-sm-6">
							<div className="contact-item style-2 wow fadeInUp" data-wow-delay=".2s">
								<div className="contact-icon">
									<i className="tji-envelop"></i>
								</div>
								<h3 className="contact-title">Email us</h3>
								<Link href="mailto:info@azaniabank.co.tz">info@azaniabank.co.tz</Link>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-sm-6">
							<div className="contact-item style-2 wow fadeInUp" data-wow-delay=".4s">
								<div className="contact-icon">
									<i className="tji-location-3"></i>
								</div>
								<h3 className="contact-title">Visit a branch</h3>
								<p>Dar es Salaam, Tanzania</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section-gap-top section-gap-bottom">
				<div className="container">
					<div className="row row-gap-4">
						<div className="col-lg-6">
							<div className="azania-support-panel azania-support-panel--tariff wow fadeInUp">
								<div>
									<div className="card-icon">
										<i className="tji-envelop"></i>
									</div>
									<h3 className="title">Tariff Guide</h3>
									<p className="desc">
										View current fees and charges for personal and business
										banking services — accounts, transfers, cards, and more.
									</p>
								</div>
								<ButtonPrimary text={"View Tariff Guide"} url={"/support/tariff-guide"} />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="azania-support-panel azania-support-panel--faq wow fadeInUp" data-wow-delay=".2s">
								<div>
									<div className="card-icon">
										<i className="tji-comment"></i>
									</div>
									<h3 className="title">Frequently Asked Questions</h3>
									<p className="desc">
										Quick answers about accounts, cards, loans, digital banking,
										and everyday banking with Azania Bank.
									</p>
								</div>
								<Link href="/faq" className="tj-primary-btn">
									<span className="btn-text">
										<span>Browse FAQs</span>
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
		</>
	);
};

export default SupportHub;
