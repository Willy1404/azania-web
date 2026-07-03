"use client";
import AzaniaWhatsappBanking from "@/components/sections/section-pages/AzaniaWhatsappBanking";
import SectionDetailsProductLayout from "@/components/sections/section-pages/SectionDetailsProductLayout";
import { INTERNET_BANKING_LOGIN_URL } from "@/libs/azaniaExternalLinks";

const SectionDetailsPrimary = ({ option }) => {
	const { currentItem } = option || {};
	const { slug, layout } = currentItem || {};
	const isWhatsappPage =
		layout === "whatsapp" || slug === "whatsapp-banking";

	if (isWhatsappPage) {
		const {
			titleLarge,
			shortDesc,
			desc1,
			desc2,
			faqs,
			whatsappConfig,
		} = currentItem || {};

		return (
			<section className="tj-service-area section-gap">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12">
							<div className="post-details-wrapper azania-wa-detail">
								<AzaniaWhatsappBanking
									titleLarge={titleLarge}
									shortDesc={shortDesc}
									desc1={desc1}
									desc2={desc2}
									faqs={faqs}
									whatsappConfig={whatsappConfig}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<SectionDetailsProductLayout
			option={option}
			faqId="faqBusiness"
			asideConfig={{
				ctaText:
					slug === "internet-banking"
						? "Login to Internet Banking"
						: slug === "azania-lipa"
							? "Register for Azania LIPA"
							: "Open Business Account",
				ctaUrl:
					slug === "internet-banking"
						? INTERNET_BANKING_LOGIN_URL
						: "/open-account",
				solutionsLabel: "Our solutions",
				photoTitle: "Built for growing businesses",
				photoDesc:
					"From digital channels to business facilities — explore solutions designed for how you operate.",
				supportTitle: "Business support",
				stats: [
					{ value: "24/7", label: "Digital access" },
					{ value: "Secure", label: "Banking services" },
				],
			}}
		/>
	);
};

export default SectionDetailsPrimary;
