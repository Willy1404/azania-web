import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import SectionDetailsMain from "@/components/layout/main/SectionDetailsMain";
import Cta from "@/components/sections/cta/Cta";
import getTreasuryCapitalPages from "@/libs/getTreasuryCapitalPages";
import { notFound } from "next/navigation";

const basePath = "/treasury-and-capital";

export const dynamic = "force-dynamic";

export default async function TreasuryCapitalDetails({ params }) {
	const { slug } = await params;
	const items = await getTreasuryCapitalPages();
	const currentItem = items.find((item) => item.slug === slug);

	if (!currentItem) {
		notFound();
	}

	return (
		<AzaniaPageShell>
			<SectionDetailsMain
				currentSlug={slug}
				items={items}
				sectionTitle="Treasury & Capital"
				basePath={basePath}
				benefitsTitle="Key Benefits"
				layout="corporate"
			/>
			<Cta />
		</AzaniaPageShell>
	);
}
