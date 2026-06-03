import Link from "next/link";

const Footer8 = () => {
	return (
		<footer className="tj-footer-section footer-2 h5-footer  h6-footer  h8-footer section-gap-x">
			<div className="h6-footer-logo-area ">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="h8-footer-logo-wrapper">
								<div className="h6-footer-logo h8-footer-logo">
									<Link
										href="/"
										className="wow fadeInLeftBig"
										data-wow-delay=".3s"
									>
										<img src="/images/logos/azanialogo.png" alt="Azania Bank" />
									</Link>
								</div>
								<div
									className="h8-footer-logo-content wow fadeInRightBig"
									data-wow-delay=".4s"
								>
									<div className="footer-text">
										<p>
											Azania Bank delivers personal, business, and digital
											banking solutions designed to help you manage money with
											confidence and clarity.
										</p>
									</div>
									<div className="social-links style-3">
										<ul>
											<li>
												<Link href="https://www.facebook.com/" target="_blank">
													<i className="fa-brands fa-facebook-f"></i>
												</Link>
											</li>
											<li>
												<Link href="https://www.instagram.com/" target="_blank">
													<i className="fa-brands fa-instagram"></i>
												</Link>
											</li>
											<li>
												<Link href="https://x.com/" target="_blank">
													<i className="fa-brands fa-x-twitter"></i>
												</Link>
											</li>
											<li>
												<Link href="https://www.linkedin.com/" target="_blank">
													<i className="fa-brands fa-linkedin-in"></i>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-main-area h8-footer-main">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-xl-3 col-lg-3  col-md-6">
							<div
								className="footer-widget widget-contact h6-footer-contact h8-footer-contact wow fadeInUp"
								data-wow-delay=".3s"
							>
								<h5 className="title">Our Office</h5>
								<div className="footer-contact-info">
									<div className="contact-item">
										<span>Dar es Salaam, Tanzania.</span>
									</div>
									<div className="contact-item">
										<Link href="tel:+255000000000">P: +255 000 000 000</Link>
										<Link href="mailto:info@azaniabank.co.tz">
											M: info@azaniabank.co.tz
										</Link>
									</div>
									<div className="contact-item">
										<span>
											<i className="tji-clock"></i> Mon-Fri 8am-5pm
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3  col-lg-3 col-md-6">
							<div
								className="footer-widget footer-col-2 widget-nav-menu h6-footer-col-2  h8-footer-col-2 wow fadeInUp"
								data-wow-delay=".4s"
							>
								<h5 className="title">Banking</h5>
								<ul>
									<li>
										<Link href="/personal-banking">Personal Banking</Link>
									</li>
									<li>
										<Link href="/business-banking">Business Banking</Link>
									</li>
									<li>
										<Link href="/treasury-and-capital">Treasury &amp; Capital</Link>
									</li>
									<li>
										<Link href="/open-account">Open an Account</Link>
									</li>
									<li>
										<Link href="/support">Support</Link>
									</li>
									<li>
										<Link href="/reports">Reports</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-xl-2 col-lg-2 col-md-6">
							<div
								className="footer-widget footer-col-3 widget-nav-menu h6-footer-col-3  h8-footer-col-3 wow fadeInUp"
								data-wow-delay=".5s"
							>
								<h5 className="title">Resources</h5>
								<ul>
									<li>
										<Link href="/support">Contact &amp; Support</Link>
									</li>
									<li>
										<Link href="/about-azania-bank">About Azania Bank</Link>
									</li>
									<li>
										<Link href="/faq">FAQs</Link>
									</li>
									<li>
										<Link href="/support/tariff-guide">Tariff Guide</Link>
									</li>
									<li>
										<Link href="/reports">News &amp; Reports</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-xl-4 col-lg-4 col-md-6">
							<div
								className="footer-widget widget-subscribe h6-footer-subscribe h8-footer-subscribe wow fadeInUp"
								data-wow-delay=".6s"
							>
								<h3 className="title title-anim">
									Subscribe to Our Newsletter.
								</h3>
								<div className="subscribe-form">
									<form action="#">
										<input
											type="email"
											name="email"
											placeholder="Enter email"
										/>
										<button type="submit">
											<i className="tji-plane"></i>
										</button>
										<label htmlFor="agree">
											<input id="agree" type="checkbox" />
											Agree to our{" "}
											<Link href="/terms-and-conditions">
												Terms & Condition?
											</Link>
										</label>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="tj-copyright-area-2 h5-footer-copyright h8-footer-copyright">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="copyright-content-area">
								<div className="copyright-text">
									<p>
										&copy; 2026{" "}
										<Link href="/">Azania Bank</Link>. All rights reserved.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-1">
				<img src="/images/shape/pattern-2.svg" alt="Azania Bank" />
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="Azania Bank" />
			</div>
			<div className="bg-shape-3 wow fadeInUpBig" data-wow-delay="1s">
				<img src="/images/shape/h8-footer-shape-blur-1.svg" alt="Azania Bank" />
			</div>
			<div className="bg-shape-4 wow fadeInDownBig" data-wow-delay=".8s">
				<img src="/images/shape/h8-footer-shape-blur-2.svg" alt="Azania Bank" />
			</div>
		</footer>
	);
};

export default Footer8;
