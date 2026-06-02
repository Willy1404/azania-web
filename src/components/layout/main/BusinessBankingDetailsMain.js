import SectionDetailsMain from "@/components/layout/main/SectionDetailsMain";

const BusinessBankingDetailsMain = ({ currentSlug, items }) => {
	return (
		<SectionDetailsMain
			currentSlug={currentSlug}
			items={items}
			sectionTitle="Business Banking"
			basePath="/business-banking"
			benefitsTitle="Key Benefits for Your Business"
			layout="business"
		/>
	);
};

export default BusinessBankingDetailsMain;
