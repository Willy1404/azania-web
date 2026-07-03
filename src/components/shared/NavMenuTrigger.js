const NavMenuTrigger = ({ children, className, onClick }) => {
	const handleClick = (event) => {
		event.preventDefault();
		onClick?.(event);
	};

	return (
		<a
			href="#"
			role="button"
			className={className}
			aria-haspopup="true"
			onClick={handleClick}
		>
			{children}
		</a>
	);
};

export default NavMenuTrigger;
