"use client";
import Image from "next/image";
import { useState } from "react";

const TAB_KEYS = [
	{ key: "features", label: "Features" },
	{ key: "benefits", label: "Benefits" },
	{ key: "requirements", label: "Requirements" },
];

const AzaniaProductSolutions = ({
	solutions = [],
	titleLarge,
	shortDesc,
	desc1,
	desc2,
}) => {
	const [activeTabs, setActiveTabs] = useState(
		Object.fromEntries(solutions.map((s) => [s.id, "features"]))
	);

	const setTab = (solutionId, tabKey) => {
		setActiveTabs((prev) => ({ ...prev, [solutionId]: tabKey }));
	};

	if (!solutions.length) {
		return null;
	}

	return (
		<div className="azania-lipa-solutions">
			<div className="azania-lipa-solutions__intro wow fadeInUp">
				<h2 className="title title-anim">{titleLarge}</h2>
				{shortDesc ? (
					<p className="azania-lipa-solutions__lead">{shortDesc}</p>
				) : null}
				{desc1 ? <p className="azania-lipa-solutions__desc">{desc1}</p> : null}
				{desc2 ? <p className="azania-lipa-solutions__desc">{desc2}</p> : null}
			</div>

			<div className="azania-lipa-solutions__list">
				{solutions.map((solution, idx) => {
					const activeTab = activeTabs[solution.id] || "features";
					const items = solution.tabs?.[activeTab] || [];

					return (
						<article
							key={solution.id}
							id={`product-${solution.id}`}
							className="azania-lipa-solution wow fadeInUp"
							data-wow-delay={`${0.1 + idx * 0.1}s`}
						>
							<div className="row align-items-start g-4 g-lg-5">
								<div className="col-lg-5">
									<div className="azania-lipa-solution__media">
										<Image
											src={solution.image}
											alt={solution.title}
											width={320}
											height={320}
										/>
									</div>
									<h3 className="azania-lipa-solution__title">{solution.title}</h3>
									<p className="azania-lipa-solution__text">{solution.description}</p>
								</div>
								<div className="col-lg-7">
									<div className="azania-lipa-solution__tabs" role="tablist">
										{TAB_KEYS.map(({ key, label }) => (
											<button
												key={key}
												type="button"
												role="tab"
												className={
													activeTab === key
														? "azania-lipa-solution__tab is-active"
														: "azania-lipa-solution__tab"
												}
												aria-selected={activeTab === key}
												onClick={() => setTab(solution.id, key)}
											>
												{label}
											</button>
										))}
									</div>
									<div className="azania-lipa-solution__panel" role="tabpanel">
										<ul>
											{items.map((item) => (
												<li key={`${solution.id}-${item.title}`}>
													<strong>{item.title}:</strong>{" "}
													{item.desc || "Included with this service."}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
};

export default AzaniaProductSolutions;
