import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Image from "next/image";

const Cta = () => {
	return (
		<section className="tj-cta-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="cta-area">
							<div className="cta-honeycomb" aria-hidden="true"></div>
							<div className="cta-content">
								<h2 className="title title-anim">
									Ready to bank with Azania?
								</h2>
								<div className="cta-btn wow fadeInUp" data-wow-delay=".6s">
									<ButtonPrimary
										text={"Open Account"}
										url={"/open-account"}
										className={"btn-dark"}
									/>
								</div>
							</div>
							<div className="cta-img">
								<Image
									className="cta-banner-img"
									src="/images/ban11.png"
									alt="Azania Bank"
									width={1536}
									height={1024}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta;
