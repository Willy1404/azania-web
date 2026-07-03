function makePage({
	id,
	slug,
	title,
	category,
	categoryId,
	icon = "tji-user",
	shortDesc,
	desc1,
	features = [],
	faqs = [],
}) {
	return {
		id,
		slug,
		title,
		category,
		categoryId,
		icon,
		titleLarge: title,
		shortDesc,
		desc1,
		desc2: desc1,
		features,
		benefits: [
			{
				number: "01.",
				title: "Trusted banking",
				desc: "Personal solutions backed by Azania Bank's local expertise.",
			},
			{
				number: "02.",
				title: "Flexible access",
				desc: "Branch, digital, and agency channels to suit how you bank.",
			},
			{
				number: "03.",
				title: "Dedicated support",
				desc: "Our teams help you choose and manage the right product.",
			},
		],
		faqs: faqs.length
			? faqs
			: [
					{
						question: `How do I open a ${title}?`,
						answer:
							"Visit any Azania Bank branch with valid identification and required documentation. Our staff will guide you through account opening.",
					},
					{
						question: "What fees apply?",
						answer:
							"Fees and charges are listed in the Azania Bank Tariff Guide. Your branch can confirm current rates for this product.",
					},
				],
	};
}

export const personalBankingPages = [
	makePage({
		id: 1,
		slug: "savings-account",
		title: "Savings Account",
		category: "For The Future",
		categoryId: 1,
		icon: "tji-budget",
		shortDesc:
			"Opening balance TZS 15,000. Multi-currency support in TZS, USD, EUR, and GBP.",
		desc1:
			"Build your savings with unlimited access, SMS alerts, a free biannual statement, and access to 30+ ATMs across the Azania Bank network.",
		features: [
			"Opening balance TZS 15,000",
			"Multi-currency: TZS, USD, EUR, GBP",
			"SMS alerts and free biannual statement",
			"Access to 30+ ATMs",
		],
	}),
	makePage({
		id: 2,
		slug: "dhamira-account",
		title: "Dhamira Account",
		category: "For The Future",
		categoryId: 1,
		icon: "tji-strategy",
		shortDesc: "Goal-based savings for land, house, car, education, wedding, and more.",
		desc1:
			"Save for a specific purpose with a minimum 12-month plan, attractive interest rates, and a minimum opening balance of TZS 50,000 or USD/EUR/GBP 50.",
		features: [
			"Purpose-driven savings goals",
			"Minimum opening TZS 50,000 or USD/EUR/GBP 50",
			"Minimum plan of 12 months",
			"Attractive interest rates",
		],
	}),
	makePage({
		id: 3,
		slug: "fixed-deposit",
		title: "Fixed Deposit",
		category: "For The Future",
		categoryId: 1,
		icon: "tji-performance",
		shortDesc: "Lock in your savings for a fixed term with competitive returns.",
		desc1:
			"Azania Bank fixed deposits help you grow funds securely over a chosen tenor with structured interest paid at maturity or as agreed.",
		features: [
			"Fixed tenors",
			"Competitive interest rates",
			"Secure capital preservation",
			"Flexible currency options",
		],
	}),
	makePage({
		id: 4,
		slug: "students-account",
		title: "Students Account (Aspire Account)",
		category: "For Today",
		categoryId: 2,
		icon: "tji-user",
		shortDesc: "Everyday banking designed for students and young professionals.",
		desc1:
			"The Aspire Account supports students with affordable banking, digital access, and tools to manage daily finances while studying.",
		features: [
			"Student-friendly banking",
			"Digital access",
			"Debit card eligibility",
			"Affordable maintenance",
		],
	}),
	makePage({
		id: 5,
		slug: "diaspora-account",
		title: "Diaspora Account (Asili Account)",
		category: "For Today",
		categoryId: 2,
		icon: "tji-worldwide",
		shortDesc: "Banking for Tanzanians living abroad with savings and investment options.",
		desc1:
			"The Asili Diaspora Account connects you to home — save, invest, and manage finances in Tanzania while living overseas.",
		features: [
			"For Tanzanians abroad",
			"Savings in Tanzania",
			"Investment options",
			"Remittance-friendly banking",
		],
	}),
	makePage({
		id: 6,
		slug: "mwanamke-hodari",
		title: "Mwanamke Hodari",
		category: "For Today",
		categoryId: 2,
		icon: "tji-excellence",
		shortDesc: "Empowering women with tailored personal banking and financial support.",
		desc1:
			"Mwanamke Hodari supports enterprising women with banking solutions designed for personal and business growth.",
		features: [
			"Tailored for women",
			"Savings and transaction support",
			"Financial empowerment focus",
			"Access to Azania Bank network",
		],
	}),
	makePage({
		id: 7,
		slug: "watoto-account",
		title: "Watoto Account",
		category: "For The Family",
		categoryId: 3,
		icon: "tji-user",
		shortDesc:
			"Children's account for kids under 18 — TZS 10,000 opening, no monthly charges.",
		desc1:
			"Help children learn to save with a Watoto Account featuring no monthly charges, limited withdrawals, and their own bank card.",
		features: [
			"For children under 18",
			"Opening balance TZS 10,000",
			"No monthly charges",
			"Limited to 4 withdrawals per year",
			"Own a bank card",
		],
	}),
	makePage({
		id: 8,
		slug: "wastaafu-account",
		title: "Wastaafu Account",
		category: "For The Family",
		categoryId: 3,
		icon: "tji-budget",
		shortDesc: "Retirement-focused savings for a secure and comfortable future.",
		desc1:
			"The Wastaafu Account helps retirees and pre-retirees manage income and savings with products suited to life after work.",
		features: [
			"Retirement-focused savings",
			"Steady access to funds",
			"Structured for pensioners",
			"Branch and digital support",
		],
	}),
	makePage({
		id: 9,
		slug: "ziada-account",
		title: "Ziada Account",
		category: "For The Family",
		categoryId: 3,
		icon: "tji-strategy",
		shortDesc: "Extra savings potential for households planning together.",
		desc1:
			"Ziada Account offers families additional savings flexibility to support shared goals and household financial planning.",
		features: [
			"Household savings",
			"Flexible deposits",
			"Competitive returns",
			"Family-oriented banking",
		],
	}),
	makePage({
		id: 10,
		slug: "consumer-loans",
		title: "Consumer Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-budget",
		shortDesc: "Finance personal purchases and consumer needs with structured repayment.",
		desc1:
			"Consumer loans from Azania Bank help you acquire goods and services with clear terms and manageable instalments.",
		features: ["Personal consumer finance", "Structured repayment", "Transparent terms"],
	}),
	makePage({
		id: 11,
		slug: "mortgage-loans",
		title: "Mortgage Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-home",
		shortDesc: "Home financing solutions for buying or building property.",
		desc1:
			"Azania Bank mortgage loans support home ownership with long-term financing aligned to your income and property goals.",
		features: ["Home purchase finance", "Long-term tenors", "Property-focused assessment"],
	}),
	makePage({
		id: 12,
		slug: "personal-loans",
		title: "Personal Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-user",
		shortDesc: "General-purpose personal loans for education, emergencies, and life events.",
		desc1:
			"Personal loans provide flexible financing for individual needs with assessment based on your repayment capacity.",
		features: ["Flexible purpose", "Competitive rates", "Clear repayment schedule"],
	}),
	makePage({
		id: 13,
		slug: "salary-advance-loans",
		title: "Salary Advance Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-operations",
		shortDesc: "Short-term advances against salary for urgent personal needs.",
		desc1:
			"Salary advance facilities offer quick access to funds for salaried customers with repayment aligned to your pay cycle.",
		features: ["For salaried customers", "Quick access", "Pay-cycle repayment"],
	}),
	makePage({
		id: 14,
		slug: "kikundi-account",
		title: "Kikundi Account",
		category: "Loans",
		categoryId: 4,
		icon: "tji-manage",
		shortDesc: "Group savings and lending for communities and informal groups.",
		desc1:
			"Kikundi Account supports groups with collective savings and access to group-based lending structures.",
		features: ["Group savings", "Collective lending", "Community banking"],
	}),
	makePage({
		id: 15,
		slug: "uni-mshiko",
		title: "UNI-MSHIKO",
		category: "Loans",
		categoryId: 4,
		icon: "tji-box",
		shortDesc: "Support product designed for resilience and emergency needs.",
		desc1:
			"UNI-MSHIKO provides personal customers with access to support financing when unexpected needs arise.",
		features: ["Emergency support", "Structured access", "Personal resilience"],
	}),
	makePage({
		id: 16,
		slug: "wastaafu-loans",
		title: "Wastaafu Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-budget",
		shortDesc: "Loans tailored for retirees and pension-backed customers.",
		desc1:
			"Wastaafu Loans offer financing options suited to retirement income and pension arrangements.",
		features: ["Retirement-focused lending", "Pension-aware assessment", "Flexible terms"],
	}),
	makePage({
		id: 17,
		slug: "mwanamke-hodari-loans",
		title: "Mwanamke Hodari Loans",
		category: "Loans",
		categoryId: 4,
		icon: "tji-excellence",
		shortDesc: "Loan products supporting women entrepreneurs and professionals.",
		desc1:
			"Mwanamke Hodari Loans provide financing designed to support women's personal and business ambitions.",
		features: [
			"Women-focused lending",
			"Entrepreneurship support",
			"Structured repayment",
		],
	}),
];

export default personalBankingPages;
