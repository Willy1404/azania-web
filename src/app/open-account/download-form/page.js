import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";

const forms = [
	{
		title: "Business Account Opening Form",
		desc: "Standard application form for new business current and SME accounts.",
	},
	{
		title: "Corporate Account Opening Form",
		desc: "For companies requiring corporate account structures and signatory arrangements.",
	},
	{
		title: "Internet Banking Application Form",
		desc: "Apply for business internet banking access and user setup.",
	},
	{
		title: "KYC / Documentation Checklist",
		desc: "Summary of required identification and business registration documents.",
	},
];

export default function DownloadForm() {
	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Download Form"}
				text={"Download Form"}
				breadcrums={[
					{ name: "Open an Account", path: "/open-account" },
				]}
			/>
			<section className="tj-service-area section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="sec-heading style-2 text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
									<i className="tji-envelop"></i>Forms
								</span>
								<h2 className="sec-title title-anim">
									Download Account Opening Forms
								</h2>
								<p className="desc wow fadeInUp" data-wow-delay=".3s">
									Download the forms you need, complete them, and visit your
									nearest Azania Bank branch with supporting documents.
								</p>
							</div>
						</div>
					</div>
					<div className="row row-gap-4">
						{forms.map((form, idx) => (
							<div key={form.title} className="col-lg-6">
								<div
									className="service-item style-4 wow fadeInUp"
									data-wow-delay={`${0.2 + idx * 0.1}s`}
								>
									<div className="service-icon">
										<i className="tji-envelop"></i>
									</div>
									<div className="service-content">
										<h4 className="title">{form.title}</h4>
										<p className="desc">{form.desc}</p>
										<ButtonPrimary
											text={"Download PDF"}
											url={"#"}
											isTextBtn={true}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Cta />
		</AzaniaPageShell>
	);
}
