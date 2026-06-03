import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import ForexRatesTicker from "@/components/sections/funfacts/ForexRatesTicker";
import getForexRates from "@/libs/getForexRates";
import getHomeNews from "@/libs/getHomeNews";
import Image from "next/image";
import Link from "next/link";

const Funfact3 = async () => {
	const newsItems = await getHomeNews();
	const forex = await getForexRates();

	return (
		<section className="azania-news-forex section-gap">
			<div className="container">
				<div className="row g-4 g-xl-5 align-items-stretch">
					<div className="col-lg-7">
						<div className="azania-news-forex__intro wow fadeInUp" data-wow-delay=".2s">
							<span className="azania-section-label">
								News &amp; Insight
								<span className="azania-section-label__line" aria-hidden="true" />
							</span>
							<h2 className="sec-title">
								Learn From Our Experts: Dive Into Insights And News.
							</h2>
							<div className="azania-news-forex__cta wow fadeInUp" data-wow-delay=".4s">
								<ButtonPrimary
									text={"Explore News & Insight"}
									url={"/reports"}
									className={"transparent-btn azania-outline-btn"}
								/>
							</div>
						</div>

						<div className="azania-news-list">
							{newsItems.map((item, idx) => (
								<article
									key={item.id}
									className="azania-news-item wow fadeInUp"
									data-wow-delay={`${0.3 + idx * 0.1}s`}
								>
									<Link href={item.url} className="azania-news-item__thumb">
										<Image
											src={item.img}
											alt=""
											width={120}
											height={90}
										/>
									</Link>
									<div className="azania-news-item__body">
										<h3 className="azania-news-item__title">
											<Link href={item.url}>{item.title}</Link>
										</h3>
										<p className="azania-news-item__excerpt">{item.excerpt}</p>
										<Link href={item.url} className="azania-news-item__link">
											Learn more
											<i className="tji-arrow-right-long" aria-hidden="true" />
										</Link>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="col-lg-5">
						<aside
							className="azania-forex-card wow fadeInRight"
							data-wow-delay=".3s"
							aria-label="Foreign exchange rates"
						>
							<div className="azania-forex-card__top">
								<p className="azania-forex-card__date">{forex.updatedAt}</p>
								<span className="azania-forex-card__icon" aria-hidden="true">
									<i className="tji-worldwide" />
								</span>
							</div>

							<h3 className="azania-forex-card__title">{forex.title}</h3>
							<p className="azania-forex-card__subtitle">{forex.subtitle}</p>

							<ForexRatesTicker rates={forex.rates} />

							<Link
								href={forex.branchCta.url}
								className="azania-forex-card__branch-btn"
							>
								{forex.branchCta.text}
								<i className="tji-arrow-right-long" aria-hidden="true" />
							</Link>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Funfact3;
