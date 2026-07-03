import { azaniaLipaSolutions } from "@/libs/azaniaLipaSolutions";
import getSectionPageImage from "@/libs/getSectionPageImage";

const buildTabItems = (items, mapFn) =>
	(items || []).map(mapFn).filter((item) => item.title);

const getPageSolutions = (slug, currentItem = {}) => {
	if (currentItem?.solutions?.length) {
		return currentItem.solutions;
	}

	if (slug === "azania-lipa") {
		return azaniaLipaSolutions;
	}

	const {
		title,
		desc1,
		desc2,
		features = [],
		benefits = [],
		faqs = [],
	} = currentItem;

	const featureTabs = buildTabItems(features, (feature) => ({
		title: feature,
		desc: "",
	}));

	const benefitTabs = buildTabItems(benefits, (benefit) => ({
		title: benefit.title,
		desc: benefit.desc,
	}));

	const requirementTabs = buildTabItems(faqs, (faq) => ({
		title: faq.question,
		desc: faq.answer,
	}));

	if (benefits.length) {
		return benefits.slice(0, 3).map((benefit, index) => ({
			id: `${slug}-${index}`,
			title: benefit.title,
			description: benefit.desc || desc1 || "",
			image: getSectionPageImage(slug, index),
			tabs: {
				features:
					index === 0
						? featureTabs
						: featureTabs.slice(index, index + 2).length
							? featureTabs.slice(index, index + 2)
							: [{ title: benefit.title, desc: benefit.desc }],
				benefits: [{ title: benefit.title, desc: benefit.desc }],
				requirements:
					index === 0
						? requirementTabs.slice(0, 2)
						: requirementTabs.slice(2, 4),
			},
		}));
	}

	return [
		{
			id: slug,
			title: title || "Overview",
			description: desc1 || desc2 || "",
			image: getSectionPageImage(slug, 0),
			tabs: {
				features: featureTabs,
				benefits: benefitTabs.length
					? benefitTabs
					: [{ title: title, desc: desc1 || desc2 || "" }],
				requirements: requirementTabs,
			},
		},
	];
};

export default getPageSolutions;
