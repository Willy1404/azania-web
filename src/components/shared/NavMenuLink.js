import Link from "next/link";
import { isExternalUrl } from "@/libs/azaniaExternalLinks";

const NavMenuLink = ({ href = "#", className, children, onClick }) => {
	if (isExternalUrl(href)) {
		return (
			<a
				href={href}
				className={className}
				target="_blank"
				rel="noopener noreferrer"
				onClick={onClick}
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href || "#"} className={className} onClick={onClick}>
			{children}
		</Link>
	);
};

export default NavMenuLink;
