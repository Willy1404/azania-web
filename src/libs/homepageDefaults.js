export const homepageDefaults = {
	hero: {
		titleMain: "banking",
		titleSub: "beyond ordinary",
		backgroundImage: "/images/ban22.png",
		bannerImage: "/images/ban11.png",
		tagline:
			"Trusted by individuals and businesses across Tanzania for secure, innovative banking that helps you save, grow, and achieve your financial goals.",
		customerImages: ["/images/c1.png", "/images/c2.png", "/images/c3.png"],
		servicesLink: "/business-banking",
		servicesLabelOur: "Our",
		servicesLabelText: "Services",
	},
	about: {
		eyebrow: "About Azania Bank",
		title:
			"We are committed to helping individuals and businesses achieve their financial goals through trusted service, innovation, and lasting relationships.",
		videoThumb: "/images/about/azania-video-thumb.jpg",
		videoUrl: "https://youtu.be/0pQzHilflvs",
		yearsExperience: 30,
		yearsLabel: "Years of Corporate Experience.",
		description:
			"Our approach to customer experience comhensive and data-driven. We begin assessing you current customer touchpoints, identifying areas for improvement, an using insights to develop strategies in that meet your customers’ evolving needs. From optimizing digital platforms.",
		ctaText: "Learn More",
		ctaUrl: "/about-azania-bank",
	},
	newsSection: {
		label: "News & Insight",
		title: "Learn From Our Experts: Dive Into Insights And News.",
		ctaText: "Explore News & Insight",
		ctaUrl: "/reports",
	},
};

export function mergeHomepageConfig(data) {
	const source = data && typeof data === "object" ? data : {};
	return {
		hero: { ...homepageDefaults.hero, ...(source.hero || {}) },
		about: { ...homepageDefaults.about, ...(source.about || {}) },
		newsSection: { ...homepageDefaults.newsSection, ...(source.newsSection || {}) },
	};
}
