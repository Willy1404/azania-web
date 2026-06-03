import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import TermsAndConditionsPrimary from "@/components/sections/registration/TermsAndConditionsPrimary";

export default function TermsAndConditions() {
	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Terms and Conditions"}
				text={"Terms and Conditions"}
			/>
			<TermsAndConditionsPrimary />
			<Cta />
		</AzaniaPageShell>
	);
}
