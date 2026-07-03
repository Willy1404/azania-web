"use client";

import { useCallback, useEffect, useState } from "react";
import FaqEditor from "@/components/manage/editors/FaqEditor";
import ManageEditorShell from "@/components/manage/forms/ManageEditorShell";
import ManageFormField from "@/components/manage/forms/ManageFormField";
import { KAROL_CATEGORIES } from "@/lib/karol/constants";

const SECTIONS = [
	{ key: "dashboard", label: "Analytics" },
	{ key: "documents", label: "Documents" },
	{ key: "faqs", label: "FAQs" },
	{ key: "conversations", label: "Conversations" },
	{ key: "unanswered", label: "Unanswered" },
	{ key: "feedback", label: "Feedback" },
	{ key: "settings", label: "Settings" },
];

function formatDateTime(value) {
	return new Date(value).toLocaleString();
}

function shortSessionId(sessionId) {
	if (!sessionId) return "unknown";
	const parts = sessionId.split("_");
	return parts.length > 1 ? parts[parts.length - 1] : sessionId.slice(-10);
}

function KarolEmptyState({ title, description }) {
	return (
		<div className="karol-admin__empty-state">
			<strong>{title}</strong>
			<p>{description}</p>
		</div>
	);
}

function KarolPanel({ portalId, activeSection, initialData }) {
	const apiBase = `/api/manage/${portalId}/karol`;
	const [analytics, setAnalytics] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [conversations, setConversations] = useState([]);
	const [unanswered, setUnanswered] = useState([]);
	const [feedbackItems, setFeedbackItems] = useState([]);
	const [settings, setSettings] = useState(initialData?.settings || null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [uploadTitle, setUploadTitle] = useState("");
	const [uploadCategory, setUploadCategory] = useState(KAROL_CATEGORIES[0]);

	const loadSection = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			if (activeSection === "dashboard") {
				const res = await fetch(`${apiBase}?type=analytics`);
				setAnalytics(await res.json());
			} else if (activeSection === "documents") {
				const res = await fetch(`${apiBase}?type=documents`);
				const data = await res.json();
				setDocuments(data.items || []);
			} else if (activeSection === "conversations") {
				const res = await fetch(`${apiBase}?type=conversations`);
				const data = await res.json();
				setConversations(data.items || []);
			} else if (activeSection === "unanswered") {
				const res = await fetch(`${apiBase}?type=unanswered`);
				const data = await res.json();
				setUnanswered(data.items || []);
			} else if (activeSection === "feedback") {
				const res = await fetch(`${apiBase}?type=feedback`);
				const data = await res.json();
				setFeedbackItems(data.items || []);
			} else if (activeSection === "settings") {
				const res = await fetch(`${apiBase}?type=settings`);
				const data = await res.json();
				setSettings(data.data);
			}
		} catch {
			setError("Failed to load Karol data.");
		} finally {
			setLoading(false);
		}
	}, [activeSection, apiBase]);

	useEffect(() => {
		if (activeSection !== "faqs") loadSection();
	}, [activeSection, loadSection]);

	const handleUpload = async (file) => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("title", uploadTitle || file.name);
		formData.append("category", uploadCategory);
		setLoading(true);
		try {
			const res = await fetch(apiBase, { method: "POST", body: formData });
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Upload failed");
			setMessage("Document uploaded and indexed.");
			setUploadTitle("");
			loadSection();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleReindexAll = async () => {
		setLoading(true);
		try {
			const res = await fetch(apiBase, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "reindex-all" }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Re-index failed");
			const parts = [
				data.updated ? `${data.updated} updated` : null,
				data.created ? `${data.created} new` : null,
				data.unchanged ? `${data.unchanged} unchanged` : null,
			].filter(Boolean);
			setMessage(parts.length ? `Re-indexed: ${parts.join(", ")}.` : "Karol knowledge base is up to date.");
			loadSection();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this document from the knowledge base?")) return;
		await fetch(`${apiBase}?id=${id}`, { method: "DELETE" });
		loadSection();
	};

	const saveSettings = async () => {
		setLoading(true);
		try {
			const res = await fetch(apiBase, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "save-settings", data: settings }),
			});
			if (!res.ok) throw new Error("Failed to save settings.");
			setMessage("Karol settings saved.");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (activeSection === "faqs") {
		return (
			<FaqEditor
				portalId={portalId}
				contentKey="faq_items"
				label="Karol FAQs"
				initialData={initialData?.faq}
			/>
		);
	}

	return (
		<ManageEditorShell
			title="Karol AI Assistant"
			onSave={activeSection === "settings" ? saveSettings : undefined}
			saveLabel={activeSection === "settings" ? "Save settings" : "Save changes"}
			message={message}
			error={error}
			loading={loading}
		>
			{loading && activeSection !== "settings" ? (
				<p className="karol-admin__loading">Loading…</p>
			) : null}

			{activeSection === "dashboard" && analytics && !loading ? (
				<div className="karol-admin__stats">
					<div className={`karol-admin__status karol-admin__status--${analytics.ready ? "ready" : "pending"}`}>
						<strong>{analytics.ready ? "Karol is live" : "Karol needs setup"}</strong>
						<span>
							{analytics.hasApiKey ? `OpenAI Responses API (${analytics.model || "gpt-5.4-mini"})` : "Knowledge-base mode (add OPENAI_API_KEY for full AI)"}
							{" · "}
							{analytics.knowledgeChunks} chunks · {analytics.knowledgeDocuments} documents
						</span>
					</div>

					<div className="karol-admin__metrics">
						<div className="karol-admin__stat"><strong>{analytics.totalChats}</strong><span>Total chats</span></div>
						<div className="karol-admin__stat"><strong>{analytics.activeUsers}</strong><span>Active users</span></div>
						<div className="karol-admin__stat"><strong>{analytics.avgResponseTimeMs}ms</strong><span>Avg response time</span></div>
						<div className="karol-admin__stat"><strong>{analytics.satisfactionRate}%</strong><span>Satisfaction</span></div>
						<div className="karol-admin__stat"><strong>{analytics.failedResponses}</strong><span>Failed responses</span></div>
					</div>

					<div className="karol-admin__insights">
						<div className="karol-admin__list">
							<h4>Most asked questions</h4>
							<ul>
								{analytics.topQuestions?.length ? (
									analytics.topQuestions.map((item) => (
										<li key={item.question}>{item.question} ({item.count})</li>
									))
								) : (
									<li className="karol-admin__empty">No questions yet</li>
								)}
							</ul>
						</div>
						<div className="karol-admin__list">
							<h4>Top searched products</h4>
							<ul>
								{analytics.topProducts?.length ? (
									analytics.topProducts.map((item) => (
										<li key={item.product}>{item.product} ({item.count})</li>
									))
								) : (
									<li className="karol-admin__empty">No product searches yet</li>
								)}
							</ul>
						</div>
						<div className="karol-admin__list">
							<h4>Languages used</h4>
							<ul>
								{analytics.languages?.length ? (
									analytics.languages.map((item) => (
										<li key={item.language}>{item.language}: {item.count}</li>
									))
								) : (
									<li className="karol-admin__empty">No language data yet</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			) : null}

			{activeSection === "documents" && !loading ? (
				<div className="karol-admin__documents">
					<div className="karol-admin__panel">
						<div className="karol-admin__panel-head">
							<h3>Upload document</h3>
							<p>Add PDF, Word, or text files to Karol&apos;s knowledge base.</p>
						</div>
						<div className="karol-admin__upload-grid">
							<ManageFormField label="Document title" value={uploadTitle} onChange={setUploadTitle} />
							<label className="manage-field">
								<span className="manage-field__label">Category</span>
								<select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)}>
									{KAROL_CATEGORIES.map((category) => (
										<option key={category} value={category}>{category}</option>
									))}
								</select>
							</label>
							<label className="karol-admin__file-field">
								<span className="manage-field__label">File</span>
								<input
									type="file"
									accept=".pdf,.docx,.txt,.md,.html"
									onChange={(e) => handleUpload(e.target.files?.[0])}
								/>
							</label>
						</div>
					</div>

					<div className="karol-admin__panel">
						<div className="karol-admin__panel-head karol-admin__panel-head--row">
							<div>
								<h3>Knowledge base</h3>
								<p>{documents.length} documents indexed for Karol.</p>
							</div>
							<button type="button" className="karol-admin__btn karol-admin__btn--secondary" onClick={handleReindexAll}>
								Re-index CMS content
							</button>
						</div>
						{documents.length ? (
							<div className="karol-admin__table-wrap">
								<table className="karol-admin__table">
									<thead>
										<tr>
											<th>Title</th>
											<th>Category</th>
											<th>Status</th>
											<th>Chunks</th>
											<th>Source</th>
											<th aria-label="Actions" />
										</tr>
									</thead>
									<tbody>
										{documents.map((doc) => (
											<tr key={doc.id}>
												<td className="karol-admin__table-title">{doc.title}</td>
												<td>{doc.category}</td>
												<td>
													<span className={`karol-admin__badge karol-admin__badge--${doc.status === "indexed" ? "success" : "muted"}`}>
														{doc.status}
													</span>
												</td>
												<td>{doc.chunkCount}</td>
												<td>
													<span className="karol-admin__badge karol-admin__badge--info">{doc.sourceType}</span>
												</td>
												<td className="karol-admin__table-actions">
													<button type="button" className="karol-admin__btn karol-admin__btn--danger" onClick={() => handleDelete(doc.id)}>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<KarolEmptyState title="No documents yet" description="Upload a file or re-index CMS content to build Karol's knowledge base." />
						)}
					</div>
				</div>
			) : null}

			{activeSection === "conversations" && !loading ? (
				<div className="karol-admin__conversations">
					{conversations.length ? (
						conversations.map((conversation) => (
							<article key={conversation.id} className="karol-admin__conversation">
								<header className="karol-admin__conversation-head">
									<div>
										<span className="karol-admin__conversation-label">Session</span>
										<strong>{shortSessionId(conversation.sessionId)}</strong>
									</div>
									<div className="karol-admin__conversation-meta">
										<span className="karol-admin__badge karol-admin__badge--info">
											{(conversation.language || "en").toUpperCase()}
										</span>
										<time dateTime={conversation.updatedAt}>{formatDateTime(conversation.updatedAt)}</time>
									</div>
								</header>
								<div className="karol-admin__chat">
									{conversation.messages.map((chatMessage) => (
										<div
											key={chatMessage.id}
											className={`karol-admin__chat-bubble karol-admin__chat-bubble--${chatMessage.role}`}
										>
											<span className="karol-admin__chat-role">
												{chatMessage.role === "assistant" ? "Karol" : "User"}
											</span>
											<p>{chatMessage.content}</p>
										</div>
									))}
								</div>
							</article>
						))
					) : (
						<KarolEmptyState title="No conversations yet" description="Customer chats with Karol will appear here once people start using the assistant." />
					)}
				</div>
			) : null}

			{activeSection === "unanswered" && !loading ? (
				<div className="karol-admin__issue-list">
					{unanswered.length ? (
						unanswered.map((item) => (
							<article key={item.id} className="karol-admin__issue-card">
								{item.userQuestion ? (
									<div className="karol-admin__issue-block">
										<span className="karol-admin__issue-label">Customer asked</span>
										<p>{item.userQuestion}</p>
									</div>
								) : null}
								<div className="karol-admin__issue-block karol-admin__issue-block--muted">
									<span className="karol-admin__issue-label">Karol could not answer</span>
									<p>{item.answer}</p>
								</div>
								<footer className="karol-admin__issue-foot">
									<span className="karol-admin__badge karol-admin__badge--muted">
										{(item.language || "en").toUpperCase()}
									</span>
									<time dateTime={item.createdAt}>{formatDateTime(item.createdAt)}</time>
								</footer>
							</article>
						))
					) : (
						<KarolEmptyState title="No unanswered questions" description="Great — Karol has been able to answer every recent customer question." />
					)}
				</div>
			) : null}

			{activeSection === "feedback" && !loading ? (
				<div className="karol-admin__feedback-list">
					{feedbackItems.length ? (
						feedbackItems.map((item) => (
							<article key={item.id} className="karol-admin__feedback-card">
								<div className="karol-admin__feedback-rating">
									{item.rating === "up" ? "👍 Helpful" : "👎 Not helpful"}
								</div>
								<p>{item.message?.content}</p>
								<footer className="karol-admin__issue-foot">
									<time dateTime={item.message?.createdAt}>
										{item.message?.createdAt ? formatDateTime(item.message.createdAt) : ""}
									</time>
								</footer>
							</article>
						))
					) : (
						<KarolEmptyState title="No feedback yet" description="Thumbs up and down ratings from customers will show up here." />
					)}
				</div>
			) : null}

			{activeSection === "settings" && settings ? (
				<div className="karol-admin__settings">
					<label className="karol-admin__checkbox">
						<input type="checkbox" checked={settings.enabled} onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })} />
						<span>Enable Karol on website</span>
					</label>
					<ManageFormField label="Assistant name" value={settings.assistantName} onChange={(v) => setSettings({ ...settings, assistantName: v })} />
					<ManageFormField label="Welcome message (English)" type="textarea" value={settings.welcomeMessageEn} onChange={(v) => setSettings({ ...settings, welcomeMessageEn: v })} />
					<ManageFormField label="Welcome message (Swahili)" type="textarea" value={settings.welcomeMessageSw} onChange={(v) => setSettings({ ...settings, welcomeMessageSw: v })} />
					<ManageFormField label="System prompt" type="textarea" value={settings.systemPrompt} onChange={(v) => setSettings({ ...settings, systemPrompt: v })} />
					<ManageFormField label="Model" value={settings.model} onChange={(v) => setSettings({ ...settings, model: v })} placeholder="gpt-5.4-mini" />
					<ManageFormField label="Embedding model" value={settings.embeddingModel} onChange={(v) => setSettings({ ...settings, embeddingModel: v })} />
				</div>
			) : null}
		</ManageEditorShell>
	);
}

const KarolAiEditor = ({ portalId, initialData, activeSection = "dashboard" }) => {
	return (
		<KarolPanel portalId={portalId} activeSection={activeSection} initialData={initialData} />
	);
};

KarolAiEditor.sections = SECTIONS;

export default KarolAiEditor;
