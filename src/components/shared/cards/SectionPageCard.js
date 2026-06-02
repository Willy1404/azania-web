import Link from "next/link";
import ButtonPrimary from "../buttons/ButtonPrimary";

const SectionPageCard = ({ page, basePath }) => {
	const { title, shortDesc, slug, icon, href } = page || {};
	const url = href || `${basePath}/${slug}`;

	return (
		<div className="service-item style-4">
			<div className="service-icon">
				<i className={icon ? icon : "tji-service-1"}></i>
			</div>
			<div className="service-content">
				<h4 className="title">
					<Link href={url}>{title}</Link>
				</h4>
				<p className="desc">{shortDesc}</p>
				<ButtonPrimary text={"Learn More"} url={url} isTextBtn={true} />
			</div>
		</div>
	);
};

export default SectionPageCard;
