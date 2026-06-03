import Image from "next/image";
import Link from "next/link";

const Hero8 = () => {
	return (
		<section className="h8-hero ">
			<div className="h8-hero-inner">
				<div
					className="h8-hero-bg-image"
					style={{ backgroundImage: "url('/images/ban22.png')" }}
				></div>
				<div className="container">
					<div className="row ">
						<div className="col-12">
							<div className="h8-hero-item-wrapper">
								<div className="h8-hero-content">
									<h1 className="h8-hero-title text-anim">
										<span className="hero-title-main">banking</span>
										<span className="hero-title-sub">beyond ordinary</span>
									</h1>
								</div>
								<div className="h8-hero-box">
									<div className="customers">
										<ul>
											<li className="wow fadeInLeft" data-wow-delay=".5s">
												<Image
													width={89}
													height={89}
													src="/images/c1.png"
													alt="Azania Bank customer"
												/>
											</li>
											<li className="wow fadeInLeft" data-wow-delay=".6s">
												<Image
													width={89}
													height={89}
													src="/images/c2.png"
													alt="Azania Bank customer"
												/>
											</li>
											<li className="wow fadeInLeft" data-wow-delay=".7s">
												<Image
													width={89}
													height={89}
													src="/images/c3.png"
													alt="Azania Bank customer"
												/>
											</li>
											<li className="wow fadeInLeft" data-wow-delay=".8s">
												<span>
													<i className="tji-plus"></i>
												</span>
											</li>
										</ul>
									</div>
									<div
										className="h8-hero-box-content wow fadeInLeft"
										data-wow-delay=".9s"
									>
										<div className="h8-hero-box-icon">
											<i className="tji-star"></i>
										</div>
										<div className="desc">
											Trusted by individuals and businesses across Tanzania for
											secure, innovative banking that helps you save, grow, and
											achieve your financial goals.
										</div>
									</div>
								</div>
								<div className="h8-hero-banner">
									<Image
										width={1536}
										height={1024}
										style={{ height: "auto" }}
										className="wow fadeInUpBig"
										data-wow-delay=".8s"
										src="/images/ban11.png"
										alt="Azania Bank"
									/>
								</div>
								<Link href="/business-banking" className="circle-text-wrap">
									<span className="desc">
										Our Services <i className="tji-arrow-right-long"></i>
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero8;
