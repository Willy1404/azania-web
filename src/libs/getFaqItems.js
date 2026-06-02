import { getContentSingleton } from "@/lib/cms/content";

const defaultFaqItems = [
	{
		question: "How do I open an account with Azania Bank?",
		answer:
			"Visit any Azania Bank branch with valid identification, proof of address, and completed account opening forms. Our staff will guide you through the process.",
	},
	{
		question: "What digital banking channels are available?",
		answer:
			"Azania Bank offers mobile banking, internet banking, WhatsApp banking, and agency banking (WAKALA) for eligible accounts.",
	},
	{
		question: "How can I reset my internet banking password?",
		answer:
			"Contact your branch or call our customer support line. You may also use the password reset option on the internet banking login page if enabled.",
	},
	{
		question: "What are your banking hours?",
		answer:
			"Branches are typically open Monday to Friday, 8:00 AM to 5:00 PM. Agency banking points may have extended hours.",
	},
	{
		question: "How do I report a lost or stolen card?",
		answer:
			"Contact Azania Bank immediately by phone or visit your nearest branch to block your card and request a replacement.",
	},
	{
		question: "Where can I find current fees and charges?",
		answer:
			"View our Tariff Guide under the Support menu or request a copy at any Azania Bank branch.",
	},
];

const getFaqItems = async () => {
	return getContentSingleton("faq_items", defaultFaqItems);
};

export default getFaqItems;
