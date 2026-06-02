import { getContentSingleton } from "@/lib/cms/content";
import fallbackNews from "../../public/fakedata/home-news.json";

const getHomeNews = async () => {
	return getContentSingleton("home_news", fallbackNews);
};

export default getHomeNews;
