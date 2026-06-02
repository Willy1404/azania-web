import HeroInner from "@/components/sections/hero/HeroInner";
import SectionDetailsPrimary from "@/components/sections/section-pages/SectionDetailsPrimary";
import SectionDetailsPersonal from "@/components/sections/section-pages/SectionDetailsPersonal";
import SectionDetailsCorporate from "@/components/sections/section-pages/SectionDetailsCorporate";

const SectionDetailsMain = ({
	currentSlug,
	items,
	sectionTitle,
	basePath,
	benefitsTitle,
	breadcrumbPath,
	layout = "business",
}) => {
	const currentIndex = items.findIndex((item) => item.slug === currentSlug);
	const currentItem = items[currentIndex];
	const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
	const nextItem =
		currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
	const { title } = currentItem || {};

	const option = {
		currentItem,
		items,
		prevSlug: prevItem?.slug,
		nextSlug: nextItem?.slug,
		isPrevItem: !!prevItem,
		isNextItem: !!nextItem,
		basePath,
		benefitsTitle,
	};

	const breadcrumbs = [
		{
			name: sectionTitle,
			path: breadcrumbPath || basePath,
		},
	];

	if (layout === "corporate") {
		return (
			<div>
				<HeroInner
					title={title || sectionTitle}
					text={title || sectionTitle}
					breadcrums={breadcrumbs}
				/>
				<SectionDetailsCorporate option={option} />
			</div>
		);
	}

	if (layout === "personal") {
		return (
			<div>
				<HeroInner
					title={title || sectionTitle}
					text={title || sectionTitle}
					breadcrums={breadcrumbs}
				/>
				<SectionDetailsPersonal option={option} />
			</div>
		);
	}

	return (
		<div>
			<HeroInner
				title={title || sectionTitle}
				text={title || sectionTitle}
				breadcrums={breadcrumbs}
			/>
			<SectionDetailsPrimary option={option} />
		</div>
	);
};

export default SectionDetailsMain;
