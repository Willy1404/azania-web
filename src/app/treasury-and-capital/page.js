import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import TreasuryCapitalHub from "@/components/sections/treasury-capital/TreasuryCapitalHub";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getTreasuryCapitalPages from "@/libs/getTreasuryCapitalPages";

export const dynamic = "force-dynamic";

export default async function TreasuryAndCapital() {
	const pages = await getTreasuryCapitalPages();

	return (
		<AzaniaPageShell>
			<HeroInner title={"Treasury & Capital"} text={"Treasury & Capital"} />
			<TreasuryCapitalHub pages={pages} />
			<Cta />
		</AzaniaPageShell>
	);
}
