"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PORTAL_ACCENTS = {
	admin: "#338ba8",
	"business-banking": "#338ba8",
	"personal-banking": "#338ba8",
	"treasury-capital": "#338ba8",
};

const ManageLoginForm = ({ portalId, portalLabel }) => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
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
			className={`manage-login-form${loading ? " is-loading" : ""}`}
			onSubmit={handleSubmit}
			style={{ "--manage-portal-accent": accent }}
		>
			<div className="manage-login-form__banner">
				{portalLabel.toUpperCase()} PORTAL
			</div>

			<div className="manage-login-form__body">
				{error ? (
					<div className="manage-login-form__error" role="alert">
						{error}
					</div>
				) : null}

				<label className="manage-login-field">
					<span className="manage-login-field__label">
						<i className="tji-envelop-2" aria-hidden="true" />
						Email address
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
				</label>

				<label className="manage-login-field">
					<span className="manage-login-field__label">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
						Password
					</span>
					<input
						className="manage-login-field__input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="current-password"
						placeholder="Enter your password"
					/>
				</label>

				<label className="manage-login-form__remember">
					<input
						type="checkbox"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
					/>
					<span>Remember Me</span>
				</label>

				<button
					type="submit"
					className="manage-login-form__submit"
					disabled={loading}
				>
					{loading ? "Signing in..." : "LOGIN"}
				</button>
			</div>
		</form>
	);
};

export default ManageLoginForm;
