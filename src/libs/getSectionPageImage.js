const imagePool = [
	"/images/b1.png",
	"/images/b2.png",
	"/images/b3.png",
	"/images/b4.png",
	"/images/b5.png",
	"/images/b6.png",
	"/images/o1.png",
	"/images/vinesh.png",
	"/images/ban11.png",
];

const slugImageMap = {
	"for-the-future": "/images/o1.png",
	"for-today": "/images/vinesh.png",
	"for-the-family": "/images/b3.png",
	loans: "/images/b4.png",
	"azania-capital-limited": "/images/m1.png",
	forex: "/images/ban22.png",
	"capital-market-services": "/images/m2.png",
	"alternative-channels": "/images/b1.png",
	"azania-lipa": "/images/scan3.png",
	"whatsapp-banking": "/images/c1.png",
	"internet-banking": "/images/c2.png",
	"mobile-banking": "/images/c3.png",
};

const getSlugHash = (slug = "") =>
	slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

const getSectionPageImage = (slug, variant = 0) => {
	if (slugImageMap[slug]) {
		return slugImageMap[slug];
	}

	const index = (getSlugHash(slug) + variant) % imagePool.length;
	return imagePool[index];
};

export default getSectionPageImage;
