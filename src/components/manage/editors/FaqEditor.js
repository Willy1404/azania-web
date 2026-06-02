"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";

const faqFields = [
	{ key: "question", label: "Question" },
	{ key: "answer", label: "Answer", type: "textarea", rows: 4 },
];

const FaqEditor = ({ portalId, contentKey, label, initialData }) => {
	const router = useRouter();
	const [items, setItems] = useState(Array.isArray(initialData) ? initialData : []);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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

			setMessage("FAQ saved successfully.");
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
				Edit questions and answers shown on the FAQ page.
			</p>
			<ManageObjectList
				label="Questions"
				items={items}
				fields={faqFields}
				onChange={setItems}
				addLabel="+ Add question"
			/>
		</ManageEditorShell>
	);
};

export default FaqEditor;
