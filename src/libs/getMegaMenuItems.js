const getMegaMenuItems = (group) => {
	const items = group?.items ?? [];
	if (items.length <= 1) {
		return items;
	}
	return items.filter((item) => item?.name !== group?.name);
};

export default getMegaMenuItems;
