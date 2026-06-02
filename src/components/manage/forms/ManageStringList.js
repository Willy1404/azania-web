const ManageStringList = ({ label, items = [], onChange, placeholder = "Add item" }) => {
	const updateItem = (index, value) => {
		onChange(items.map((item, i) => (i === index ? value : item)));
	};

	const addItem = () => onChange([...items, ""]);
	const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

	return (
		<div className="manage-list">
			<div className="manage-list__header">
				<span className="manage-field__label">{label}</span>
				<button type="button" className="manage-list__add" onClick={addItem}>
					+ Add
				</button>
			</div>
			{items.map((item, index) => (
				<div key={index} className="manage-list__row">
					<input
						className="manage-field__input"
						value={item}
						onChange={(e) => updateItem(index, e.target.value)}
						placeholder={placeholder}
					/>
					<button
						type="button"
						className="manage-list__remove"
						onClick={() => removeItem(index)}
						aria-label="Remove item"
					>
						×
					</button>
				</div>
			))}
		</div>
	);
};

export default ManageStringList;
