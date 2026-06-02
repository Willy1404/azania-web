"use client";
import BootstrapWrapper from "@/components/shared/wrappers/BootstrapWrapper";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";

const AzaniaFaq = ({ faqItems = [] }) => {
	return (
		<section className="tj-faq-section section-gap">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-4">
						<div className="content-wrap">
							<div className="sec-heading">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Common Questions
								</span>
								<h2 className="sec-title title-anim">
									Need <span>Help?</span> Start Here
								</h2>
							</div>
							<p className="desc wow fadeInUp" data-wow-delay=".6s">
								Find answers to frequently asked questions about Azania Bank
								accounts, cards, digital banking, and services.
							</p>
							<div className="wow fadeInUp" data-wow-delay=".8s">
								<ButtonPrimary text={"Contact Support"} url={"/contact"} />
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<BootstrapWrapper>
							<div className="accordion tj-faq style-2" id="azaniaFaq">
								{faqItems.map((faq, idx) => (
									<div
										key={idx}
										className={`accordion-item wow fadeInUp ${
											idx === 0 ? "active" : ""
										}`}
										data-wow-delay=".3s"
									>
										<button
											className={`faq-title ${idx === 0 ? "" : "collapsed"}`}
											type="button"
											data-bs-toggle="collapse"
											data-bs-target={`#azania-faq-${idx + 1}`}
											aria-expanded={idx === 0 ? "true" : "false"}
										>
											{faq.question}
										</button>
										<div
											id={`azania-faq-${idx + 1}`}
											className={`collapse ${idx === 0 ? "show" : ""}`}
											data-bs-parent="#azaniaFaq"
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
				</div>
			</div>
		</section>
	);
};

export default AzaniaFaq;
