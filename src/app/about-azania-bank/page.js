import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import AboutAzaniaHub from "@/components/sections/about-azania/AboutAzaniaHub";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";

export default function AboutAzaniaBank() {
	return (
		<AzaniaPageShell>
			<HeroInner title={"About Azania Bank"} text={"About Azania Bank"} />
			<AboutAzaniaHub />
			<Cta />
		</AzaniaPageShell>
	);
}
