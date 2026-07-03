import Link from "next/link";
import { isExternalUrl } from "@/libs/azaniaExternalLinks";

const ButtonPrimary = ({ className, text, isTextBtn, url, type, iconName }) => {
	const btnClass = `${isTextBtn ? "text-btn" : "tj-primary-btn"} ${
		className ? className : ""
	}`;

	return (
		<>
			{type ? (
				<button
					type={type ? type : "submit"}
					className={`tj-primary-btn ${className ? className : ""}`}
				>
					<span className="btn-text">
						<span>{text}</span>
					</span>
					<span className="btn-icon">
						<i className="tji-arrow-right-long"></i>
					</span>
				</button>
			) : isExternalUrl(url) ? (
				<a
					href={url}
					className={btnClass}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="btn-text">
						<span>{text}</span>
					</span>
					<span className="btn-icon">
						<i className="tji-arrow-right-long"></i>
					</span>
				</a>
			) : (
				<Link href={url ? url : "/"} className={btnClass}>
					<span className="btn-text">
						<span>{text}</span>
					</span>
					<span className="btn-icon">
						<i className="tji-arrow-right-long"></i>
					</span>
				</Link>
			)}
		</>
	);
};

export default ButtonPrimary;
