"use client";

import Cta from "@/components/sections/cta/Cta";
import ErrorPrimary from "@/components/sections/error/ErrorPrimary";
import HeroInner from "@/components/sections/hero/HeroInner";
import AzaniaPageShellClient from "@/components/shared/wrappers/AzaniaPageShellClient";

export default function Error({ reset }) {
	return (
		<AzaniaPageShellClient>
			<HeroInner title={"Something went wrong"} text={"An error occurred"} />
			<ErrorPrimary />
			{reset ? (
				<div className="container section-gap-bottom text-center">
					<button type="button" className="tj-primary-btn" onClick={() => reset()}>
						Try again
					</button>
				</div>
			) : null}
			<Cta />
		</AzaniaPageShellClient>
	);
}
