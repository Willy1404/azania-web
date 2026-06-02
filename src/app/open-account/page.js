import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Cta from "@/components/sections/cta/Cta";
import Contact3 from "@/components/sections/contacts/Contact3";
import HeroInner from "@/components/sections/hero/HeroInner";
import Link from "next/link";

const accountTypes = [
	{
		title: "Business Current Account",
		desc: "For registered companies, partnerships, and enterprises with day-to-day transaction needs.",
	},
	{
		title: "SME Account",
		desc: "Tailored for small and medium businesses starting or growing their banking relationship.",
	},
	{
		title: "Corporate Account",
		desc: "Structured accounts for larger organizations with treasury and reporting requirements.",
	},
];

export default function OpenAccount() {
	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Open an Account"}
				text={"Open an Account"}
				breadcrums={[
					{ name: "Business Banking", path: "/business-banking" },
				]}
			/>
			<section className="tj-service-area section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="sec-heading style-2 text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
									<i className="tji-box"></i>Get Started
								</span>
								<h2 className="sec-title title-anim">
									Open Your Azania Bank Business Account
								</h2>
								<p className="desc wow fadeInUp" data-wow-delay=".3s">
									Start your relationship with Azania Bank by choosing the
									account type that fits your business. Visit any branch with
									the required documents or submit an enquiry below.
								</p>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{accountTypes.map((type, idx) => (
							<div key={type.title} className="col-lg-4 col-md-6">
								<div
									className="service-item style-4 wow fadeInUp"
									data-wow-delay={`${0.2 + idx * 0.1}s`}
								>
									<div className="service-icon">
										<i className="tji-user"></i>
									</div>
									<div className="service-content">
										<h4 className="title">{type.title}</h4>
										<p className="desc">{type.desc}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="row section-gap-top">
						<div className="col-lg-12 text-center wow fadeInUp">
							<p className="mb-4">
								Need forms or internet banking access? Use the quick links below.
							</p>
							<div className="d-flex flex-wrap justify-content-center gap-3">
								<ButtonPrimary
									text={"Download Forms"}
									url={"/open-account/download-form"}
								/>
								<ButtonPrimary
									text={"Apply for Internet Banking"}
									url={"/open-account/internet-banking"}
									className={"btn-dark"}
								/>
								<Link href="/contact" className="tj-primary-btn">
									<span className="btn-text">
										<span>Contact a Branch</span>
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Contact3 />
			<Cta />
		</AzaniaPageShell>
	);
}
