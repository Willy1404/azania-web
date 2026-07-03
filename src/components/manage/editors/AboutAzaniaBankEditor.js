"use client";

import ReportsEditor from "@/components/manage/editors/ReportsEditor";

const SECTIONS = [
	{
		key: "reports",
		label: "Financial & Regulatory Reports",
		contentKey: "reports",
		Editor: ReportsEditor,
	},
];

const AboutAzaniaBankEditor = ({
	portalId,
	label,
	initialData,
	activeSection = "reports",
}) => {
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

AboutAzaniaBankEditor.sections = SECTIONS;

export default AboutAzaniaBankEditor;
