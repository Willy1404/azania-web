import Link from "next/link";
import ButtonPrimary from "../buttons/ButtonPrimary";

const SectionServiceCardHover = ({ page, basePath, image }) => {
	const { title, shortDesc, slug, icon } = page || {};
	const url = `${basePath}/${slug}`;

	return (
		<div className="service-item style-3 wow fadeInUp" data-wow-delay=".3s">
			<div className="service-content-wrap">
				<div className="service-title">
					<div className="service-icon">
						<i className={icon || "tji-service-1"}></i>
					</div>
					<h4 className="title">
						<Link href={url}>{title}</Link>
					</h4>
				</div>
				<div className="service-content">
					<p className="desc">{shortDesc}</p>
					<ButtonPrimary text={"Learn More"} url={url} isTextBtn={true} />
				</div>
			</div>
			<div
				className="service-reveal-bg"
				style={{
					backgroundImage: `url('${image || "/images/service/service-2.webp"}')`,
				}}
			></div>
		</div>
	);
};

export default SectionServiceCardHover;
