import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import SectionDetailsMain from "@/components/layout/main/SectionDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import getPersonalBankingPages from "@/libs/getPersonalBankingPages";
import { notFound } from "next/navigation";

const basePath = "/personal-banking";

export const dynamic = "force-dynamic";

export default async function PersonalBankingDetails({ params }) {
	const { slug } = await params;
	const items = await getPersonalBankingPages();
	const currentItem = items.find((item) => item.slug === slug);

	if (!currentItem) {
		notFound();
	}

	return (
		<AzaniaPageShell>
			<SectionDetailsMain
				currentSlug={slug}
				items={items}
				sectionTitle="Personal Banking"
				basePath={basePath}
				benefitsTitle="Key Benefits for You"
				layout="personal"
			/>
			<Cta />
		</AzaniaPageShell>
	);
}
