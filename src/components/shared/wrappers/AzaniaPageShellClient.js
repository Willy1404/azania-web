"use client";

import Footer8 from "@/components/layout/footer/Footer8";
import Header from "@/components/layout/header/Header";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

const AzaniaPageShellClient = ({ children, navItems = [] }) => {
	return (
		<div>
			<BackToTop />
			<Header headerType={8} navItems={navItems} />
			<Header headerType={8} isStickyHeader={true} navItems={navItems} />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main>
						<HeaderSpace />
						{children}
					</main>
					<Footer8 />
				</div>
			</div>
			<ClientWrapper />
		</div>
	);
};

export default AzaniaPageShellClient;
