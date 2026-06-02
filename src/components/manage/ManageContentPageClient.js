"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ManageShell from "@/components/manage/ManageShell";
import ManageContentEditor from "@/components/manage/ManageContentEditor";
import BankingPageForm from "@/components/manage/editors/BankingPageForm";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";

const COLLECTION_KEYS = [
	"business_banking_pages",
	"personal_banking_pages",
	"treasury_capital_pages",
];

function ManageCollectionContentPage({
	shellProps,
	portalId,
	contentKey,
	label,
	initialItems,
}) {
	const router = useRouter();
	const [items, setItems] = useState(initialItems);
	const [selectedSlug, setSelectedSlug] = useState(initialItems[0]?.slug || "");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const selectedIndex = items.findIndex((item) => item.slug === selectedSlug);
	const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

	const updateSelectedItem = (updated) => {
		setItems((current) =>
			current.map((item, index) => (index === selectedIndex ? updated : item))
		);
		if (updated.slug !== selectedSlug) {
			setSelectedSlug(updated.slug);
		}
	};

	const handleSaveAll = async () => {
		setMessage("");
		setError("");
		setLoading(true);

		try {
			const response = await fetch(
				`/api/manage/${portalId}/content/${contentKey}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ items }),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Save failed.");
				return;
			}

			setMessage("All pages saved successfully.");
			router.refresh();
		} catch {
			setError("Unable to save pages.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ManageShell
			{...shellProps}
			sidebarPages={{
				title: "Pages",
				items: items.map((item) => ({
					key: item.slug,
					label: item.title || item.slug,
				})),
				selectedKey: selectedSlug,
				onSelect: setSelectedSlug,
			}}
		>
			<div className="manage-collection">
				<ManageEditorShell
					title={label}
					onSave={handleSaveAll}
					loading={loading}
					message={message}
					error={error}
					saveLabel="Save all pages"
				>
					<div className="manage-collection__editor">
						{selectedItem ? (
							<BankingPageForm page={selectedItem} onChange={updateSelectedItem} />
						) : (
							<p>No pages found.</p>
						)}
					</div>
				</ManageEditorShell>

				<Link className="manage-back-link" href={`/manage/${portalId}/dashboard`}>
					Back to dashboard
				</Link>
			</div>
		</ManageShell>
	);
}

function ManageNavContentPage({ shellProps, portalId, contentKey, label, initialData }) {
	const router = useRouter();
	const [items, setItems] = useState(Array.isArray(initialData) ? initialData : []);
	const [activeIndex, setActiveIndex] = useState(0);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateTopItem = (index, key, value) => {
		setItems((current) =>
			current.map((item, i) => (i === index ? { ...item, [key]: value } : item))
		);
	};

	const updateSubmenuGroup = (navIndex, groupIndex, key, value) => {
		setItems((current) =>
			current.map((item, i) => {
				if (i !== navIndex) return item;
				const submenu = [...(item.submenu || [])];
				submenu[groupIndex] = { ...submenu[groupIndex], [key]: value };
				return { ...item, submenu };
			})
		);
	};

	const updateSubmenuItem = (navIndex, groupIndex, itemIndex, key, value) => {
		setItems((current) =>
			current.map((item, i) => {
				if (i !== navIndex) return item;
				const submenu = [...(item.submenu || [])];
				const group = { ...submenu[groupIndex] };
				const groupItems = [...(group.items || [])];
				groupItems[itemIndex] = { ...groupItems[itemIndex], [key]: value };
				group.items = groupItems;
				submenu[groupIndex] = group;
				return { ...item, submenu };
			})
		);
	};

	const handleSave = async () => {
		setMessage("");
		setError("");
		setLoading(true);

		try {
			const response = await fetch(
				`/api/manage/${portalId}/content/${contentKey}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: items }),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Save failed.");
				return;
			}

			setMessage("Navigation saved successfully.");
			router.refresh();
		} catch {
			setError("Unable to save content.");
		} finally {
			setLoading(false);
		}
	};

	const activeItem = items[activeIndex];

	return (
		<ManageShell
			{...shellProps}
			sidebarPages={{
				title: "Menu items",
				items: items.map((item, index) => ({
					key: index,
					label: item.name,
				})),
				selectedKey: activeIndex,
				onSelect: setActiveIndex,
			}}
		>
			<ManageEditorShell
				title={label}
				onSave={handleSave}
				loading={loading}
				message={message}
				error={error}
			>
				<p className="manage-editor__hint">
					Edit menu labels and links for the selected item in the sidebar.
				</p>

				{activeItem ? (
					<div className="manage-nav-editor__content">
						<section className="manage-form__section">
							<h2>Main link</h2>
							<div className="manage-form__grid">
								<ManageFormField
									label="Menu label"
									value={activeItem.name}
									onChange={(v) => updateTopItem(activeIndex, "name", v)}
								/>
								<ManageFormField
									label="Link URL"
									value={activeItem.path}
									onChange={(v) => updateTopItem(activeIndex, "path", v)}
								/>
							</div>
						</section>

						{activeItem.submenu?.length ? (
							<section className="manage-form__section">
								<h2>Dropdown groups</h2>
								{activeItem.submenu.map((group, groupIndex) => (
									<div key={group.id || groupIndex} className="manage-object-list__card">
										<div className="manage-object-list__card-header">
											<strong>{group.name || `Group ${groupIndex + 1}`}</strong>
										</div>
										<div className="manage-object-list__fields">
											<ManageFormField
												label="Group title"
												value={group.name}
												onChange={(v) =>
													updateSubmenuGroup(activeIndex, groupIndex, "name", v)
												}
											/>
											{(group.items || []).map((subItem, itemIndex) => (
												<div
													key={subItem.id || itemIndex}
													className="manage-nav-editor__subitem"
												>
													<div className="manage-form__grid">
														<ManageFormField
															label="Link label"
															value={subItem.name}
															onChange={(v) =>
																updateSubmenuItem(
																	activeIndex,
																	groupIndex,
																	itemIndex,
																	"name",
																	v
																)
															}
														/>
														<ManageFormField
															label="Link URL"
															value={subItem.path}
															onChange={(v) =>
																updateSubmenuItem(
																	activeIndex,
																	groupIndex,
																	itemIndex,
																	"path",
																	v
																)
															}
														/>
														<ManageFormField
															label="Icon class"
															value={subItem.icon || ""}
															onChange={(v) =>
																updateSubmenuItem(
																	activeIndex,
																	groupIndex,
																	itemIndex,
																	"icon",
																	v
																)
															}
														/>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</section>
						) : null}
					</div>
				) : null}
			</ManageEditorShell>

			<Link className="manage-back-link" href={`/manage/${portalId}/dashboard`}>
				Back to dashboard
			</Link>
		</ManageShell>
	);
}

const ManageContentPageClient = ({
	shellProps,
	portalId,
	contentKey,
	module,
	initialData,
}) => {
	if (COLLECTION_KEYS.includes(contentKey)) {
		return (
			<ManageCollectionContentPage
				shellProps={shellProps}
				portalId={portalId}
				contentKey={contentKey}
				label={module.label}
				initialItems={initialData}
			/>
		);
	}

	if (contentKey === "nav_items") {
		return (
			<ManageNavContentPage
				shellProps={shellProps}
				portalId={portalId}
				contentKey={contentKey}
				label={module.label}
				initialData={initialData}
			/>
		);
	}

	return (
		<ManageShell {...shellProps}>
			<ManageContentEditor
				portalId={portalId}
				contentKey={contentKey}
				label={module.label}
				initialData={initialData}
				isCollection={module.collection}
			/>
			<Link className="manage-back-link" href={`/manage/${portalId}/dashboard`}>
				Back to dashboard
			</Link>
		</ManageShell>
	);
};

export default ManageContentPageClient;
