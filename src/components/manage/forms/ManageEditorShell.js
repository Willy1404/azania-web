const ManageEditorShell = ({
	title,
	onSave,
	loading,
	message,
	error,
	children,
	saveLabel = "Save changes",
}) => {
	return (
		<div className="manage-editor">
			<div className="manage-editor__header">
				<div className="manage-editor__header-text">
					<span className="manage-editor__tag">
						<i className="tji-box" aria-hidden="true" />
						Content editor
					</span>
					<h1>{title}</h1>
				</div>
				<button
					type="button"
					className="tj-primary-btn manage-editor__save"
					onClick={onSave}
					disabled={loading}
				>
					<span className="btn-text">
						<span>{loading ? "Saving..." : saveLabel}</span>
					</span>
					<span className="btn-icon">
						<i className="tji-arrow-right-long" aria-hidden="true" />
					</span>
				</button>
			</div>

			{message ? (
				<div className="manage-alert manage-alert--success">{message}</div>
			) : null}
			{error ? (
				<div className="manage-alert manage-alert--error">{error}</div>
			) : null}

			<div className="manage-form">{children}</div>
		</div>
	);
};

export default ManageEditorShell;
