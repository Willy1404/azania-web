"use client";
import SectionDetailsProductLayout from "@/components/sections/section-pages/SectionDetailsProductLayout";

const SectionDetailsPersonal = ({ option }) => {
	return (
		<SectionDetailsProductLayout
			option={option}
			faqId="faqPersonal"
			asideConfig={{
				ctaText: "Open an Account",
				ctaUrl: "/open-account",
				solutionsLabel: "Personal banking options",
				photoTitle: "Banking for every stage of life",
				photoDesc:
					"Discover personal banking products tailored to your goals, family, and future.",
				supportTitle: "Personal banking support",
				stats: [
					{ value: "24/7", label: "Digital access" },
					{ value: "Secure", label: "Banking services" },
				],
			}}
		/>
	);
};

export default SectionDetailsPersonal;
