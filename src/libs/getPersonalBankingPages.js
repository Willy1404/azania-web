import { getContentCollection } from "@/lib/cms/content";
import personalBankingPages from "@/libs/personalBankingPages";

const getPersonalBankingPages = async () => {
	return getContentCollection("personal_banking_pages", personalBankingPages);
};

export default getPersonalBankingPages;
