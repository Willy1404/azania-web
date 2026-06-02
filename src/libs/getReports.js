import { getContentSingleton } from "@/lib/cms/content";

const defaultReports = [
	{
		year: "2025",
		title: "Annual Report 2025",
		desc: "Comprehensive overview of Azania Bank performance, strategy, and governance for the financial year.",
		type: "Annual",
	},
	{
		year: "2024",
		title: "Annual Report 2024",
		desc: "Financial statements, management discussion, and corporate governance report.",
		type: "Annual",
	},
	{
		year: "2025",
		title: "Quarterly Financial Statement Q4 2025",
		desc: "Unaudited quarterly results and key performance indicators.",
		type: "Quarterly",
	},
	{
		year: "2025",
		title: "Quarterly Financial Statement Q3 2025",
		desc: "Interim financial results and operational highlights.",
		type: "Quarterly",
	},
	{
		year: "2025",
		title: "Regulatory Disclosure – Capital Adequacy",
		desc: "Capital adequacy ratios and regulatory compliance disclosures.",
		type: "Regulatory",
	},
	{
		year: "2025",
		title: "Corporate Governance Report",
		desc: "Board composition, committees, and governance practices.",
		type: "Governance",
	},
];

const getReports = async () => {
	return getContentSingleton("reports", defaultReports);
};

export default getReports;
