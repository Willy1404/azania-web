"use client";

import { useState } from "react";

const ManageFormSection = ({
	title,
	onSave,
	saveLabel = "Save",
	children,
}) => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSave = async () => {
		if (!onSave) return;

		setMessage("");
		setError("");
		setLoading(true);

		try {
			const result = await onSave();
			if (result?.error) {
				setError(result.error);
				return;
			}
			setMessage(result?.message || "Saved successfully.");
		} catch {
			setError("Unable to save changes.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="manage-form__section">
			<div className="manage-form__section-header">
				<h2>{title}</h2>
				{onSave ? (
					<button
						type="button"
						className="manage-form__section-save"
						onClick={handleSave}
						disabled={loading}
					>
						{loading ? "Saving..." : saveLabel}
					</button>
				) : null}
			</div>

			{message ? (
				<div
					className="manage-form__section-message manage-form__section-message--success"
					role="status"
				>
					{message}
				</div>
			) : null}
			{error ? (
				<div
					className="manage-form__section-message manage-form__section-message--error"
					role="alert"
				>
					{error}
				</div>
			) : null}

			{children}
		</section>
	);
};

export default ManageFormSection;
