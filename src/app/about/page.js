import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import About3 from "@/components/sections/about/About3";
import Brands1 from "@/components/sections/brands/Brands1";
import Cta from "@/components/sections/cta/Cta";
import Faq2 from "@/components/sections/faq/Faq2";
import Features from "@/components/sections/features/Features";
import HeroInner from "@/components/sections/hero/HeroInner";
import Team1 from "@/components/sections/teams/Team1";
import Testimonials2 from "@/components/sections/testimonials/Testimonials2";

export default function About() {
	return (
		<AzaniaPageShell>
			<HeroInner
				title={"About Azania Bank"}
				text={"About Azania Bank"}
				breadcrums={[
					{ name: "About Azania Bank", path: "/about-azania-bank" },
				]}
			/>
			<Features type={2} />
			<About3 type={2} />
			<Brands1 type={2} />
			<Testimonials2 type={2} />
			<Team1 type={3} />
			<Faq2 type={3} />
			<Cta />
		</AzaniaPageShell>
	);
}
