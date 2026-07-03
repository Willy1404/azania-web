import sliceText from "@/libs/sliceText";
import Link from "next/link";
import React from "react";
const DEFAULT_BANNER = "/images/bg/pheader-bg.webp";

const HeroInner = ({
	title,
	text,
	breadcrums = [],
	backgroundImage = DEFAULT_BANNER,
	photoBanner = false,
}) => {
	if (photoBanner && backgroundImage !== DEFAULT_BANNER) {
		return (
			<section className="tj-page-header tj-page-header--photo-banner section-gap-x">
				<img
					src={backgroundImage}
					alt={title || "Page banner"}
					className="tj-page-header__photo"
				/>
			</section>
		);
	}

	const isCustomBanner = backgroundImage !== DEFAULT_BANNER;

	return (
		<section
			className={`tj-page-header section-gap-x${isCustomBanner ? " tj-page-header--custom-banner" : ""}`}
			style={{ backgroundImage: `url('${backgroundImage}')` }}
		>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="tj-page-header-content text-center">
							<h1 className={`tj-page-title`}>{title}</h1>
							<div className="tj-page-link">
								<span>
									<i className="tji-home"></i>
								</span>
								<span>
									<Link href="/">Home</Link>
								</span>
								<span>
									<i className="tji-arrow-right"></i>
								</span>
								{breadcrums?.length
									? breadcrums?.map(({ name, path }, idx) => (
											<React.Fragment key={idx}>
												<span>
													<Link href={path ? path : "/"}>{name}</Link>
												</span>
												<span>
													<i className="tji-arrow-right"></i>
												</span>
											</React.Fragment>
									  ))
									: ""}
								<span>
									<span>{sliceText(text, 28, true)}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{!isCustomBanner ? (
				<div
					className="page-header-overlay"
					style={{
						backgroundImage: `url('/images/shape/pheader-overlay.webp')`,
					}}
				></div>
			) : null}
		</section>
	);
};

export default HeroInner;
