import Link from "next/link";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import NavMenuLink from "@/components/shared/NavMenuLink";
import { INTERNET_BANKING_LOGIN_URL } from "@/libs/azaniaExternalLinks";
import MobileNavbar from "./MobileNavbar";

const MobileMenu = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	navItems = [],
	headerType = 1,
}) => {
	const handleClick = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<div
				className={`body-overlay  ${isMobileMenuOpen ? "opened" : ""}`}
				onClick={handleClick}
			></div>
			<div
				className={`hamburger-area d-lg-none ${
					isMobileMenuOpen ? "opened" : ""
				}`}
			>
				<div className="hamburger_bg"></div>
				<div className="hamburger_wrapper">
					<div className="hamburger_inner">
						<div className="hamburger_top d-flex align-items-center justify-content-between">
							<div className="hamburger_logo">
								<Link href="/" className="mobile_logo" onClick={handleClick}>
									<img src="/images/logos/azanialogo.png" alt="Azania Bank" />
								</Link>
							</div>
							<div className="hamburger_close">
								<button className="hamburger_close_btn" onClick={handleClick}>
									<i className="fa-thin fa-times"></i>
								</button>
							</div>
						</div>

						{headerType !== 5 ? (
							<div className="hamburger-cta-buttons">
								{headerType === 8 ? (
									<ButtonPrimary
										text="Internet Banking"
										url={INTERNET_BANKING_LOGIN_URL}
										className="btn-dark w-100"
									/>
								) : null}
								<ButtonPrimary text="Open Account" url="/open-account" className="w-100" />
							</div>
						) : null}

						<MobileNavbar navItems={navItems} />
						<div className="hamburger-infos">
							<h5 className="hamburger-title">Contact Info</h5>
							<div className="contact-info">
								<div className="contact-item">
									<span className="subtitle">Phone</span>
									<Link className="contact-link" href="tel:+255000000000">
										+255 000 000 000
									</Link>
								</div>
								<div className="contact-item">
									<span className="subtitle">Email</span>
									<Link
										className="contact-link"
										href="mailto:info@azaniabank.co.tz"
									>
										info@azaniabank.co.tz
									</Link>
								</div>
								<div className="contact-item">
									<span className="subtitle">Location</span>
									<span className="contact-link">
										Dar es Salaam, Tanzania
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="hamburger-socials">
						<h5 className="hamburger-title">Follow Us</h5>
						<div className="social-links style-3">
							<ul>
								<li>
									<Link href="https://www.facebook.com/" target="_blank">
										<i className="fa-brands fa-facebook-f"></i>
									</Link>
								</li>
								<li>
									<Link href="https://www.instagram.com/" target="_blank">
										<i className="fa-brands fa-instagram"></i>
									</Link>
								</li>
								<li>
									<Link href="https://x.com/" target="_blank">
										<i className="fa-brands fa-x-twitter"></i>
									</Link>
								</li>
								<li>
									<Link href="https://www.linkedin.com/" target="_blank">
										<i className="fa-brands fa-linkedin-in"></i>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;
