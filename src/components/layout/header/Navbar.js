import useActiveLink from "@/hooks/useActiveLink";
import Link from "next/link";

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
									<Link href={navItem?.path ? navItem?.path : "#"}>
										{navItem?.name}
									</Link>
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
								<Link href={navItem?.path ? navItem?.path : "#"}>
									{navItem?.name}
								</Link>
								<ul className="sub-menu header__mega-menu mega-menu mega-menu-pages azania-mega-menu">
									<li>
										<div className="mega-menu-wrapper">
											{navItem?.submenu?.map((group) => (
												<div key={group?.id} className="mega-menu-pages-single">
													<div className="mega-menu-pages-single-inner">
														<h6 className="mega-menu-title">{group?.name}</h6>
														<div className="mega-menu-list">
															{group?.items?.map((item) => (
																<Link key={item?.id} href={item?.path || "#"}>
																	{item?.icon ? (
																		<span className="azania-mega-menu-icon">
																			<i className={item.icon}></i>
																		</span>
																	) : (
																		""
																	)}
																	{item?.name}
																</Link>
															))}
														</div>
													</div>
												</div>
											))}
										</div>
									</li>
								</ul>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
