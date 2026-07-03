"use client";

import AsideConfigEditor from "@/components/manage/editors/AsideConfigEditor";
import SolutionsEditor from "@/components/manage/editors/SolutionsEditor";
import WhatsappConfigEditor from "@/components/manage/editors/WhatsappConfigEditor";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageFormSection from "@/components/manage/forms/ManageFormSection";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
import { CMS_IMAGE_SIZES } from "@/lib/cms/imageSizes";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";
import ManageStringList from "@/components/manage/forms/ManageStringList";

const benefitFields = [
	{ key: "number", label: "Number", defaultValue: "01." },
	{ key: "title", label: "Title" },
	{ key: "desc", label: "Description", type: "textarea", rows: 2 },
];

const faqFields = [
	{ key: "question", label: "Question" },
	{ key: "answer", label: "Answer", type: "textarea", rows: 3 },
];

const BankingPageForm = ({ page, onChange, onSaveSection }) => {
	const update = (key, value) => onChange({ ...page, [key]: value });
	const layout = page.layout || "product";
	const isWhatsappLayout = layout === "whatsapp";
	const save = (sectionName) =>
		onSaveSection ? () => onSaveSection(sectionName) : undefined;

	return (
		<div className="manage-form__sections">
			<ManageFormSection title="Page details" onSave={save("Page details")}>
				<div className="manage-form__grid">
					<ManageFormField
						label="Page title"
						value={page.title}
						onChange={(v) => update("title", v)}
						required
					/>
					<ManageFormField
						label="URL slug"
						value={page.slug}
						onChange={(v) => update("slug", v)}
						help="Used in the page URL. Change carefully."
					/>
					<ManageFormField
						label="Category"
						value={page.category}
						onChange={(v) => update("category", v)}
					/>
					<ManageFormField
						label="Icon class"
						value={page.icon}
						onChange={(v) => update("icon", v)}
						help="Theme icon class, e.g. tji-worldwide"
					/>
				</div>
				<label className="manage-field">
					<span className="manage-field__label">Page layout</span>
					<select
						className="manage-field__input"
						value={layout}
						onChange={(e) => update("layout", e.target.value)}
					>
						<option value="product">Product layout (tabbed containers)</option>
						<option value="whatsapp">WhatsApp layout</option>
					</select>
				</label>
				<ManageFormField
					label="Headline"
					value={page.titleLarge}
					onChange={(v) => update("titleLarge", v)}
				/>
				<ManageFormField
					label="Short description"
					type="textarea"
					value={page.shortDesc}
					onChange={(v) => update("shortDesc", v)}
				/>
			</ManageFormSection>

			<ManageFormSection title="Images" onSave={save("Images")}>
				<ManageMediaField
					label="Top banner image"
					value={page.bannerImage || ""}
					onChange={(v) => update("bannerImage", v)}
					recommendedSize={CMS_IMAGE_SIZES.pageBanner}
					help="Wide banner at the top of the page."
				/>
				<ManageMediaField
					label="Main hero image"
					value={page.heroImage || ""}
					onChange={(v) => update("heroImage", v)}
					recommendedSize={CMS_IMAGE_SIZES.pageHero}
					help="Shown below the banner and in the sidebar photo card."
				/>
			</ManageFormSection>

			<ManageFormSection title="Main content" onSave={save("Main content")}>
				<ManageFormField
					label="Introduction paragraph"
					type="textarea"
					value={page.desc1}
					onChange={(v) => update("desc1", v)}
				/>
				<ManageFormField
					label="Second paragraph"
					type="textarea"
					value={page.desc2}
					onChange={(v) => update("desc2", v)}
				/>
			</ManageFormSection>

			{!isWhatsappLayout ? (
				<ManageFormSection
					title="Solution containers"
					onSave={save("Solution containers")}
				>
					<SolutionsEditor
						solutions={page.solutions || []}
						onChange={(v) => update("solutions", v)}
					/>
				</ManageFormSection>
			) : (
				<ManageFormSection
					title="WhatsApp page layout"
					onSave={save("WhatsApp page layout")}
				>
					<WhatsappConfigEditor
						config={page.whatsappConfig || {}}
						onChange={(v) => update("whatsappConfig", v)}
					/>
				</ManageFormSection>
			)}

			<ManageFormSection
				title="Key features"
				onSave={save("Key features")}
			>
				<ManageStringList
					label="Key features (sidebar highlights)"
					items={page.features || []}
					onChange={(v) => update("features", v)}
					placeholder="e.g. Mobile banking"
				/>
			</ManageFormSection>

			<ManageFormSection title="Benefits" onSave={save("Benefits")}>
				<ManageObjectList
					label="Benefits"
					items={page.benefits || []}
					fields={benefitFields}
					onChange={(v) => update("benefits", v)}
					addLabel="+ Add benefit"
				/>
			</ManageFormSection>

			<ManageFormSection
				title="Frequently asked questions"
				onSave={save("Frequently asked questions")}
			>
				<ManageObjectList
					label="Frequently asked questions"
					items={page.faqs || []}
					fields={faqFields}
					onChange={(v) => update("faqs", v)}
					addLabel="+ Add question"
				/>
			</ManageFormSection>

			{!isWhatsappLayout ? (
				<ManageFormSection title="Sidebar cards" onSave={save("Sidebar cards")}>
					<AsideConfigEditor
						config={page.asideConfig || {}}
						onChange={(v) => update("asideConfig", v)}
					/>
				</ManageFormSection>
			) : null}
		</div>
	);
};

export default BankingPageForm;
