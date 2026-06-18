"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PORTAL_ACCENTS = {
	admin: "#1faef3",
	"business-banking": "#1e8a8a",
	"personal-banking": "#e8b923",
	"treasury-capital": "#3b82f6",
};

const ManageLoginForm = ({ portalId, portalLabel, portalIcon = "tji-manage" }) => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const accent = PORTAL_ACCENTS[portalId] || PORTAL_ACCENTS.admin;

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("/api/manage/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, portalId }),
			});
			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Login failed.");
				return;
			}

			router.push(`/manage/${portalId}/dashboard`);
			router.refresh();
		} catch {
			setError("Unable to connect. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className={`manage-login-form manage-animate-in${loading ? " is-loading" : ""}`}
			onSubmit={handleSubmit}
			style={{ "--manage-portal-accent": accent }}
		>
			<div className="manage-login-form__accent" aria-hidden="true" />

			<header className="manage-login-form__header">
				<div className="manage-login-form__icon">
					<span className="manage-login-form__icon-ring" aria-hidden="true" />
					<i className={portalIcon} aria-hidden="true" />
				</div>
				<div>
					<p className="manage-login-form__eyebrow">Staff portal</p>
					<h2>{portalLabel}</h2>
					<p className="manage-login-form__subtitle">
						Sign in to publish and manage live website content
					</p>
				</div>
			</header>

			{error ? (
				<div className="manage-login-form__error" role="alert">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
						<path d="M12 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
						<circle cx="12" cy="16.5" r="1" fill="currentColor" />
					</svg>
					<span>{error}</span>
				</div>
			) : null}

			<div className="manage-login-form__fields">
				<label className="manage-login-field">
					<span className="manage-login-field__label">Email address</span>
					<div className="manage-login-field__control">
						<span className="manage-login-field__icon" aria-hidden="true">
							<i className="tji-envelop-2" />
						</span>
						<input
							className="manage-login-field__input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete="username"
							placeholder="you@azaniabank.co.tz"
						/>
					</div>
				</label>

				<label className="manage-login-field">
					<span className="manage-login-field__label">Password</span>
					<div className="manage-login-field__control">
						<span className="manage-login-field__icon" aria-hidden="true">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
								<rect
									x="5"
									y="11"
									width="14"
									height="10"
									rx="2"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
								<path
									d="M8 11V8a4 4 0 1 1 8 0v3"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</span>
						<input
							className="manage-login-field__input"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="current-password"
							placeholder="Enter your password"
						/>
						<button
							type="button"
							className="manage-login-field__toggle"
							onClick={() => setShowPassword((value) => !value)}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path
										d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
									<path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							) : (
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path
										d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
									<circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
								</svg>
							)}
						</button>
					</div>
				</label>
			</div>

			<button
				type="submit"
				className="manage-login-form__submit"
				disabled={loading}
			>
				<span className="manage-login-form__submit-text">
					{loading ? "Signing you in..." : "Sign in to dashboard"}
				</span>
				<span className="manage-login-form__submit-icon" aria-hidden="true">
					{loading ? (
						<span className="manage-login-form__spinner" />
					) : (
						<i className="tji-arrow-right-long" />
					)}
				</span>
			</button>

			<footer className="manage-login-form__secure">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M12 3 20 7v6c0 4.4-3.2 8.5-8 10-4.8-1.5-8-5.6-8-10V7l8-4Z"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
					/>
					<path
						d="m9 12 2 2 4-4"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span>Encrypted session · Authorized Azania Bank staff only</span>
			</footer>
		</form>
	);
};

export default ManageLoginForm;
