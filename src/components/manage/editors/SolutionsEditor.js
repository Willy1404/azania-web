"use client";

import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
import { CMS_IMAGE_SIZES } from "@/lib/cms/imageSizes";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const tabItemFields = [
	{ key: "title", label: "Title" },
	{ key: "desc", label: "Description", type: "textarea", rows: 2 },
];

const emptySolution = (index = 0) => ({
	id: `solution-${index + 1}`,
	title: "",
	description: "",
	image: "",
	tabs: {
		features: [],
		benefits: [],
		requirements: [],
	},
});

const SolutionsEditor = ({ solutions = [], onChange }) => {
	const updateSolution = (index, key, value) => {
		onChange(
			solutions.map((item, i) => (i === index ? { ...item, [key]: value } : item))
		);
	};

	const updateTabItems = (index, tabKey, items) => {
		onChange(
			solutions.map((item, i) =>
				i === index
					? {
							...item,
							tabs: { ...(item.tabs || {}), [tabKey]: items },
						}
					: item
			)
		);
	};

	const addSolution = () => onChange([...solutions, emptySolution(solutions.length)]);

	const removeSolution = (index) =>
		onChange(solutions.filter((_, i) => i !== index));

	return (
		<div className="manage-solutions-editor">
			<div className="manage-list__header">
				<span className="manage-field__label">Solution containers</span>
				<button type="button" className="manage-list__add" onClick={addSolution}>
					+ Add container
				</button>
			</div>
			<p className="manage-editor__hint">
				Each container appears as a tabbed card on the page. Add, remove, or reorder
				by editing below.
			</p>

			{solutions.map((solution, index) => (
				<div key={solution.id || index} className="manage-solution-card">
					<div className="manage-object-list__card-header">
						<strong>{solution.title || `Container ${index + 1}`}</strong>
						<button
							type="button"
							className="manage-list__remove"
							onClick={() => removeSolution(index)}
						>
							Delete container
						</button>
					</div>

					<div className="manage-object-list__fields">
						<div className="manage-form__grid">
							<ManageFormField
								label="Container ID"
								value={solution.id || ""}
								onChange={(v) => updateSolution(index, "id", v)}
								help="Short unique id, e.g. pos or qr-lipa"
							/>
							<ManageFormField
								label="Title"
								value={solution.title || ""}
								onChange={(v) => updateSolution(index, "title", v)}
							/>
						</div>
						<ManageFormField
							label="Description"
							type="textarea"
							value={solution.description || ""}
							onChange={(v) => updateSolution(index, "description", v)}
						/>
						<ManageMediaField
							label="Container image"
							value={solution.image || ""}
							onChange={(v) => updateSolution(index, "image", v)}
							recommendedSize={CMS_IMAGE_SIZES.solutionContainer}
						/>
					</div>

					<ManageObjectList
						label="Features tab items"
						items={solution.tabs?.features || []}
						fields={tabItemFields}
						onChange={(v) => updateTabItems(index, "features", v)}
						addLabel="+ Add feature"
					/>
					<ManageObjectList
						label="Benefits tab items"
						items={solution.tabs?.benefits || []}
						fields={tabItemFields}
						onChange={(v) => updateTabItems(index, "benefits", v)}
						addLabel="+ Add benefit"
					/>
					<ManageObjectList
						label="Requirements tab items"
						items={solution.tabs?.requirements || []}
						fields={tabItemFields}
						onChange={(v) => updateTabItems(index, "requirements", v)}
						addLabel="+ Add requirement"
					/>
				</div>
			))}
		</div>
	);
};

export default SolutionsEditor;
