"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

const CHART_COLORS = [
	"#1faef3",
	"#338ba8",
	"#e8b923",
	"#3b82f6",
	"#1e8a8a",
	"#6366f1",
	"#0ea5e9",
	"#f59e0b",
	"#10b981",
];

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "bottom",
			labels: {
				boxWidth: 12,
				padding: 14,
				font: { size: 12 },
			},
		},
	},
};

const barOptions = {
	...chartOptions,
	plugins: {
		...chartOptions.plugins,
		legend: { display: false },
	},
	scales: {
		x: {
			grid: { display: false },
			ticks: { font: { size: 11 }, maxRotation: 45, minRotation: 0 },
		},
		y: {
			beginAtZero: true,
			ticks: { stepSize: 1, font: { size: 11 } },
			grid: { color: "rgba(30, 30, 30, 0.06)" },
		},
	},
};

const ManageDashboardStats = ({ stats }) => {
	const { modulesCount, totalItems, totalPages, singletonModules, breakdown } =
		stats;

	const labels = breakdown.map((item) => item.label);
	const counts = breakdown.map((item) => item.count);
	const colors = breakdown.map((_, index) => CHART_COLORS[index % CHART_COLORS.length]);

	const doughnutData = {
		labels,
		datasets: [
			{
				data: counts,
				backgroundColor: colors,
				borderWidth: 2,
				borderColor: "#fff",
				hoverOffset: 6,
			},
		],
	};

	const barData = {
		labels,
		datasets: [
			{
				label: "Content items",
				data: counts,
				backgroundColor: colors.map((color) => `${color}cc`),
				borderColor: colors,
				borderWidth: 1,
				borderRadius: 8,
				maxBarThickness: 48,
			},
		],
	};

	const summaryCards = [
		{
			label: "Content modules",
			value: modulesCount,
			icon: "tji-box",
			accent: "#1faef3",
		},
		{
			label: "Total content items",
			value: totalItems,
			icon: "tji-operations",
			accent: "#338ba8",
		},
		{
			label: "Banking pages",
			value: totalPages,
			icon: "tji-strategy",
			accent: "#e8b923",
		},
		{
			label: "Site-wide modules",
			value: singletonModules,
			icon: "tji-worldwide",
			accent: "#3b82f6",
		},
	];

	return (
		<div className="manage-dashboard-stats">
			<div className="manage-section-head">
				<h2>Content overview</h2>
				<p>Live statistics for modules you can manage in this portal.</p>
			</div>

			<div className="manage-dashboard-stats__cards">
				{summaryCards.map((card) => (
					<div key={card.label} className="manage-dashboard-stats__card">
						<span
							className="manage-dashboard-stats__card-icon"
							style={{ background: `${card.accent}18`, color: card.accent }}
						>
							<i className={card.icon} aria-hidden="true" />
						</span>
						<div>
							<strong>{card.value}</strong>
							<span>{card.label}</span>
						</div>
					</div>
				))}
			</div>

			<div className="manage-dashboard-stats__charts">
				<div className="manage-dashboard-stats__chart-card">
					<h3>Content by module</h3>
					<p>Share of managed items across your workspace</p>
					<div className="manage-dashboard-stats__chart-wrap manage-dashboard-stats__chart-wrap--pie">
						<Doughnut data={doughnutData} options={chartOptions} />
					</div>
				</div>

				<div className="manage-dashboard-stats__chart-card">
					<h3>Items per module</h3>
					<p>Number of pages and entries in each module</p>
					<div className="manage-dashboard-stats__chart-wrap">
						<Bar data={barData} options={barOptions} />
					</div>
				</div>
			</div>

			<div className="manage-dashboard-stats__table-card">
				<h3>Module breakdown</h3>
				<ul>
					{breakdown.map((item, index) => (
						<li key={item.key}>
							<span className="manage-dashboard-stats__table-label">
								<i
									className={item.icon}
									style={{ color: colors[index] }}
									aria-hidden="true"
								/>
								{item.label}
							</span>
							<strong>{item.count}</strong>
							<span>{item.isCollection ? "pages" : "items"}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ManageDashboardStats;
