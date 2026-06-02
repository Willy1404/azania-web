import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import Cta from "@/components/sections/cta/Cta";
import Contact3 from "@/components/sections/contacts/Contact3";
import HeroInner from "@/components/sections/hero/HeroInner";

export default function ApplyInternetBanking() {
	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Apply for Internet Banking"}
				text={"Apply for Internet Banking"}
				breadcrums={[
					{ name: "Open an Account", path: "/open-account" },
				]}
			/>
			<section className="tj-service-area section-gap-bottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="sec-heading style-2 text-center">
								<span className="sub-title wow fadeInUp" data-wow-delay=".1s">
									<i className="tji-worldwide"></i>Digital Banking
								</span>
								<h2 className="sec-title title-anim">
									Apply for Business Internet Banking
								</h2>
								<p className="desc wow fadeInUp" data-wow-delay=".3s">
									Submit your enquiry below or visit any Azania Bank branch
									with a completed internet banking application form. Our team
									will guide you through user setup and security configuration.
								</p>
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
