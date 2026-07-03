"use client";

import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const statFields = [
	{ key: "value", label: "Value", defaultValue: "24/7" },
	{ key: "label", label: "Label", defaultValue: "Digital access" },
];

const AsideConfigEditor = ({ config = {}, onChange }) => {
	const update = (key, value) => onChange({ ...config, [key]: value });

	return (
		<div className="manage-aside-editor">
			<p className="manage-editor__hint">
				Controls the right-hand sidebar: CTA button, labels, and support text.
			</p>
			<div className="manage-form__grid">
				<ManageFormField
					label="CTA button text"
					value={config.ctaText || ""}
					onChange={(v) => update("ctaText", v)}
				/>
				<ManageFormField
					label="CTA button link"
					value={config.ctaUrl || ""}
					onChange={(v) => update("ctaUrl", v)}
				/>
			</div>
			<ManageFormField
				label="Solutions section label"
				value={config.solutionsLabel || ""}
				onChange={(v) => update("solutionsLabel", v)}
			/>
			<ManageFormField
				label="Photo card title"
				value={config.photoTitle || ""}
				onChange={(v) => update("photoTitle", v)}
			/>
			<ManageFormField
				label="Photo card description"
				type="textarea"
				value={config.photoDesc || ""}
				onChange={(v) => update("photoDesc", v)}
			/>
			<ManageFormField
				label="Support section title"
				value={config.supportTitle || ""}
				onChange={(v) => update("supportTitle", v)}
			/>
			<ManageObjectList
				label="Stat cards (sidebar)"
				items={config.stats || []}
				fields={statFields}
				onChange={(v) => update("stats", v)}
				addLabel="+ Add stat"
			/>
		</div>
	);
};

export default AsideConfigEditor;
