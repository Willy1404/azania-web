const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],
	turbopack: {
		root: path.join(__dirname),
	},
};

module.exports = nextConfig;
