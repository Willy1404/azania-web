"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const rateFields = [
	{ key: "pair", label: "Currency pair", defaultValue: "USD/TZS" },
	{ key: "buying", label: "Buying rate" },
	{ key: "selling", label: "Selling rate" },
	{ key: "flag", label: "Flag code", defaultValue: "us", help: "Two-letter country code" },
];

const ForexRatesEditor = ({ portalId, contentKey, label, initialData }) => {
	const router = useRouter();
	const [data, setData] = useState(initialData || {});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const update = (key, value) => setData((current) => ({ ...current, [key]: value }));

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
					body: JSON.stringify({ data }),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Save failed.");
				return;
			}

			setMessage("Forex rates saved successfully.");
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
			<section className="manage-form__section">
				<h2>Card header</h2>
				<div className="manage-form__grid">
					<ManageFormField
						label="Last updated text"
						value={data.updatedAt}
						onChange={(v) => update("updatedAt", v)}
					/>
					<ManageFormField
						label="Title"
						value={data.title}
						onChange={(v) => update("title", v)}
					/>
				</div>
				<ManageFormField
					label="Subtitle"
					value={data.subtitle}
					onChange={(v) => update("subtitle", v)}
				/>
				<div className="manage-form__grid">
					<ManageFormField
						label="Button text"
						value={data.branchCta?.text}
						onChange={(v) =>
							update("branchCta", { ...data.branchCta, text: v })
						}
					/>
					<ManageFormField
						label="Button link"
						value={data.branchCta?.url}
						onChange={(v) =>
							update("branchCta", { ...data.branchCta, url: v })
						}
					/>
				</div>
			</section>

			<section className="manage-form__section">
				<ManageObjectList
					label="Exchange rates"
					items={data.rates || []}
					fields={rateFields}
					onChange={(v) => update("rates", v)}
					addLabel="+ Add rate"
				/>
			</section>
		</ManageEditorShell>
	);
};

export default ForexRatesEditor;
