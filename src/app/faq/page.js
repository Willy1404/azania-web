import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import AzaniaFaq from "@/components/sections/faq/AzaniaFaq";
import Cta from "@/components/sections/cta/Cta";
import HeroInner from "@/components/sections/hero/HeroInner";
import getFaqItems from "@/libs/getFaqItems";

export const dynamic = "force-dynamic";

export default async function Faq() {
	const faqItems = await getFaqItems();

	return (
		<AzaniaPageShell>
			<HeroInner
				title={"Frequently Asked Questions"}
				text={"Frequently Asked Questions"}
				breadcrums={[{ name: "Support", path: "/support" }]}
			/>
			<AzaniaFaq faqItems={faqItems} />
			<Cta />
		</AzaniaPageShell>
	);
}
