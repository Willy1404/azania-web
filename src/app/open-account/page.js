import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import Cta from "@/components/sections/cta/Cta";
import OpenAccountHero from "@/components/sections/open-account/OpenAccountHero";
import OpenAccountHub from "@/components/sections/open-account/OpenAccountHub";

export default function OpenAccount() {
	return (
		<AzaniaPageShell>
			<OpenAccountHero />
			<OpenAccountHub />
			<Cta />
		</AzaniaPageShell>
	);
}
