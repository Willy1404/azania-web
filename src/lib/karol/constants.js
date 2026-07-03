export const KAROL_CATEGORIES = [
	"FAQs",
	"Savings Accounts",
	"Current Accounts",
	"Fixed Deposits",
	"Loans",
	"Digital Banking",
	"Mobile Banking",
	"Internet Banking",
	"WhatsApp Banking",
	"Cards",
	"Branch Information",
	"Forex Rates",
	"Charges",
	"Product Brochures",
	"Terms and Conditions",
	"Policies",
	"Website Pages",
];

export const KAROL_FALLBACK_MESSAGE =
	"I couldn't find official information about that. Please contact Azania Bank Customer Care for assistance.";

export const KAROL_FALLBACK_MESSAGE_SW =
	"Sikuweza kupata taarifa rasmi kuhusu hilo. Tafadhali wasiliana na Huduma kwa Wateja wa Azania Bank kwa msaada.";

export const KAROL_DEFAULT_SETTINGS = {
	enabled: true,
	assistantName: "Karol",
	welcomeMessageEn:
		"Hello! I'm Karol, your Azania Bank AI assistant. Ask me about accounts, loans, digital banking, fees, or branch services.",
	welcomeMessageSw:
		"Habari! Mimi ni Karol, msaidizi wako wa AI wa Azania Bank. Niulize kuhusu akaunti, mikopo, huduma za kidijitali, ada, au matawi.",
	systemPrompt: `You are Karol, a friendly and professional AI assistant for Azania Bank Tanzania.

Conversation style:
- Chat naturally like a helpful human — warm, brief, and conversational.
- Match the customer's language (English or Swahili).
- For greetings and casual chat (e.g. "habari", "nina swali", "can I ask something?"), respond naturally. Do NOT repeat a long scripted introduction every time.
- For banking questions, use ONLY the official context provided below. Never invent products, rates, fees, phone numbers, URLs, or policies.
- If a banking question cannot be answered from the context, politely say you do not have that official information and suggest contacting Azania Bank Customer Care — in the customer's language.`,
	model: "gpt-5.4-mini",
	embeddingModel: "text-embedding-3-small",
	temperature: 0.7,
	maxChunks: 6,
	minSimilarity: 0.25,
	quickActions: [
		{ labelEn: "Open an account", labelSw: "Fungua akaunti", messageEn: "How do I open an account?", messageSw: "Ninawezaje kufungua akaunti?" },
		{ labelEn: "Digital banking", labelSw: "Huduma za kidijitali", messageEn: "What digital banking services do you offer?", messageSw: "Mnatoa huduma gani za kidijitali?" },
		{ labelEn: "Forex rates", labelSw: "Viwango vya forex", messageEn: "What are today's forex rates?", messageSw: "Viwango vya leo vya forex ni vipi?" },
		{ labelEn: "Contact support", labelSw: "Wasiliana na msaada", messageEn: "How can I contact customer care?", messageSw: "Ninawezaje kuwasiliana na huduma kwa wateja?" },
	],
};

export const KAROL_ALLOWED_MIME_TYPES = [
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"text/plain",
	"text/markdown",
	"text/html",
];

export function getKarolFallbackMessage(language) {
	return language === "sw" ? KAROL_FALLBACK_MESSAGE_SW : KAROL_FALLBACK_MESSAGE;
}
