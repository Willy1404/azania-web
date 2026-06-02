const Choose = () => {
	return (
		<section id="choose" className="tj-choose-section h8-choose  section-gap-x">
			<div className="container-fluid gap-0">
				<div className="row align-items-center flex-column-reverse flex-lg-row">
					<div className="col-12 col-lg-6 align-self-stretch">
						<div className="h8-choose-banner">
							<img
								data-speed=".8"
								className="wow fadeInLeftBig"
								data-wow-delay=".3s"
								src="/images/vinesh.png"
								alt="Azania Bank"
							/>
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<div className="h8-choose-content-wrapper">
							<div className="sec-heading style-3">
								<span className="sub-title wow fadeInUp" data-wow-delay=".3s">
									<i className="tji-box"></i>Why Azania Bank
								</span>
								<h2 className="sec-title title-anim">
									Banking you can trust, with service you can feel.
								</h2>
							</div>
							<div className="h8-choose-box-wrapper ">
								<div
									className="choose-box h6-choose-box h8-choose-box  wow fadeInUp"
									data-wow-delay=".3s"
								>
									<div className="choose-content">
										<div className="choose-icon">
											<i className="tji-innovative"></i>
										</div>
										<div>
											<h4 className="title">Secure & Reliable</h4>
											<p className="desc">
												Your deposits and transactions are protected with
												robust security and dependable systems you can count
												on every day.
											</p>
										</div>
									</div>
								</div>
								<div
									className="choose-box h6-choose-box h8-choose-box  wow fadeInUp"
									data-wow-delay=".4s"
								>
									<div className="choose-content">
										<div className="choose-icon">
											<i className="tji-award"></i>
										</div>
										<div>
											<h4 className="title">Digital First</h4>
											<p className="desc">
												Bank on the go with mobile and internet banking that
												makes transfers, payments, and account management
												simple and fast.
											</p>
										</div>
									</div>
								</div>
								<div
									className="choose-box h6-choose-box h8-choose-box  wow fadeInUp"
									data-wow-delay=".5s"
								>
									<div className="choose-content">
										<div className="choose-icon">
											<i className="tji-support"></i>
										</div>
										<div>
											<h4 className="title">Dedicated Support</h4>
											<p className="desc">
												Our branch and contact centre teams are ready to help
												with personalised guidance whenever you need it.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-shape-2">
				<img src="/images/shape/pattern-3.svg" alt="" />
			</div>
		</section>
	);
};

export default Choose;
