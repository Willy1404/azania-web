import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import PersonalBankingHub from "@/components/sections/personal-banking/PersonalBankingHub";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getPersonalBankingPages from "@/libs/getPersonalBankingPages";

export const dynamic = "force-dynamic";

export default async function PersonalBanking() {
	const pages = await getPersonalBankingPages();

	return (
		<AzaniaPageShell>
			<HeroInner title={"Personal Banking"} text={"Personal Banking"} />
			<PersonalBankingHub pages={pages} />
			<Cta />
		</AzaniaPageShell>
	);
}
