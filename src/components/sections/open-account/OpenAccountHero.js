import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import Link from "next/link";

const OpenAccountHero = () => {
	return (
		<section className="azania-open-account-hero section-gap-x">
			<div
				className="azania-open-account-hero__bg"
				style={{ backgroundImage: "url('/images/ban22.png')" }}
				aria-hidden="true"
			/>
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-7 col-xl-6">
						<div className="azania-open-account-hero__content wow fadeInUp">
							<nav className="azania-open-account-hero__breadcrumbs" aria-label="Breadcrumb">
								<Link href="/">Home</Link>
								<span aria-hidden="true">/</span>
								<Link href="/business-banking">Business Banking</Link>
								<span aria-hidden="true">/</span>
								<span>Open an Account</span>
							</nav>
							<h1 className="azania-open-account-hero__title">
								Tailored Solutions For Every Financial Chapter
							</h1>
							<p className="azania-open-account-hero__desc">
								Open your Azania Bank account with confidence — from personal
								savings and children&apos;s accounts to business and diaspora
								banking. Choose the right account and start today.
							</p>
							<ButtonPrimary text="Request a Callback" url="/contact" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OpenAccountHero;
