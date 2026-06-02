import Link from "next/link";
import ButtonPrimary from "../buttons/ButtonPrimary";

const BusinessBankingCard = ({ page }) => {
	const { title, shortDesc, slug, icon } = page || {};

	return (
		<div className="service-item style-4">
			<div className="service-icon">
				<i className={icon ? icon : "tji-service-1"}></i>
			</div>
			<div className="service-content">
				<h4 className="title">
					<Link href={`/business-banking/${slug}`}>{title}</Link>
				</h4>
				<p className="desc">{shortDesc}</p>
				<ButtonPrimary
					text={"Learn More"}
					url={`/business-banking/${slug}`}
					isTextBtn={true}
				/>
			</div>
		</div>
	);
};

export default BusinessBankingCard;
