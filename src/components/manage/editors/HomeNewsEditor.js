"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";

const newsFields = [
	{ key: "title", label: "Headline" },
	{ key: "excerpt", label: "Summary", type: "textarea", rows: 3 },
	{ key: "url", label: "Link URL", defaultValue: "/" },
];

const HomeNewsEditor = ({ portalId, contentKey, label, initialData }) => {
	const router = useRouter();
	const [items, setItems] = useState(Array.isArray(initialData) ? initialData : []);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateItem = (index, key, value) => {
		setItems((current) =>
			current.map((item, i) => (i === index ? { ...item, [key]: value } : item))
		);
	};

	const addItem = () => {
		setItems((current) => [
			...current,
			{
				id: Date.now(),
				title: "",
				excerpt: "",
				img: "",
				url: "/",
			},
		]);
	};

	const removeItem = (index) => {
		setItems((current) => current.filter((_, i) => i !== index));
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

			setMessage("News items saved successfully.");
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
				Manage the news cards shown on the homepage. Upload a photo or paste an image URL for each item.
			</p>

			<div className="manage-list__header">
				<span className="manage-field__label">News items</span>
				<button type="button" className="manage-list__add" onClick={addItem}>
					+ Add news item
				</button>
			</div>

			{items.map((item, index) => (
				<div key={item.id || index} className="manage-object-list__card">
					<div className="manage-object-list__card-header">
						<strong>{item.title || `News item ${index + 1}`}</strong>
						<button
							type="button"
							className="manage-list__remove"
							onClick={() => removeItem(index)}
						>
							Remove
						</button>
					</div>
					<div className="manage-object-list__fields">
						{newsFields.map((field) => (
							<ManageFormField
								key={field.key}
								label={field.label}
								type={field.type}
								value={item[field.key]}
								onChange={(v) => updateItem(index, field.key, v)}
							/>
						))}
						<ManageMediaField
							label="Thumbnail image"
							value={item.img || ""}
							onChange={(v) => updateItem(index, "img", v)}
							accept="image/*"
						/>
					</div>
				</div>
			))}
		</ManageEditorShell>
	);
};

export default HomeNewsEditor;
