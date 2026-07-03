import Image from "next/image";
import Link from "next/link";
import getHomepage from "@/libs/getHomepage";

const Hero8 = async () => {
	const { hero } = await getHomepage();
	const customerImages = hero.customerImages || [];

	return (
		<section className="h8-hero ">
			<div className="h8-hero-inner">
				<div
					className="h8-hero-bg-image"
					style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
				></div>
				<div className="container">
					<div className="row ">
						<div className="col-12">
							<div className="h8-hero-item-wrapper">
								<div className="h8-hero-content">
									<h1 className="h8-hero-title text-anim">
										<span className="hero-title-main">{hero.titleMain}</span>
										<span className="hero-title-sub">{hero.titleSub}</span>
									</h1>
								</div>
								<div className="h8-hero-box">
									<div className="customers">
										<ul>
											{customerImages.map((image, index) => (
												<li
													key={image}
													className="wow fadeInLeft"
													data-wow-delay={`${0.5 + index * 0.1}s`}
												>
													<Image
														width={89}
														height={89}
														src={image}
														alt="Azania Bank customer"
													/>
												</li>
											))}
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
										<div className="desc">{hero.tagline}</div>
									</div>
								</div>
								<div className="h8-hero-banner">
									<Image
										width={1536}
										height={1024}
										style={{ height: "auto" }}
										className="wow fadeInUpBig"
										data-wow-delay=".8s"
										src={hero.bannerImage}
										alt="Azania Bank"
									/>
								</div>
								<Link href={hero.servicesLink} className="h8-services-circle">
									<span className="h8-services-circle__inner-ring" aria-hidden="true" />

									<span className="h8-services-circle__icon-wrap" aria-hidden="true">
										<span className="h8-services-circle__icons">
											<i className="tji-budget" title="" />
											<i className="tji-user" title="" />
											<i className="tji-worldwide" title="" />
										</span>
									</span>

									<span className="h8-services-circle__text">
										<span className="h8-services-circle__text-our">
											{hero.servicesLabelOur}
										</span>
										<span className="h8-services-circle__text-services">
											{hero.servicesLabelText}
										</span>
									</span>

									<span className="h8-services-circle__line" aria-hidden="true">
										<span className="h8-services-circle__line-dot" />
									</span>

									<span className="h8-services-circle__action" aria-hidden="true">
										<i className="tji-arrow-right-long" />
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
