"use client";

import { useState } from "react";

const MobileMenuItem = ({ children, text, submenuClass }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = (event) => {
		event.preventDefault();
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<li className={`has-dropdown ${isOpen ? "dropdown-opened" : ""}`}>
			<a
				href="#"
				role="button"
				aria-expanded={isOpen}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				{text}
			</a>
			<ul
				className={`sub-menu ${submenuClass ? submenuClass : ""}`}
				style={{ display: !isOpen ? "none" : "" }}
			>
				{children}
			</ul>
			<a
				className={`mean-expand ${isOpen ? "mean-clicked" : ""}`}
				href="#"
				role="button"
				aria-label={`Toggle ${text} submenu`}
				style={{ fontSize: "18px" }}
				onClick={handleToggle}
			>
				<i className="tji-arrow-down"></i>
			</a>
		</li>
	);
};

export default MobileMenuItem;
