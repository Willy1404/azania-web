import { getContentSingleton } from "@/lib/cms/content";
import fallbackNav from "../../public/fakedata/nav-items.json";

const getNavItems = async () => {
	return getContentSingleton("nav_items", fallbackNav);
};

export default getNavItems;
