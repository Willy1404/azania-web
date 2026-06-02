import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import SupportHub from "@/components/sections/support/SupportHub";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";

export default function Support() {
	return (
		<AzaniaPageShell>
			<HeroInner title={"Support"} text={"Support"} />
			<SupportHub />
			<Cta />
		</AzaniaPageShell>
	);
}
