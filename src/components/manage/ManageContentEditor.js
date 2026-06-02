"use client";

import FaqEditor from "@/components/manage/editors/FaqEditor";
import ForexRatesEditor from "@/components/manage/editors/ForexRatesEditor";
import HomeNewsEditor from "@/components/manage/editors/HomeNewsEditor";
import ReportsEditor from "@/components/manage/editors/ReportsEditor";
import TariffEditor from "@/components/manage/editors/TariffEditor";

const SINGLETON_EDITORS = {
	home_news: HomeNewsEditor,
	forex_rates: ForexRatesEditor,
	faq_items: FaqEditor,
	reports: ReportsEditor,
	tariff_sections: TariffEditor,
};

const ManageContentEditor = ({
	portalId,
	contentKey,
	label,
	initialData,
	isCollection,
}) => {
	if (isCollection) {
		return null;
	}

	const SingletonEditor = SINGLETON_EDITORS[contentKey];
	if (SingletonEditor) {
		return (
			<SingletonEditor
				portalId={portalId}
				contentKey={contentKey}
				label={label}
				initialData={initialData}
			/>
		);
	}

	return (
		<div className="manage-alert manage-alert--error">
			No visual editor is available for this content type yet.
		</div>
	);
};

export default ManageContentEditor;
