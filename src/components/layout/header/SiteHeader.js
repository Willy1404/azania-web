import Header from "@/components/layout/header/Header";
import getNavItems from "@/libs/getNavItems";

const SiteHeader = async (props) => {
	const navItems = await getNavItems();
	return <Header {...props} navItems={navItems} />;
};

export default SiteHeader;
