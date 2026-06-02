import { getContentCollection } from "@/lib/cms/content";
import fallbackPages from "../../public/fakedata/personal-banking-pages.json";

const getPersonalBankingPages = async () => {
	return getContentCollection("personal_banking_pages", fallbackPages);
};

export default getPersonalBankingPages;
