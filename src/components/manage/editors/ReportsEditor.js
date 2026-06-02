"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const reportFields = [
	{ key: "year", label: "Year", defaultValue: "2025" },
	{ key: "type", label: "Report type", defaultValue: "Annual" },
	{ key: "title", label: "Title" },
	{ key: "desc", label: "Description", type: "textarea", rows: 3 },
];

const ReportsEditor = ({ portalId, contentKey, label, initialData }) => {
	const router = useRouter();
	const [items, setItems] = useState(Array.isArray(initialData) ? initialData : []);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateFileUrl = (index, fileUrl) => {
		setItems((current) =>
			current.map((item, i) => (i === index ? { ...item, fileUrl } : item))
		);
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
					body: JSON.stringify({ data: items }),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Save failed.");
				return;
			}

			setMessage("Reports saved successfully.");
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
				Manage financial and regulatory reports. Upload a PDF for each report or paste a file link.
			</p>

			<div className="manage-list__header">
				<span className="manage-field__label">Reports</span>
				<button
					type="button"
					className="manage-list__add"
					onClick={() =>
						setItems((current) => [
							...current,
							{ year: "2025", type: "Annual", title: "", desc: "", fileUrl: "" },
						])
					}
				>
					+ Add report
				</button>
			</div>

			{items.map((item, index) => (
				<div key={`${item.title}-${index}`} className="manage-object-list__card">
					<div className="manage-object-list__card-header">
						<strong>{item.title || `Report ${index + 1}`}</strong>
						<button
							type="button"
							className="manage-list__remove"
							onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
						>
							Remove
						</button>
					</div>
					<div className="manage-object-list__fields">
						<div className="manage-form__grid">
							{reportFields.slice(0, 2).map((field) => (
								<ManageFormField
									key={field.key}
									label={field.label}
									value={item[field.key]}
									onChange={(v) =>
										setItems((current) =>
											current.map((row, i) =>
												i === index ? { ...row, [field.key]: v } : row
											)
										)
									}
								/>
							))}
						</div>
						{reportFields.slice(2).map((field) => (
							<ManageFormField
								key={field.key}
								label={field.label}
								type={field.type}
								value={item[field.key]}
								onChange={(v) =>
									setItems((current) =>
										current.map((row, i) =>
											i === index ? { ...row, [field.key]: v } : row
										)
									)
								}
							/>
						))}
						<ManageMediaField
							label="Report file (PDF)"
							value={item.fileUrl || ""}
							onChange={(v) => updateFileUrl(index, v)}
							accept="application/pdf,image/*"
							help="Upload a PDF or link to an external document."
						/>
					</div>
				</div>
			))}
		</ManageEditorShell>
	);
};

export default ReportsEditor;
