import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getTariffSections from "@/libs/getTariffSections";

export const dynamic = "force-dynamic";

export default async function TariffGuide() {
	const tariffSections = await getTariffSections();

	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Tariff Guide"}
				text={"Tariff Guide"}
				breadcrums={[{ name: "Support", path: "/support" }]}
			/>
			<section className="tj-pricing-section-2 section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<div className="sec-heading wow fadeInUp">
								<span className="sub-title">
									<i className="tji-box"></i>Fees & Charges
								</span>
								<h2 className="sec-title title-anim">
									Azania Bank Tariff Guide
								</h2>
								<p className="desc">
									Indicative fees for personal and business banking. Contact
									your branch for the full official tariff guide.
								</p>
							</div>
						</div>
					</div>
					{tariffSections.map((section, sectionIdx) => (
						<div
							key={section.title}
							className={sectionIdx ? "section-gap-top" : "mt-5"}
						>
							<h3 className="wow fadeInUp mb-4">{section.title}</h3>
							<div className="table-responsive wow fadeInUp">
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Service</th>
											<th>Fee / Charge</th>
										</tr>
									</thead>
									<tbody>
										{section.items.map((item) => (
											<tr key={item.service}>
												<td>{item.service}</td>
												<td>{item.fee}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>
			</section>
			<Cta />
		</AzaniaPageShell>
	);
}
