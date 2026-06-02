import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getReports from "@/libs/getReports";

export const dynamic = "force-dynamic";

export default async function Reports() {
	const reports = await getReports();

	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Financial & Regulatory Reports"}
				text={"Financial & Regulatory Reports"}
				breadcrums={[
					{ name: "About Azania Bank", path: "/about-azania-bank" },
				]}
			/>
			<section className="azania-corporate-header">
				<div className="container">
					<span className="sub-title d-block mb-3">
						<i className="tji-budget"></i> Transparency & Disclosure
					</span>
					<h1 className="title title-anim mb-3">
						Financial & regulatory reports
					</h1>
					<p className="desc mb-0">
						Download official Azania Bank reports and regulatory filings.
					</p>
				</div>
			</section>
			<section className="tj-service-area section-gap">
				<div className="container">
					<div className="row row-gap-4">
						{reports.map((report, idx) => (
							<div key={report.title} className="col-lg-6">
								<div
									className="service-item style-4 wow fadeInUp h-100"
									data-wow-delay={`${0.2 + idx * 0.1}s`}
								>
									<div className="service-icon">
										<i className="tji-envelop"></i>
									</div>
									<div className="service-content">
										<span className="sub-title mb-2 d-block">
											{report.type} · {report.year}
										</span>
										<h4 className="title">{report.title}</h4>
										<p className="desc">{report.desc}</p>
										<ButtonPrimary
											text={"Download PDF"}
											url={report.fileUrl || "#"}
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
