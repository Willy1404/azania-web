"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ManageLoginForm = ({ portalId, portalLabel, portalIcon = "tji-manage" }) => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

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
		<form className="manage-login-form" onSubmit={handleSubmit}>
			<div className="manage-login-form__icon">
				<i className={portalIcon} aria-hidden="true" />
			</div>
			<h2>{portalLabel}</h2>
			<p className="manage-login-form__subtitle">
				Sign in to manage website content
			</p>

			{error ? (
				<div className="manage-alert manage-alert--error">{error}</div>
			) : null}

			<label className="manage-field">
				<span className="manage-field__label">Email address</span>
				<input
					className="manage-field__input"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					autoComplete="username"
					placeholder="you@azaniabank.co.tz"
				/>
			</label>

			<label className="manage-field">
				<span className="manage-field__label">Password</span>
				<input
					className="manage-field__input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					autoComplete="current-password"
					placeholder="Enter your password"
				/>
			</label>

			<button type="submit" className="tj-primary-btn manage-login-form__submit" disabled={loading}>
				<span className="btn-text">
					<span>{loading ? "Signing in..." : "Sign in"}</span>
				</span>
				<span className="btn-icon">
					<i className="tji-arrow-right-long" aria-hidden="true" />
				</span>
			</button>
		</form>
	);
};

export default ManageLoginForm;
