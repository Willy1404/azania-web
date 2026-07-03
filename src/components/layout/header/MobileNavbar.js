import NavMenuLink from "@/components/shared/NavMenuLink";
import getMegaMenuItems from "@/libs/getMegaMenuItems";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";

const MobileNavbar = ({ navItems = [] }) => {
	return (
		<div className="hamburger_menu">
			<div className="mobile_menu mean-container">
				<div className="mean-bar">
					<Link
						href="#nav"
						className="meanmenu-reveal"
						style={{ right: 0, left: "auto" }}
					>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</Link>
					<nav className="mean-nav">
						<ul>
							{navItems?.map((navItem) => {
								const hasSubmenu = Boolean(navItem?.submenu?.length);
								if (!hasSubmenu) {
									return (
										<li key={navItem?.id}>
											<NavMenuLink href={navItem?.path ? navItem?.path : "#"}>
												{navItem?.name}
											</NavMenuLink>
										</li>
									);
								}

								if (
									navItem?.menuType === "personal-flyout" ||
									navItem?.path === "/personal-banking"
								) {
									return (
										<MobileMenuItem key={navItem?.id} text={navItem?.name}>
											{navItem.submenu.map((group) => (
												<MobileMenuItem key={group.id} text={group.name}>
													{group.items?.map((item) => (
														<li key={item.id}>
															<NavMenuLink href={item.path || "#"}>
																{item.icon ? (
																	<span className="azania-mega-menu-icon">
																		<i className={item.icon} aria-hidden="true" />
																	</span>
																) : null}
																{item.name}
															</NavMenuLink>
														</li>
													))}
												</MobileMenuItem>
											))}
										</MobileMenuItem>
									);
								}

								return (
									<MobileMenuItem
										key={navItem?.id}
										text={navItem?.name}
										submenuClass={
											"header__mega-menu mega-menu mega-menu-pages azania-mega-menu"
										}
									>
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
									</MobileMenuItem>
								);
							})}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileNavbar;
