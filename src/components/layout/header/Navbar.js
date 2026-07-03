import useActiveLink from "@/hooks/useActiveLink";
import getMegaMenuItems from "@/libs/getMegaMenuItems";
import NavMenuLink from "@/components/shared/NavMenuLink";
import NavMenuTrigger from "@/components/shared/NavMenuTrigger";
import PersonalBankingFlyoutMenu from "@/components/layout/header/PersonalBankingFlyoutMenu";

const Navbar = ({ navItems = [] }) => {
	const makeActiveLink = useActiveLink();
	const items = navItems.map(makeActiveLink);
	return (
		<div className="menu-area d-none d-lg-inline-flex align-items-center">
			<nav id="mobile-menu" className="mainmenu">
				<ul>
					{items?.map((navItem) => {
						const hasSubmenu = Boolean(navItem?.submenu?.length);
						if (!hasSubmenu) {
							return (
								<li
									key={navItem?.id}
									className={navItem?.isActive ? "current-menu-item" : ""}
								>
									<NavMenuLink href={navItem?.path ? navItem?.path : "#"}>
										{navItem?.name}
									</NavMenuLink>
								</li>
							);
						}

						return (
							<li
								key={navItem?.id}
								className={`has-dropdown ${
									navItem?.isActive ? "current-menu-ancestor" : ""
								}`}
							>
								<NavMenuTrigger>{navItem?.name}</NavMenuTrigger>
								{navItem?.menuType === "personal-flyout" ||
								navItem?.path === "/personal-banking" ? (
									<PersonalBankingFlyoutMenu groups={navItem.submenu} />
								) : (
									<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages azania-mega-menu">
									<li>
										<div className="mega-menu-wrapper">
											{navItem?.submenu?.map((group) => (
												<div key={group?.id} className="mega-menu-pages-single">
													<div className="mega-menu-pages-single-inner">
														<h6 className="mega-menu-title">{group?.name}</h6>
														<div className="mega-menu-list">
															{getMegaMenuItems(group)?.map((item) => (
																<NavMenuLink key={item?.id} href={item?.path || "#"}>
																	{item?.icon ? (
																		<span className="azania-mega-menu-icon">
																			<i className={item.icon}></i>
																		</span>
																	) : (
																		""
																	)}
																	{item?.name}
																</NavMenuLink>
															))}
														</div>
													</div>
												</div>
											))}
										</div>
									</li>
								</ul>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
