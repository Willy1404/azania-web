"use client";

import { useEffect, useRef, useState } from "react";

const VISIBLE_ROWS = 5;
const ROW_HEIGHT = 52;
const INTERVAL_MS = 2800;

const formatRate = (value) => {
	if (Number.isInteger(value)) return value.toLocaleString();
	return value.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

const ForexRateRow = ({ rate }) => (
	<li className="azania-forex-rate">
		<span className="azania-forex-rate__flag">
			<img
				src={`https://flagcdn.com/w40/${rate.flag}.png`}
				alt=""
				width={28}
				height={20}
				loading="lazy"
			/>
		</span>
		<span className="azania-forex-rate__pair">{rate.pair}</span>
		<span className="azania-forex-rate__values">
			<span>
				Buying <strong>{formatRate(rate.buying)}</strong>
			</span>
			<span>
				Selling <strong>{formatRate(rate.selling)}</strong>
			</span>
		</span>
	</li>
);

const ForexRatesTicker = ({ rates = [] }) => {
	const [step, setStep] = useState(0);
	const [animated, setAnimated] = useState(true);
	const [paused, setPaused] = useState(false);
	const resetPending = useRef(false);
	const loopItems = [...rates, ...rates];

	useEffect(() => {
		if (paused || rates.length === 0) return undefined;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		if (prefersReducedMotion) return undefined;

		const id = window.setInterval(() => {
			setAnimated(true);
			setStep((current) => current + 1);
		}, INTERVAL_MS);

		return () => window.clearInterval(id);
	}, [paused, rates.length]);

	const handleTransitionEnd = () => {
		if (step >= rates.length && !resetPending.current) {
			resetPending.current = true;
			setAnimated(false);
			setStep(0);
		}
	};

	useEffect(() => {
		if (!animated && step === 0) {
			resetPending.current = false;
			const id = requestAnimationFrame(() => setAnimated(true));
			return () => cancelAnimationFrame(id);
		}
		return undefined;
	}, [animated, step]);

	if (!rates.length) return null;

	return (
		<div
			className="azania-forex-card__rates-viewport"
			style={{ height: VISIBLE_ROWS * ROW_HEIGHT }}
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<ul
				className={`azania-forex-card__rates-track${
					animated ? " is-animated" : ""
				}`}
				style={{
					transform: `translate3d(0, -${step * ROW_HEIGHT}px, 0)`,
				}}
				onTransitionEnd={handleTransitionEnd}
			>
				{loopItems.map((rate, idx) => (
					<ForexRateRow key={`${rate.pair}-${idx}`} rate={rate} />
				))}
			</ul>
		</div>
	);
};

export default ForexRatesTicker;
