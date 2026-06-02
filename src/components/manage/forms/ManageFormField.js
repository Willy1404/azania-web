const ManageFormField = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	placeholder,
	help,
	readOnly = false,
	required = false,
}) => {
	return (
		<label className="manage-field">
			<span className="manage-field__label">
				{label}
				{required ? <span className="manage-field__required">*</span> : null}
			</span>
			{type === "textarea" ? (
				<textarea
					className="manage-field__input manage-field__textarea"
					name={name}
					value={value || ""}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					readOnly={readOnly}
					rows={5}
				/>
			) : (
				<input
					className="manage-field__input"
					type={type}
					name={name}
					value={value || ""}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					readOnly={readOnly}
				/>
			)}
			{help ? <span className="manage-field__help">{help}</span> : null}
		</label>
	);
};

export default ManageFormField;
