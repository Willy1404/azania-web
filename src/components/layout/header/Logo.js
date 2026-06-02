"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<div className="site_logo">
			<Link className="logo" href="/">
				<Image
					src="/images/logos/azanialogo.png"
					alt="Azania Bank"
					width={150}
					height={20}
					style={{ width: "100%", height: "auto" }}
					priority
				/>
			</Link>
		</div>
	);
};

export default Logo;
