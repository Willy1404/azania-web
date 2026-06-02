"use client";

import { useRef, useState } from "react";

const ManageMediaField = ({
	label,
	value,
	onChange,
	accept = "image/*,video/*,application/pdf",
	help,
}) => {
	const inputRef = useRef(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");

	const isImage = value?.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i);
	const isVideo = value?.match(/\.(mp4|webm|mov)(\?|$)/i);
	const isPdf = value?.match(/\.pdf(\?|$)/i);

	const handleUpload = async (file) => {
		if (!file) return;
		setUploading(true);
		setError("");

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/manage/upload", {
				method: "POST",
				body: formData,
			});
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Upload failed.");
				return;
			}

			onChange(result.url);
		} catch {
			setError("Unable to upload file.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="manage-field manage-media">
			<span className="manage-field__label">{label}</span>

			{value ? (
				<div className="manage-media__preview">
					{isImage ? (
						<img src={value} alt="" />
					) : isVideo ? (
						<video src={value} controls />
					) : isPdf ? (
						<a href={value} target="_blank" rel="noreferrer">
							View PDF
						</a>
					) : (
						<a href={value} target="_blank" rel="noreferrer">
							View file
						</a>
					)}
					<button
						type="button"
						className="manage-media__remove"
						onClick={() => onChange("")}
					>
						Remove
					</button>
				</div>
			) : null}

			<div className="manage-media__actions">
				<input
					ref={inputRef}
					type="file"
					accept={accept}
					className="manage-media__file-input"
					onChange={(e) => handleUpload(e.target.files?.[0])}
				/>
				<button
					type="button"
					className="manage-media__upload-btn"
					onClick={() => inputRef.current?.click()}
					disabled={uploading}
				>
					{uploading ? "Uploading..." : "Upload file"}
				</button>
				<span className="manage-media__or">or</span>
				<input
					className="manage-field__input"
					type="text"
					value={value || ""}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Paste image or file URL"
				/>
			</div>

			{help ? <span className="manage-field__help">{help}</span> : null}
			{error ? <span className="manage-field__error">{error}</span> : null}
		</div>
	);
};

export default ManageMediaField;
