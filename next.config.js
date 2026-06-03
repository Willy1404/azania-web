/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],
};

module.exports = nextConfig;
