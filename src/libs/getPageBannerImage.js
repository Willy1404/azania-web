const DEFAULT_BANNER = "/images/bg/pheader-bg.webp";
const PRODUCT_BANNER = "/images/ban.png";

const pageBannerMap = {
	"alternative-channels": PRODUCT_BANNER,
	"azania-lipa": PRODUCT_BANNER,
	"whatsapp-banking": PRODUCT_BANNER,
};

const getPageBannerImage = (slug) =>
	pageBannerMap[slug] || PRODUCT_BANNER;

export default getPageBannerImage;
export { DEFAULT_BANNER };
