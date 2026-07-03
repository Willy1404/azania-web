"use client";

import KarolAvatar from "@/components/karol/KarolAvatar";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

function formatTime(date) {
	return new Intl.DateTimeFormat(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}

function getSessionId() {
	if (typeof window === "undefined") return "anonymous";
	const key = "karol_session_id";
	let id = window.localStorage.getItem(key);
	if (!id) {
		id = `karol_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
		window.localStorage.setItem(key, id);
	}
	return id;
}

const KarolChatWidget = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [config, setConfig] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false);
	const [language, setLanguage] = useState("en");
	const [feedback, setFeedback] = useState({});
	const listRef = useRef(null);
	const sessionId = useMemo(() => getSessionId(), []);

	const hidden = pathname?.startsWith("/manage");

	useEffect(() => {
		if (hidden) return;
		fetch("/api/karol/chat")
			.then((res) => res.json())
			.then((data) => setConfig(data))
			.catch(() => setConfig({ enabled: true, assistantName: "Karol" }));
	}, [hidden]);

	useEffect(() => {
		if (!open || messages.length) return;
		const welcome =
			language === "sw" ? config?.welcomeMessageSw : config?.welcomeMessageEn;
		if (welcome) {
			setMessages([
				{
					id: "welcome",
					role: "assistant",
					content: welcome,
					createdAt: new Date(),
				},
			]);
		}
	}, [open, config, language, messages.length]);

	useEffect(() => {
		listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
	}, [messages, typing, open]);

	const sendMessage = async (text) => {
		const trimmed = text.trim();
		if (!trimmed || typing) return;

		const userMessage = {
			id: `user_${Date.now()}`,
			role: "user",
			content: trimmed,
			createdAt: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setTyping(true);

		try {
			const history = [...messages, userMessage]
				.filter((msg) => msg.id !== "welcome")
				.map((msg) => ({ role: msg.role, content: msg.content }));

			const response = await fetch("/api/karol/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ sessionId, message: trimmed, history }),
			});

			const data = await response.json();
			if (data.language) setLanguage(data.language);

			setMessages((prev) => [
				...prev,
				{
					id: data.messageId || `assistant_${Date.now()}`,
					role: "assistant",
					content: data.answer,
					relatedQuestions: data.relatedQuestions || [],
					createdAt: new Date(),
					failed: data.failed,
				},
			]);
		} catch {
			setMessages((prev) => [
				...prev,
				{
					id: `assistant_${Date.now()}`,
					role: "assistant",
					content:
						"I'm having trouble right now. Please contact Azania Bank Customer Care for assistance.",
					createdAt: new Date(),
					failed: true,
				},
			]);
		} finally {
			setTyping(false);
		}
	};

	const submitFeedback = async (messageId, rating) => {
		if (!messageId || messageId === "welcome" || messageId.startsWith("assistant_")) return;
		setFeedback((prev) => ({ ...prev, [messageId]: rating }));
		await fetch("/api/karol/feedback", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ messageId, rating }),
		});
	};

	if (hidden || config?.enabled === false) return null;

	const quickActions = config?.quickActions || [];
	const assistantName = config?.assistantName || "Karol";

	return (
		<div className={`karol-widget ${open ? "is-open" : ""}`}>
			{open ? (
				<div className="karol-widget__panel" role="dialog" aria-label={`${assistantName} chat`}>
					<div className="karol-widget__header">
						<div className="karol-widget__header-main">
							<KarolAvatar size={52} className="karol-widget__header-avatar" />
							<div>
								<strong>{assistantName}</strong>
								<span>Azania Bank AI Assistant</span>
							</div>
						</div>
						<button
							type="button"
							className="karol-widget__close"
							onClick={() => setOpen(false)}
							aria-label="Close chat"
						>
							×
						</button>
					</div>

					<div className="karol-widget__messages" ref={listRef}>
						{messages.map((message) => (
							<div
								key={message.id}
								className={`karol-widget__message karol-widget__message--${message.role}`}
							>
								{message.role === "assistant" ? (
									<KarolAvatar size={36} className="karol-widget__message-avatar" />
								) : null}
								<div className="karol-widget__message-body">
									<div className="karol-widget__bubble">
										{message.role === "assistant" ? (
											<ReactMarkdown>{message.content}</ReactMarkdown>
										) : (
											message.content
										)}
									</div>
									<div className="karol-widget__meta">
										<span>{formatTime(message.createdAt)}</span>
										{message.role === "assistant" && message.id !== "welcome" ? (
											<span className="karol-widget__rating">
												<button
													type="button"
													className={feedback[message.id] === "up" ? "is-active" : ""}
													onClick={() => submitFeedback(message.id, "up")}
													aria-label="Helpful"
												>
													👍
												</button>
												<button
													type="button"
													className={feedback[message.id] === "down" ? "is-active" : ""}
													onClick={() => submitFeedback(message.id, "down")}
													aria-label="Not helpful"
												>
													👎
												</button>
											</span>
										) : null}
									</div>
									{message.relatedQuestions?.length ? (
										<div className="karol-widget__related">
											{message.relatedQuestions.map((question) => (
												<button
													key={question}
													type="button"
													onClick={() => sendMessage(question)}
												>
													{question}
												</button>
											))}
										</div>
									) : null}
								</div>
							</div>
						))}
						{typing ? (
							<div className="karol-widget__message karol-widget__message--assistant">
								<KarolAvatar size={36} className="karol-widget__message-avatar" />
								<div className="karol-widget__message-body">
									<div className="karol-widget__bubble karol-widget__typing">
										<span />
										<span />
										<span />
									</div>
								</div>
							</div>
						) : null}
					</div>

					{quickActions.length ? (
						<div className="karol-widget__quick-actions">
							{quickActions.map((action) => (
								<button
									key={action.labelEn}
									type="button"
									onClick={() =>
										sendMessage(language === "sw" ? action.messageSw : action.messageEn)
									}
								>
									{language === "sw" ? action.labelSw : action.labelEn}
								</button>
							))}
						</div>
					) : null}

					<form
						className="karol-widget__composer"
						onSubmit={(event) => {
							event.preventDefault();
							sendMessage(input);
						}}
					>
						<input
							value={input}
							onChange={(event) => setInput(event.target.value)}
							placeholder={
								language === "sw"
									? "Andika swali lako hapa..."
									: "Type your question here..."
							}
						/>
						<button type="submit" disabled={typing || !input.trim()}>
							Send
						</button>
					</form>
				</div>
			) : (
				<button
					type="button"
					className="karol-widget__launcher"
					onClick={() => setOpen(true)}
					aria-expanded={open}
					aria-label={`Chat with ${assistantName}`}
				>
					<span className="karol-widget__launcher-ring" />
					<KarolAvatar size={84} className="karol-widget__launcher-avatar" />
					<span className="karol-widget__launcher-label">{assistantName}</span>
				</button>
			)}
		</div>
	);
};

export default KarolChatWidget;
