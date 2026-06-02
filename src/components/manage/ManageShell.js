"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ManageShell = ({
	portalId,
	portalLabel,
	portalIcon = "tji-manage",
	userName,
	userRole,
	pageTitle = "Dashboard",
	pageSubtitle,
	sidebarPages,
	children,
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogout = async () => {
		await fetch("/api/manage/auth/logout", { method: "POST" });
		router.push(`/manage/${portalId}/login`);
		router.refresh();
	};

	const roleLabel = userRole.replaceAll("_", " ");
	const firstName = userName.split(" ")[0];
	const initials = userName
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	const navItems = [
		{
			href: `/manage/${portalId}/dashboard`,
			label: "Dashboard",
			icon: "tji-home",
			match: (path) => path === `/manage/${portalId}/dashboard`,
		},
		{
			href: "/",
			label: "View website",
			icon: "tji-worldwide",
			external: true,
		},
		{
			href: "/manage",
			label: "All portals",
			icon: "tji-strategy",
			match: (path) => path === "/manage",
		},
	];

	return (
		<div className="manage-shell">
			<header className="manage-topbar">
				<div className="manage-topbar__brand">
					<div className="manage-topbar__honeycomb" aria-hidden="true" />
					<Link href="/manage" className="manage-topbar__logo">
						<img src="/images/logos/azanialogo.png" alt="Azania Bank" />
					</Link>
					<div className="manage-topbar__portal">
						<span className="manage-topbar__portal-icon">
							<i className={portalIcon} aria-hidden="true" />
						</span>
						<div>
							<p className="manage-topbar__portal-label">Portal</p>
							<strong>{portalLabel}</strong>
						</div>
					</div>
				</div>

				<div className="manage-topbar__main">
					<div className="manage-topbar__main-bg" aria-hidden="true" />
					<div className="manage-topbar__main-inner">
						<div className="manage-topbar__titles">
							<p className="manage-topbar__eyebrow">
								<i className={portalIcon} aria-hidden="true" />
								{portalLabel}
							</p>
							<h1 className="manage-topbar__title">{pageTitle}</h1>
							{pageSubtitle ? (
								<p className="manage-topbar__subtitle">{pageSubtitle}</p>
							) : null}
						</div>
						<div className="manage-topbar__badge">
							<span className="manage-topbar__avatar" aria-hidden="true">
								{initials}
							</span>
							<div>
								<strong>{firstName}</strong>
								<span>{roleLabel}</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="manage-shell__workspace">
				<aside className="manage-sidebar">
					<div className="manage-sidebar__honeycomb" aria-hidden="true" />

					<nav className="manage-sidebar__nav" aria-label="Management navigation">
						{navItems.map((item) => {
							const isActive = item.match?.(pathname);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={isActive ? "is-active" : ""}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noreferrer" : undefined}
								>
									<i className={item.icon} aria-hidden="true" />
									<span>{item.label}</span>
									<i
										className="tji-arrow-right-long manage-sidebar__nav-arrow"
										aria-hidden="true"
									/>
								</Link>
							);
						})}
					</nav>

					{sidebarPages?.items?.length ? (
						<div className="manage-sidebar__pages">
							<h2>{sidebarPages.title}</h2>
							<ul>
								{sidebarPages.items.map((item) => {
									const isActive =
										String(sidebarPages.selectedKey) === String(item.key);
									return (
										<li key={String(item.key)}>
											<button
												type="button"
												className={isActive ? "is-active" : ""}
												onClick={() => sidebarPages.onSelect(item.key)}
											>
												{item.label}
											</button>
										</li>
									);
								})}
							</ul>
						</div>
					) : null}

					<div className="manage-sidebar__user">
						<button
							type="button"
							className="manage-sidebar__logout"
							onClick={handleLogout}
						>
							Sign out
						</button>
					</div>
				</aside>

				<div className="manage-main">
					<div className="manage-main__body">{children}</div>
					<footer className="manage-main__footer">
						<p>© {new Date().getFullYear()} Azania Bank · Content Management System</p>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default ManageShell;
