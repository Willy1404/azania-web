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
											<Link href={navItem?.path ? navItem?.path : "#"}>
												{navItem?.name}
											</Link>
										</li>
									);
								}

								return (
									<MobileMenuItem
										key={navItem?.id}
										text={navItem?.name}
										url={navItem?.path ? navItem?.path : "#"}
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
