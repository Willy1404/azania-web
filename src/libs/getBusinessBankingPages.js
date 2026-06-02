import { getContentCollection } from "@/lib/cms/content";
import fallbackPages from "../../public/fakedata/business-banking-pages.json";

const getBusinessBankingPages = async () => {
	return getContentCollection("business_banking_pages", fallbackPages);
};

export default getBusinessBankingPages;
