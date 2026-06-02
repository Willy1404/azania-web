"use client";

import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
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

const BankingPageForm = ({ page, onChange }) => {
	const update = (key, value) => onChange({ ...page, [key]: value });

	return (
		<div className="manage-form__sections">
			<section className="manage-form__section">
				<h2>Page details</h2>
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
			</section>

			<section className="manage-form__section">
				<h2>Hero image / banner</h2>
				<ManageMediaField
					label="Page image"
					value={page.heroImage || ""}
					onChange={(v) => update("heroImage", v)}
					help="Optional image shown on the page. JPG, PNG, WebP, or MP4."
					accept="image/*,video/*"
				/>
			</section>

			<section className="manage-form__section">
				<h2>Main content</h2>
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
			</section>

			<section className="manage-form__section">
				<ManageStringList
					label="Key features"
					items={page.features || []}
					onChange={(v) => update("features", v)}
					placeholder="e.g. Mobile banking"
				/>
			</section>

			<section className="manage-form__section">
				<ManageObjectList
					label="Benefits"
					items={page.benefits || []}
					fields={benefitFields}
					onChange={(v) => update("benefits", v)}
					addLabel="+ Add benefit"
				/>
			</section>

			<section className="manage-form__section">
				<ManageObjectList
					label="Frequently asked questions"
					items={page.faqs || []}
					fields={faqFields}
					onChange={(v) => update("faqs", v)}
					addLabel="+ Add question"
				/>
			</section>
		</div>
	);
};

export default BankingPageForm;
