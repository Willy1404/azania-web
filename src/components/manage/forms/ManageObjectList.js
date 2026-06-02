const ManageObjectList = ({ label, items = [], fields, onChange, addLabel = "+ Add item" }) => {
	const createEmpty = () =>
		fields.reduce((acc, field) => {
			acc[field.key] = field.defaultValue ?? "";
			return acc;
		}, {});

	const updateItem = (index, key, value) => {
		onChange(
			items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
		);
	};

	const addItem = () => onChange([...items, createEmpty()]);
	const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

	return (
		<div className="manage-object-list">
			<div className="manage-list__header">
				<span className="manage-field__label">{label}</span>
				<button type="button" className="manage-list__add" onClick={addItem}>
					{addLabel}
				</button>
			</div>

			{items.map((item, index) => (
				<div key={index} className="manage-object-list__card">
					<div className="manage-object-list__card-header">
						<strong>Item {index + 1}</strong>
						<button
							type="button"
							className="manage-list__remove"
							onClick={() => removeItem(index)}
						>
							Remove
						</button>
					</div>
					<div className="manage-object-list__fields">
						{fields.map((field) => (
							<label key={field.key} className="manage-field">
								<span className="manage-field__label">{field.label}</span>
								{field.type === "textarea" ? (
									<textarea
										className="manage-field__input manage-field__textarea"
										value={item[field.key] || ""}
										onChange={(e) => updateItem(index, field.key, e.target.value)}
										rows={field.rows || 3}
									/>
								) : (
									<input
										className="manage-field__input"
										type="text"
										value={item[field.key] || ""}
										onChange={(e) => updateItem(index, field.key, e.target.value)}
									/>
								)}
							</label>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default ManageObjectList;
