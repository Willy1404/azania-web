const SWAHILI_QUERY_HINTS = {
	akaunti: "account",
	fungua: "open account",
	mkopo: "loan",
	mikopo: "loans",
	huduma: "services",
	kidijitali: "digital banking",
	simu: "mobile banking",
	mtandao: "internet banking",
	forex: "forex rates",
	ada: "fees charges tariff",
	matawi: "branch",
	wasiliana: "contact customer care",
	ninawezaje: "how do I",
	bei: "rates fees",
};

export function expandQueryForRetrieval(query) {
	const lower = query.toLowerCase();
	const extras = [];

	for (const [sw, en] of Object.entries(SWAHILI_QUERY_HINTS)) {
		if (lower.includes(sw)) extras.push(en);
	}

	return extras.length ? `${query} ${extras.join(" ")}` : query;
}

const STOP_WORDS = new Set([
	"the", "and", "for", "are", "with", "what", "how", "can", "you", "your", "about", "that", "this",
	"from", "have", "does", "will", "our", "any", "all", "get", "use",
	"na", "ya", "kwa", "ni", "nini", "je", "gani", "kutoka",
]);

export function tokenizeQuery(text) {
	return text
		.toLowerCase()
		.split(/[^a-z0-9\u00C0-\u024F]+/i)
		.filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function scoreKeywordMatch(query, content, title = "") {
	const tokens = tokenizeQuery(query);
	if (!tokens.length) return 0;

	const haystack = `${title}\n${content}`.toLowerCase();
	let hits = 0;

	for (const token of tokens) {
		if (haystack.includes(token)) hits += 1;
	}

	let score = hits / tokens.length;

	const queryLower = query.toLowerCase().trim();
	if (haystack.includes(queryLower)) {
		score += 1.5;
	}

	for (let i = 0; i < tokens.length - 1; i += 1) {
		const phrase = `${tokens[i]} ${tokens[i + 1]}`;
		if (haystack.includes(phrase)) score += 0.35;
	}

	const faqMatch = content.match(/^Question:\s*(.+?)(?:\n|$)/i);
	if (faqMatch) {
		const question = faqMatch[1].toLowerCase();
		const overlap = tokens.filter((token) => question.includes(token)).length;
		score += (overlap / tokens.length) * 0.8;
	}

	if (title) {
		const titleLower = title.toLowerCase();
		const titleOverlap = tokens.filter((token) => titleLower.includes(token)).length;
		score += (titleOverlap / tokens.length) * 0.25;
	}

	return score;
}
