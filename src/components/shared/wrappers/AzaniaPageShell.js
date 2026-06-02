import Footer8 from "@/components/layout/footer/Footer8";
import SiteHeader from "@/components/layout/header/SiteHeader";
import BackToTop from "@/components/shared/others/BackToTop";
import HeaderSpace from "@/components/shared/others/HeaderSpace";
import ClientWrapper from "@/components/shared/wrappers/ClientWrapper";

const AzaniaPageShell = async ({ children }) => {
	return (
		<div>
			<BackToTop />
			<SiteHeader headerType={8} />
			<SiteHeader headerType={8} isStickyHeader={true} />
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

export default AzaniaPageShell;
