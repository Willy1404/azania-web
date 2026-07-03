import { getContentSingleton } from "@/lib/cms/content";
import { homepageDefaults, mergeHomepageConfig } from "@/libs/homepageDefaults";

const getHomepage = async () => {
	const data = await getContentSingleton("homepage", homepageDefaults);
	return mergeHomepageConfig(data);
};

export default getHomepage;
