const GREETING_PATTERN =
	/^(habari|hello|hi|hey|good\s*(morning|afternoon|evening)|shikamoo|mambo|salama|jambo)\b/i;
const THANKS_PATTERN = /^(asante|thank\s*you|thanks)\b/i;
const META_QUESTION_PATTERN =
	/^(naweza\s+kuuliza|can\s+i\s+ask|may\s+i\s+ask|nina\s+swali|nina\s+swali\s+\w*|naweza\s+kuuliza\s+swali|naweza\s+kuuliza\s+kitu)/i;
const SHORT_ACK_PATTERN = /^(ok|okay|sawa|ndio|yes|no)\s*[.!?]?$/i;

const BANKING_TOPIC_PATTERN =
	/\b(account|akaunti|loan|mkopo|mikopo|fee|ada|forex|branch|tawi|matawi|card|kadi|deposit|akiba|transfer|lipa|wakala|banking|tariff|rate|bei|password|salary|savings|current|balance|salio|malipo|payment|withdraw|kutoa|kuweka)\b/i;

const BANKING_QUESTION_PATTERN =
	/\b(how|what|where|when|why|which|who|ninawezaje|nini|wapi|lini|kwa nini|ni\s+gani|tell\s+me|explain|describe)\b/i;

export function isBankingQuestion(message) {
	const normalized = message.trim();
	if (!normalized) return false;

	const lower = normalized.toLowerCase();
	return BANKING_TOPIC_PATTERN.test(lower) || BANKING_QUESTION_PATTERN.test(lower);
}

export function isConversationalMessage(message) {
	const normalized = message.trim();
	if (!normalized) return false;
	if (isBankingQuestion(message)) return false;

	const lower = normalized.toLowerCase();

	return (
		GREETING_PATTERN.test(lower) ||
		THANKS_PATTERN.test(lower) ||
		META_QUESTION_PATTERN.test(lower) ||
		SHORT_ACK_PATTERN.test(lower) ||
		normalized.length <= 40
	);
}

export function getConversationalReply(message, language, settings) {
	const lower = message.trim().toLowerCase();

	if (GREETING_PATTERN.test(lower)) {
		return language === "sw"
			? "Habari! Mimi ni Karol, msaidizi wako wa AI wa Azania Bank. Niulize kuhusu akaunti, mikopo, huduma za kidijitali, ada, au matawi."
			: settings.welcomeMessageEn ||
					"Hello! I'm Karol, your Azania Bank AI assistant. Ask me about accounts, loans, digital banking, fees, or branch services.";
	}

	if (THANKS_PATTERN.test(lower)) {
		return language === "sw"
			? "Karibu sana! Niko hapa ikiwa utahitaji msaada zaidi kuhusu Azania Bank."
			: "You're welcome! I'm here if you need more help with Azania Bank services.";
	}

	if (META_QUESTION_PATTERN.test(lower)) {
		return language === "sw"
			? "Bila shaka! Uliza swali lako kuhusu huduma za Azania Bank — akaunti, mikopo, huduma za kidijitali, ada, au matawi."
			: "Of course! Ask me anything about Azania Bank — accounts, loans, digital banking, fees, or branches.";
	}

	if (SHORT_ACK_PATTERN.test(lower)) {
		return language === "sw"
			? "Sawa! Niulize chochote unachohitaji kuhusu Azania Bank."
			: "Sure! Let me know what you'd like to know about Azania Bank.";
	}

	return null;
}
