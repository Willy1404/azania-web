"use client";

import NavMenuLink from "@/components/shared/NavMenuLink";

const PersonalBankingFlyoutMenu = ({ groups = [] }) => {
	return (
		<ul className="sub-menu azania-personal-flyout">
			{groups.map((group) => (
				<li key={group.id} className="has-dropdown azania-personal-flyout__group">
					<span className="azania-personal-flyout__category">
						{group.name}
						<i className="tji-arrow-right" aria-hidden="true" />
					</span>
					<ul className="sub-menu azania-personal-flyout__sub">
						{group.items?.map((item) => (
							<li key={item.id}>
								<NavMenuLink href={item.path || "#"}>
									{item.icon ? (
										<span className="azania-personal-flyout__icon">
											<i className={item.icon} aria-hidden="true" />
										</span>
									) : null}
									<span className="azania-personal-flyout__label">{item.name}</span>
								</NavMenuLink>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};

export default PersonalBankingFlyoutMenu;
