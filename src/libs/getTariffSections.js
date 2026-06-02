import { getContentSingleton } from "@/lib/cms/content";

const defaultTariffSections = [
	{
		title: "Account Services",
		items: [
			{ service: "Account maintenance (monthly)", fee: "As per account type" },
			{ service: "Account statement (branch)", fee: "TZS 2,000" },
			{ service: "Account closure", fee: "TZS 5,000" },
		],
	},
	{
		title: "Transfers & Payments",
		items: [
			{ service: "Internal transfer (internet banking)", fee: "Free" },
			{ service: "EFT to other banks", fee: "TZS 3,500" },
			{ service: "RTGS transfer", fee: "TZS 15,000" },
		],
	},
	{
		title: "Cards",
		items: [
			{ service: "VISA debit card (annual)", fee: "TZS 15,000" },
			{ service: "Card replacement", fee: "TZS 10,000" },
			{ service: "ATM withdrawal (Azania ATM)", fee: "Free" },
		],
	},
	{
		title: "Digital Banking",
		items: [
			{ service: "Mobile banking enrollment", fee: "Free" },
			{ service: "Internet banking enrollment", fee: "Free" },
			{ service: "SMS alert (monthly)", fee: "TZS 1,500" },
		],
	},
	{
		title: "Loans & Credit",
		items: [
			{ service: "Loan application processing", fee: "As per facility type" },
			{ service: "Loan restructuring", fee: "TZS 50,000" },
			{ service: "Credit reference letter", fee: "TZS 10,000" },
		],
	},
];

const getTariffSections = async () => {
	return getContentSingleton("tariff_sections", defaultTariffSections);
};

export default getTariffSections;
