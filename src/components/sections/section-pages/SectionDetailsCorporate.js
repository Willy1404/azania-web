"use client";
import SectionDetailsProductLayout from "@/components/sections/section-pages/SectionDetailsProductLayout";

const SectionDetailsCorporate = ({ option }) => {
	return (
		<SectionDetailsProductLayout
			option={option}
			faqId="faqCorporate"
			asideConfig={{
				ctaText: "Contact Treasury",
				ctaUrl: "/support",
				solutionsLabel: "Treasury & capital services",
				photoTitle: "Institutional banking expertise",
				photoDesc:
					"Access treasury, forex, and capital market services backed by Azania Bank.",
				supportTitle: "Treasury desk",
				stats: [
					{ value: "FOREX", label: "Trading support" },
					{ value: "Expert", label: "Advisory services" },
				],
			}}
		/>
	);
};

export default SectionDetailsCorporate;
