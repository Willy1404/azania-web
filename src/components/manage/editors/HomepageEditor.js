"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import ManageFormSection from "@/components/manage/forms/ManageFormSection";
import ManageMediaField from "@/components/manage/forms/ManageMediaField";
import ManageObjectList from "@/components/manage/forms/ManageObjectList";
import { CMS_IMAGE_SIZES } from "@/lib/cms/imageSizes";
import { mergeHomepageConfig } from "@/libs/homepageDefaults";

const newsFields = [
	{ key: "title", label: "Headline" },
	{ key: "excerpt", label: "Summary", type: "textarea", rows: 3 },
	{ key: "url", label: "Link URL", defaultValue: "/" },
];

const rateFields = [
	{ key: "pair", label: "Currency pair", defaultValue: "USD/TZS" },
	{ key: "buying", label: "Buying rate" },
	{ key: "selling", label: "Selling rate" },
	{ key: "flag", label: "Flag code", defaultValue: "us", help: "Two-letter country code" },
];

const HomepageEditor = ({
	portalId,
	initialConfig,
	initialNews,
	initialForex,
}) => {
	const router = useRouter();
	const [config, setConfig] = useState(mergeHomepageConfig(initialConfig));
	const [newsItems, setNewsItems] = useState(
		Array.isArray(initialNews) ? initialNews : []
	);
	const [forex, setForex] = useState(initialForex || {});
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const updateHero = (key, value) =>
		setConfig((current) => ({
			...current,
			hero: { ...current.hero, [key]: value },
		}));

	const updateAbout = (key, value) =>
		setConfig((current) => ({
			...current,
			about: { ...current.about, [key]: value },
		}));

	const updateNewsSection = (key, value) =>
		setConfig((current) => ({
			...current,
			newsSection: { ...current.newsSection, [key]: value },
		}));

	const updateNewsItem = (index, key, value) => {
		setNewsItems((current) =>
			current.map((item, i) => (i === index ? { ...item, [key]: value } : item))
		);
	};

	const addNewsItem = () => {
		setNewsItems((current) => [
			...current,
			{ id: Date.now(), title: "", excerpt: "", img: "", url: "/" },
		]);
	};

	const removeNewsItem = (index) => {
		setNewsItems((current) => current.filter((_, i) => i !== index));
	};

	const updateForex = (key, value) =>
		setForex((current) => ({ ...current, [key]: value }));

	const saveConfig = async (sectionName) => {
		const response = await fetch(`/api/manage/${portalId}/content/homepage`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: config }),
		});
		const result = await response.json();
		if (!response.ok) return { error: result.error || "Save failed." };
		router.refresh();
		return { message: `${sectionName} saved successfully.` };
	};

	const saveNews = async () => {
		const response = await fetch(`/api/manage/${portalId}/content/home_news`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: newsItems }),
		});
		const result = await response.json();
		if (!response.ok) return { error: result.error || "Save failed." };
		router.refresh();
		return { message: "News items saved successfully." };
	};

	const saveForex = async () => {
		const response = await fetch(`/api/manage/${portalId}/content/forex_rates`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: forex }),
		});
		const result = await response.json();
		if (!response.ok) return { error: result.error || "Save failed." };
		router.refresh();
		return { message: "Forex rates saved successfully." };
	};

	const handleSaveAll = async () => {
		setMessage("");
		setError("");
		setLoading(true);

		try {
			const results = await Promise.all([
				saveConfig("Homepage"),
				saveNews(),
				saveForex(),
			]);
			const failed = results.find((result) => result?.error);
			if (failed) {
				setError(failed.error);
				return;
			}
			setMessage("Homepage saved successfully.");
		} catch {
			setError("Unable to save homepage.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ManageEditorShell
			title="Homepage"
			onSave={handleSaveAll}
			loading={loading}
			message={message}
			error={error}
			saveLabel="Save homepage"
		>
			<p className="manage-editor__hint">
				Manage the public homepage: hero banner, about section, news cards, and
				forex rates panel.
			</p>

			<div className="manage-form__sections">
				<ManageFormSection title="Hero banner" onSave={() => saveConfig("Hero banner")}>
					<div className="manage-form__grid">
						<ManageFormField
							label="Main headline"
							value={config.hero.titleMain}
							onChange={(v) => updateHero("titleMain", v)}
						/>
						<ManageFormField
							label="Sub headline"
							value={config.hero.titleSub}
							onChange={(v) => updateHero("titleSub", v)}
						/>
					</div>
					<ManageMediaField
						label="Background image"
						value={config.hero.backgroundImage}
						onChange={(v) => updateHero("backgroundImage", v)}
						recommendedSize={CMS_IMAGE_SIZES.pageBanner}
					/>
					<ManageMediaField
						label="Hero banner image"
						value={config.hero.bannerImage}
						onChange={(v) => updateHero("bannerImage", v)}
						recommendedSize={CMS_IMAGE_SIZES.pageHero}
					/>
					<ManageFormField
						label="Tagline"
						type="textarea"
						value={config.hero.tagline}
						onChange={(v) => updateHero("tagline", v)}
					/>
					<div className="manage-form__grid">
						<ManageMediaField
							label="Customer image 1"
							value={config.hero.customerImages?.[0] || ""}
							onChange={(v) => {
								const images = [...(config.hero.customerImages || [])];
								images[0] = v;
								updateHero("customerImages", images);
							}}
							recommendedSize="89 × 89 px (square)"
						/>
						<ManageMediaField
							label="Customer image 2"
							value={config.hero.customerImages?.[1] || ""}
							onChange={(v) => {
								const images = [...(config.hero.customerImages || [])];
								images[1] = v;
								updateHero("customerImages", images);
							}}
							recommendedSize="89 × 89 px (square)"
						/>
						<ManageMediaField
							label="Customer image 3"
							value={config.hero.customerImages?.[2] || ""}
							onChange={(v) => {
								const images = [...(config.hero.customerImages || [])];
								images[2] = v;
								updateHero("customerImages", images);
							}}
							recommendedSize="89 × 89 px (square)"
						/>
					</div>
					<ManageFormField
						label="Services circle link"
						value={config.hero.servicesLink}
						onChange={(v) => updateHero("servicesLink", v)}
					/>
				</ManageFormSection>

				<ManageFormSection title="About section" onSave={() => saveConfig("About section")}>
					<ManageFormField
						label="Section label"
						value={config.about.eyebrow}
						onChange={(v) => updateAbout("eyebrow", v)}
					/>
					<ManageFormField
						label="Heading"
						type="textarea"
						value={config.about.title}
						onChange={(v) => updateAbout("title", v)}
					/>
					<ManageMediaField
						label="Video thumbnail"
						value={config.about.videoThumb}
						onChange={(v) => updateAbout("videoThumb", v)}
						recommendedSize="640 × 360 px"
					/>
					<ManageFormField
						label="Video URL"
						value={config.about.videoUrl}
						onChange={(v) => updateAbout("videoUrl", v)}
					/>
					<div className="manage-form__grid">
						<ManageFormField
							label="Years of experience"
							type="number"
							value={String(config.about.yearsExperience ?? "")}
							onChange={(v) => updateAbout("yearsExperience", Number(v) || 0)}
						/>
						<ManageFormField
							label="Years label"
							value={config.about.yearsLabel}
							onChange={(v) => updateAbout("yearsLabel", v)}
						/>
					</div>
					<ManageFormField
						label="Description"
						type="textarea"
						value={config.about.description}
						onChange={(v) => updateAbout("description", v)}
					/>
					<div className="manage-form__grid">
						<ManageFormField
							label="Button text"
							value={config.about.ctaText}
							onChange={(v) => updateAbout("ctaText", v)}
						/>
						<ManageFormField
							label="Button link"
							value={config.about.ctaUrl}
							onChange={(v) => updateAbout("ctaUrl", v)}
						/>
					</div>
				</ManageFormSection>

				<ManageFormSection
					title="News & Insight section"
					onSave={() => saveConfig("News & Insight section")}
				>
					<div className="manage-form__grid">
						<ManageFormField
							label="Section label"
							value={config.newsSection.label}
							onChange={(v) => updateNewsSection("label", v)}
						/>
						<ManageFormField
							label="Section title"
							value={config.newsSection.title}
							onChange={(v) => updateNewsSection("title", v)}
						/>
						<ManageFormField
							label="Button text"
							value={config.newsSection.ctaText}
							onChange={(v) => updateNewsSection("ctaText", v)}
						/>
						<ManageFormField
							label="Button link"
							value={config.newsSection.ctaUrl}
							onChange={(v) => updateNewsSection("ctaUrl", v)}
						/>
					</div>
				</ManageFormSection>

				<ManageFormSection title="News items" onSave={saveNews}>
					<div className="manage-list__header">
						<span className="manage-field__label">Homepage news cards</span>
						<button type="button" className="manage-list__add" onClick={addNewsItem}>
							+ Add news item
						</button>
					</div>
					{newsItems.map((item, index) => (
						<div key={item.id || index} className="manage-object-list__card">
							<div className="manage-object-list__card-header">
								<strong>{item.title || `News item ${index + 1}`}</strong>
								<button
									type="button"
									className="manage-list__remove"
									onClick={() => removeNewsItem(index)}
								>
									Remove
								</button>
							</div>
							<div className="manage-object-list__fields">
								{newsFields.map((field) => (
									<ManageFormField
										key={field.key}
										label={field.label}
										type={field.type}
										value={item[field.key]}
										onChange={(v) => updateNewsItem(index, field.key, v)}
									/>
								))}
								<ManageMediaField
									label="Thumbnail image"
									value={item.img || ""}
									onChange={(v) => updateNewsItem(index, "img", v)}
									accept="image/*"
									recommendedSize={CMS_IMAGE_SIZES.homeNewsThumb}
								/>
							</div>
						</div>
					))}
				</ManageFormSection>

				<ManageFormSection title="Forex rates panel" onSave={saveForex}>
					<div className="manage-form__grid">
						<ManageFormField
							label="Last updated text"
							value={forex.updatedAt || ""}
							onChange={(v) => updateForex("updatedAt", v)}
						/>
						<ManageFormField
							label="Title"
							value={forex.title || ""}
							onChange={(v) => updateForex("title", v)}
						/>
					</div>
					<ManageFormField
						label="Subtitle"
						value={forex.subtitle || ""}
						onChange={(v) => updateForex("subtitle", v)}
					/>
					<div className="manage-form__grid">
						<ManageFormField
							label="Branch button text"
							value={forex.branchCta?.text || ""}
							onChange={(v) =>
								updateForex("branchCta", { ...(forex.branchCta || {}), text: v })
							}
						/>
						<ManageFormField
							label="Branch button link"
							value={forex.branchCta?.url || ""}
							onChange={(v) =>
								updateForex("branchCta", { ...(forex.branchCta || {}), url: v })
							}
						/>
					</div>
					<ManageObjectList
						label="Exchange rates"
						items={forex.rates || []}
						fields={rateFields}
						onChange={(v) => updateForex("rates", v)}
						addLabel="+ Add rate"
					/>
				</ManageFormSection>
			</div>
		</ManageEditorShell>
	);
};

export default HomepageEditor;
