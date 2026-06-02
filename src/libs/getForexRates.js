import { getContentSingleton } from "@/lib/cms/content";
import fallbackRates from "../../public/fakedata/forex-rates.json";

const getForexRates = async () => {
	return getContentSingleton("forex_rates", fallbackRates);
};

export default getForexRates;
