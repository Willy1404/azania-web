import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import BusinessBankingDetailsMain from "@/components/layout/main/BusinessBankingDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import getBusinessBankingPages from "@/libs/getBusinessBankingPages";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BusinessBankingDetails({ params }) {
	const { slug } = await params;
	const items = await getBusinessBankingPages();
	const currentItem = items.find((item) => item.slug === slug);

	if (!currentItem) {
		notFound();
	}

	return (
		<AzaniaPageShell>
			<BusinessBankingDetailsMain currentSlug={slug} items={items} />
			<Cta />
		</AzaniaPageShell>
	);
}
