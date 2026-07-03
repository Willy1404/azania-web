"use client";

import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
import { CMS_IMAGE_SIZES } from "@/lib/cms/imageSizes";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";
import ManageStringList from "@/components/manage/forms/ManageStringList";

const guideStepFields = [
	{ key: "step", label: "Step number", defaultValue: "01" },
	{ key: "title", label: "Title" },
	{ key: "desc", label: "Description", type: "textarea", rows: 2 },
];

const WhatsappConfigEditor = ({ config = {}, onChange }) => {
	const update = (key, value) => onChange({ ...config, [key]: value });

	return (
		<div className="manage-whatsapp-editor">
			<p className="manage-editor__hint">
				Controls the WhatsApp Banking custom layout: hero, guide, images, and
				feature grid.
			</p>

			<div className="manage-form__grid">
				<ManageFormField
					label="Eyebrow label"
					value={config.eyebrow || ""}
					onChange={(v) => update("eyebrow", v)}
				/>
				<ManageFormField
					label="Hero headline"
					value={config.heroTitle || ""}
					onChange={(v) => update("heroTitle", v)}
				/>
			</div>
			<ManageFormField
				label="Guide card title"
				value={config.heroGuideLabel || ""}
				onChange={(v) => update("heroGuideLabel", v)}
			/>
			<div className="manage-form__grid">
				<ManageFormField
					label="CTA button text"
					value={config.ctaText || ""}
					onChange={(v) => update("ctaText", v)}
				/>
				<ManageFormField
					label="CTA link (WhatsApp URL)"
					value={config.ctaUrl || ""}
					onChange={(v) => update("ctaUrl", v)}
				/>
				<ManageFormField
					label="WhatsApp number"
					value={config.whatsappNumber || ""}
					onChange={(v) => update("whatsappNumber", v)}
				/>
			</div>

			<div className="manage-form__grid">
				<ManageMediaField
					label="Lifestyle image"
					value={config.lifestyleImage || ""}
					onChange={(v) => update("lifestyleImage", v)}
					recommendedSize={CMS_IMAGE_SIZES.whatsappLifestyle}
				/>
				<ManageMediaField
					label="QR code image"
					value={config.qrImage || ""}
					onChange={(v) => update("qrImage", v)}
					recommendedSize={CMS_IMAGE_SIZES.whatsappQr}
				/>
			</div>

			<div className="manage-form__grid">
				<ManageFormField
					label="Features section title"
					value={config.featuresTitle || ""}
					onChange={(v) => update("featuresTitle", v)}
				/>
				<ManageFormField
					label="Features section subtitle"
					value={config.featuresSubtitle || ""}
					onChange={(v) => update("featuresSubtitle", v)}
				/>
				<ManageFormField
					label="QR box label"
					value={config.qrLabel || ""}
					onChange={(v) => update("qrLabel", v)}
				/>
			</div>

			<ManageObjectList
				label="Guide steps"
				items={config.guideSteps || []}
				fields={guideStepFields}
				onChange={(v) => update("guideSteps", v)}
				addLabel="+ Add step"
			/>
			<ManageStringList
				label="Quick menu options"
				items={config.menuOptions || []}
				onChange={(v) => update("menuOptions", v)}
				placeholder="e.g. Balance enquiry"
			/>
			<ManageStringList
				label="Feature grid items"
				items={config.featureList || []}
				onChange={(v) => update("featureList", v)}
				placeholder="e.g. Bank securely on WhatsApp"
			/>
		</div>
	);
};

export default WhatsappConfigEditor;
