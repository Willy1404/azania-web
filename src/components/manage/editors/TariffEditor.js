"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const feeFields = [
	{ key: "service", label: "Service" },
	{ key: "fee", label: "Fee / charge" },
];

const TariffEditor = ({ portalId, contentKey, label, initialData }) => {
	const router = useRouter();
	const [sections, setSections] = useState(
		Array.isArray(initialData) ? initialData : []
	);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateSection = (index, key, value) => {
		setSections((current) =>
			current.map((section, i) =>
				i === index ? { ...section, [key]: value } : section
			)
		);
	};

	const addSection = () => {
		setSections((current) => [...current, { title: "", items: [] }]);
	};

	const removeSection = (index) => {
		setSections((current) => current.filter((_, i) => i !== index));
	};

	const handleSave = async () => {
		setMessage("");
		setError("");
		setLoading(true);

		try {
			const response = await fetch(
				`/api/manage/${portalId}/content/${contentKey}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: sections }),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Save failed.");
				return;
			}

			setMessage("Tariff guide saved successfully.");
			router.refresh();
		} catch {
			setError("Unable to save content.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ManageEditorShell
			title={label}
			onSave={handleSave}
			loading={loading}
			message={message}
			error={error}
		>
			<p className="manage-editor__hint">
				Organize fees into sections. Each section contains a table of services and charges.
			</p>

			<div className="manage-list__header">
				<span className="manage-field__label">Tariff sections</span>
				<button type="button" className="manage-list__add" onClick={addSection}>
					+ Add section
				</button>
			</div>

			{sections.map((section, index) => (
				<div key={index} className="manage-object-list__card">
					<div className="manage-object-list__card-header">
						<strong>{section.title || `Section ${index + 1}`}</strong>
						<button
							type="button"
							className="manage-list__remove"
							onClick={() => removeSection(index)}
						>
							Remove section
						</button>
					</div>
					<div className="manage-object-list__fields">
						<ManageFormField
							label="Section title"
							value={section.title}
							onChange={(v) => updateSection(index, "title", v)}
						/>
						<ManageObjectList
							label="Fees in this section"
							items={section.items || []}
							fields={feeFields}
							onChange={(v) => updateSection(index, "items", v)}
							addLabel="+ Add fee row"
						/>
					</div>
				</div>
			))}
		</ManageEditorShell>
	);
};

export default TariffEditor;
