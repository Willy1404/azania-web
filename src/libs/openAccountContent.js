import { INTERNET_BANKING_LOGIN_URL } from "@/libs/azaniaExternalLinks";

export const openAccountCategories = [
	{
		id: "personal",
		label: "Personal Accounts",
		icon: "tji-user",
		desc: "Savings, goal-based, children's, and current accounts.",
	},
	{
		id: "business",
		label: "Business Accounts",
		icon: "tji-operations",
		desc: "Current, SME, and diaspora banking solutions.",
	},
	{
		id: "apply",
		label: "How to Open",
		icon: "tji-envelop",
		desc: "Forms, branches, and documents to get started.",
	},
	{
		id: "digital",
		label: "Digital Banking",
		icon: "tji-worldwide",
		desc: "Internet, mobile, and WhatsApp banking channels.",
	},
];

export const openAccountOptions = {
	personal: [
		{
			id: "savings",
			label: "Savings Account",
			title: "Savings Account",
			subtitle:
				"Build your savings with multi-currency support, SMS alerts, and nationwide ATM access.",
			image: "/images/c1.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "Opening balance",
					desc: "TZS 15,000 minimum to open your savings account.",
				},
				{
					title: "Multi-currency",
					desc: "Hold and transact in TZS, USD, EUR, and GBP.",
				},
				{
					title: "Unlimited access",
					desc: "Unlimited access with SMS alerts and a free biannual statement.",
				},
				{
					title: "ATM network",
					desc: "Access to 30+ ATMs across the Azania Bank network.",
				},
			],
		},
		{
			id: "dhamira",
			label: "Dhamira Account",
			title: "Dhamira Account (Goal-based Savings)",
			subtitle:
				"Save for a specific purpose — land, house, car, education, wedding, and more.",
			image: "/images/c2.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "Purpose-driven saving",
					desc: "Save for land, a house, a car, education, a wedding, or other goals.",
				},
				{
					title: "Minimum opening balance",
					desc: "TZS 50,000 or USD/EUR/GBP 50 to get started.",
				},
				{
					title: "12-month minimum plan",
					desc: "Commit to a savings plan of at least 12 months.",
				},
				{
					title: "Attractive interest rates",
					desc: "Earn competitive rates as you work toward your target.",
				},
			],
		},
		{
			id: "watoto",
			label: "Watoto Account",
			title: "Watoto Account (Children's Account)",
			subtitle:
				"A dedicated account for children under 18 — simple, affordable, and secure.",
			image: "/images/l1.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "For children under 18",
					desc: "Designed for kids and teens with guardian oversight.",
				},
				{
					title: "Opening balance",
					desc: "Start with TZS 10,000.",
				},
				{
					title: "No monthly charges",
					desc: "No monthly account maintenance fees.",
				},
				{
					title: "Withdrawal limit",
					desc: "Limited to 4 withdrawals per year to encourage saving.",
				},
				{
					title: "Own a bank card",
					desc: "Eligible account holders can receive their own bank card.",
				},
			],
		},
		{
			id: "current-personal",
			label: "Current Account (Personal)",
			title: "Current Account (Personal)",
			subtitle:
				"For everyday personal transactions with multi-currency flexibility.",
			image: "/images/c3.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "Everyday transactions",
					desc: "Manage daily payments, transfers, and personal banking needs.",
				},
				{
					title: "Multi-currency",
					desc: "Available in multiple currencies to suit how you bank.",
				},
			],
		},
	],
	business: [
		{
			id: "business-current",
			label: "Business Current Account",
			title: "Business Current Account",
			subtitle:
				"Full-service business banking with overdraft, trade finance, and advisory support.",
			image: "/images/c1.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "Overdraft facilities",
					desc: "Working capital support when your business needs flexibility.",
				},
				{
					title: "Trade finance",
					desc: "Solutions for import, export, and cross-border trade.",
				},
				{
					title: "Business advisory services",
					desc: "Guidance from Azania Bank teams who understand your sector.",
				},
				{
					title: "Project financing",
					desc: "Structured finance for capital projects and growth initiatives.",
				},
			],
		},
		{
			id: "sme",
			label: "SME Account",
			title: "SME Account",
			subtitle:
				"Tailored for Small & Medium Enterprises with loans and dedicated business support.",
			image: "/images/c2.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "Built for SMEs",
					desc: "Tailored for Small & Medium Enterprises across Tanzania.",
				},
				{
					title: "SME loans",
					desc: "Access to SME loans when your business is ready to grow.",
				},
				{
					title: "Business support",
					desc: "Relationship-led service from teams focused on SME success.",
				},
			],
		},
		{
			id: "diaspora",
			label: "Diaspora Account",
			title: "Diaspora Account",
			subtitle:
				"For Tanzanians living abroad — save and invest back home with confidence.",
			image: "/images/l2.png",
			href: "/contact",
			ctaText: "Open This Account",
			features: [
				{
					title: "For Tanzanians abroad",
					desc: "Banking designed for the diaspora community.",
				},
				{
					title: "Savings options",
					desc: "Save in Tanzania while you live and work overseas.",
				},
				{
					title: "Investment options",
					desc: "Explore investment opportunities linked to your home market.",
				},
			],
		},
	],
	apply: [
		{
			id: "download-form",
			label: "Download Form",
			title: "Download Account Opening Form",
			subtitle:
				"Get the official Azania Bank account opening form, complete it, and submit at your nearest branch.",
			image: "/images/l1.png",
			href: "/open-account/download-form",
			ctaText: "Download Forms",
			features: [
				{
					title: "Official forms",
					desc: "Use the correct form for business or personal account opening.",
				},
				{
					title: "Print & sign",
					desc: "Complete all sections and sign where required.",
				},
				{
					title: "Supporting documents",
					desc: "Attach ID, registration, and proof of address as listed.",
				},
				{
					title: "Branch submission",
					desc: "Visit any Azania Bank branch to submit your application.",
				},
				{
					title: "Verification",
					desc: "Our team verifies documents and completes KYC checks.",
				},
				{
					title: "Account activation",
					desc: "Receive account details once approval is complete.",
				},
				{
					title: "Digital setup",
					desc: "Enrol in internet or mobile banking after activation.",
				},
				{
					title: "Ongoing support",
					desc: "Branch and call centre support throughout the process.",
				},
			],
		},
		{
			id: "visit-branch",
			label: "Visit a Branch",
			title: "Open an Account at a Branch",
			subtitle:
				"Visit any Azania Bank branch with your documents. Our staff will guide you through every step.",
			image: "/images/l2.png",
			href: "/contact",
			ctaText: "Find a Branch",
			features: [
				{
					title: "Walk-in welcome",
					desc: "No appointment needed — visit during branch banking hours.",
				},
				{
					title: "Document check",
					desc: "Staff review your papers before submission.",
				},
				{
					title: "Form assistance",
					desc: "Help completing forms correctly the first time.",
				},
				{
					title: "Product guidance",
					desc: "Choose the account type that fits your needs.",
				},
				{
					title: "Same-day enquiry",
					desc: "Get answers on fees, limits, and digital banking.",
				},
				{
					title: "Signatory setup",
					desc: "Configure authorised signatories and mandates.",
				},
				{
					title: "Card & cheque book",
					desc: "Order cards and cheque books during onboarding.",
				},
				{
					title: "Relationship start",
					desc: "Meet your branch team for ongoing support.",
				},
			],
		},
		{
			id: "documents",
			label: "Required Documents",
			title: "Documents You Will Need",
			subtitle:
				"Prepare these documents before visiting a branch or submitting your application.",
			image: "/images/l3.png",
			href: "/contact",
			ctaText: "Contact Us",
			features: [
				{
					title: "Valid ID",
					desc: "National ID, passport, or other accepted identification.",
				},
				{
					title: "Business registration",
					desc: "Certificate of incorporation or business licence for companies.",
				},
				{
					title: "TIN certificate",
					desc: "Tax identification documentation where applicable.",
				},
				{
					title: "Proof of address",
					desc: "Utility bill, lease, or official letter showing business address.",
				},
				{
					title: "Board resolution",
					desc: "For corporates — resolution authorising account opening.",
				},
				{
					title: "Signatory IDs",
					desc: "Identification for all authorised account signatories.",
				},
				{
					title: "Passport photos",
					desc: "Recent photos for account records as required.",
				},
				{
					title: "Additional KYC",
					desc: "Extra documents may be requested based on account type.",
				},
			],
		},
	],
	digital: [
		{
			id: "internet-banking",
			label: "Internet Banking",
			title: "Azania Internet Banking",
			subtitle:
				"Bank anytime, anywhere. Transfer funds, pay suppliers, and manage users from a secure online platform.",
			image: "/images/c2.png",
			href: INTERNET_BANKING_LOGIN_URL,
			ctaText: "Login to Internet Banking",
			external: true,
			features: [
				{
					title: "Fund transfers",
					desc: "Move money between accounts and to other banks securely.",
				},
				{
					title: "Bulk payments",
					desc: "Process supplier and payroll payments efficiently.",
				},
				{
					title: "User management",
					desc: "Configure roles, limits, and approval workflows.",
				},
				{
					title: "Statements",
					desc: "Download account statements and transaction reports.",
				},
				{
					title: "Bill payments",
					desc: "Pay utilities and approved billers online.",
				},
				{
					title: "Secure login",
					desc: "Multi-factor authentication and session protection.",
				},
				{
					title: "24/7 access",
					desc: "Manage accounts outside traditional banking hours.",
				},
				{
					title: "Audit trail",
					desc: "Full history for finance and compliance review.",
				},
			],
		},
		{
			id: "mobile-banking",
			label: "Mobile Banking",
			title: "Azania Mobile Banking",
			subtitle:
				"Monitor balances, approve payments, and stay in control on the go with the Azania Bank mobile app.",
			image: "/images/m1.png",
			href: "/business-banking/mobile-banking",
			ctaText: "Learn More",
			features: [
				{
					title: "Balance alerts",
					desc: "Real-time notifications on account activity.",
				},
				{
					title: "Quick transfers",
					desc: "Send money from your phone with secure authentication.",
				},
				{
					title: "Payment approval",
					desc: "Authorise pending transactions on the move.",
				},
				{
					title: "Mini statements",
					desc: "View recent transactions without visiting a branch.",
				},
				{
					title: "Biometric login",
					desc: "Fast, secure access with fingerprint or face ID.",
				},
				{
					title: "Service requests",
					desc: "Request cheques, statements, and support online.",
				},
				{
					title: "Always connected",
					desc: "Bank from anywhere with mobile data or Wi-Fi.",
				},
				{
					title: "Easy onboarding",
					desc: "Register through your branch after account opening.",
				},
			],
		},
		{
			id: "whatsapp-banking",
			label: "WhatsApp Banking",
			title: "Azania WhatsApp Banking",
			subtitle:
				"Check balances, get support, and perform selected services through WhatsApp.",
			image: "/images/scan3.png",
			href: "/business-banking/whatsapp-banking",
			ctaText: "Learn More",
			features: [
				{
					title: "Balance enquiries",
					desc: "Quick account balance checks via chat.",
				},
				{
					title: "Guided support",
					desc: "Step-by-step assistance for common requests.",
				},
				{
					title: "Service menu",
					desc: "Choose from a simple menu of banking services.",
				},
				{
					title: "No app install",
					desc: "Use the WhatsApp app you already have.",
				},
				{
					title: "Secure channel",
					desc: "Bank-approved WhatsApp banking number.",
				},
				{
					title: "Quick updates",
					desc: "Stay informed without logging into full internet banking.",
				},
				{
					title: "Business friendly",
					desc: "Ideal for owners who need fast account updates.",
				},
				{
					title: "Easy to start",
					desc: "Save our number and send a message to begin.",
				},
			],
		},
		{
			id: "apply-ib",
			label: "Apply for IB Access",
			title: "Apply for Internet Banking",
			subtitle:
				"Submit an enquiry to set up business internet banking users and security profiles.",
			image: "/images/l4.png",
			href: "/open-account/internet-banking",
			ctaText: "Apply Now",
			features: [
				{
					title: "Enquiry form",
					desc: "Tell us about your business and banking needs.",
				},
				{
					title: "User setup",
					desc: "Configure administrators, makers, and checkers.",
				},
				{
					title: "Security tokens",
					desc: "Receive credentials and security devices as required.",
				},
				{
					title: "Training",
					desc: "Guidance on using internet banking features.",
				},
				{
					title: "Limit configuration",
					desc: "Set transaction limits aligned to your policy.",
				},
				{
					title: "Approval matrix",
					desc: "Define who approves payments and transfers.",
				},
				{
					title: "Go-live support",
					desc: "Assistance during your first transactions online.",
				},
				{
					title: "Ongoing help",
					desc: "Support desk for technical and operational queries.",
				},
			],
		},
	],
};

export const openAccountVideos = [
	{
		id: "how-to-open",
		title: "How to Open an Account",
		thumbnail: "/images/l5.png",
	},
	{
		id: "documents-guide",
		title: "Documents You Will Need",
		thumbnail: "/images/l6.png",
	},
];
