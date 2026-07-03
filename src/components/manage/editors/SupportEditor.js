"use client";

import FaqEditor from "@/components/manage/editors/FaqEditor";
import TariffEditor from "@/components/manage/editors/TariffEditor";

const SECTIONS = [
	{
		key: "faq",
		label: "Frequently Asked Questions",
		contentKey: "faq_items",
		Editor: FaqEditor,
	},
	{
		key: "tariff",
		label: "Tariff Guide",
		contentKey: "tariff_sections",
		Editor: TariffEditor,
	},
];

const SupportEditor = ({ portalId, label, initialData, activeSection = "faq" }) => {
	const section = SECTIONS.find((item) => item.key === activeSection) || SECTIONS[0];
	const Editor = section.Editor;

	return (
		<Editor
			portalId={portalId}
			contentKey={section.contentKey}
			label={section.label}
			initialData={initialData?.[section.key]}
		/>
	);
};

SupportEditor.sections = SECTIONS;

export default SupportEditor;
