import AzaniaPageShell from "@/components/shared/wrappers/AzaniaPageShell";
import Cta from "@/components/sections/cta/Cta";
import ErrorPrimary from "@/components/sections/error/ErrorPrimary";
import HeroInner from "@/components/sections/hero/HeroInner";

export default function NotFound() {
	return (
		<AzaniaPageShell>
			<HeroInner title={"Error 404"} text={"Page not found"} />
			<ErrorPrimary />
			<Cta />
		</AzaniaPageShell>
	);
}
