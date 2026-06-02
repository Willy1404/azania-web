import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import BusinessBankingHubPrimary from "@/components/sections/business-banking/BusinessBankingHubPrimary";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getBusinessBankingPages from "@/libs/getBusinessBankingPages";

export const dynamic = "force-dynamic";

export default async function BusinessBanking() {
	const pages = await getBusinessBankingPages();

	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Business Banking"}
				text={"Business Banking"}
				breadcrums={[]}
			/>
			<BusinessBankingHubPrimary pages={pages} />
			<Cta />
		</AzaniaPageShell>
	);
}
