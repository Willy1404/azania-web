import { getContentCollection } from "@/lib/cms/content";
import fallbackPages from "../../public/fakedata/treasury-capital-pages.json";

const getTreasuryCapitalPages = async () => {
	return getContentCollection("treasury_capital_pages", fallbackPages);
};

export default getTreasuryCapitalPages;
