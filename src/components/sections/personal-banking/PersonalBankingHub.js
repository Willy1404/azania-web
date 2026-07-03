"use client";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";

const categories = [
	{ id: 1, name: "For The Future" },
	{ id: 2, name: "For Today" },
	{ id: 3, name: "For The Family" },
	{ id: 4, name: "Loans" },
];

const PersonalBankingHub = ({ pages = [] }) => {
	return (
		<>
			<section className="section-gap-bottom">
				<div className="container">
					<div className="row align-items-center azania-personal-row flex-column-reverse flex-lg-row">
						<div className="col-lg-6">
							<div className="azania-personal-visual wow fadeInLeft">
								<img src="/images/ban11.png" alt="Personal Banking" />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="wow fadeInRight">
								<span className="sub-title">
									<i className="tji-user"></i>Personal Banking
								</span>
								<h2 className="sec-title title-anim">
									Banking that fits your life, today and tomorrow
								</h2>
								<p className="desc">
									Whether you are planning ahead, managing daily finances, or
									supporting your family — Azania Bank personal solutions are
									designed around real life in Tanzania.
								</p>
								<ButtonPrimary text="Open an Account" url="/open-account" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{categories.map((category) => {
				const categoryPages = pages.filter((p) => p.categoryId === category.id);
				if (!categoryPages.length) return null;

				return (
					<section
						key={category.id}
						className="section-gap-top section-gap-bottom"
					>
						<div className="container">
							<div className="sec-heading style-2 mb-4 wow fadeInUp">
								<h2 className="sec-title title-anim mb-0">{category.name}</h2>
							</div>
							<div className="row row-gap-4">
								{categoryPages.map((page) => (
									<div key={page.slug} className="col-lg-4 col-md-6">
										<Link
											href={`/personal-banking/${page.slug}`}
											className="azania-portal-card wow fadeInUp"
										>
											<div className="portal-icon">
												<i className={page.icon || "tji-user"}></i>
											</div>
											<h3 className="title">{page.title}</h3>
											<p className="desc">{page.shortDesc}</p>
											<span className="text-btn">
												<span className="btn-text">
													<span>Learn more</span>
												</span>
												<span className="btn-icon">
													<i className="tji-arrow-right-long"></i>
												</span>
											</span>
										</Link>
									</div>
								))}
							</div>
						</div>
					</section>
				);
			})}
		</>
	);
};

export default PersonalBankingHub;
