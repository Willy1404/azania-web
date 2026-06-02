import { NextResponse } from "next/server";

export function middleware(request) {
	const { pathname } = request.nextUrl;

	const isProtected =
		pathname.includes("/manage/") &&
		(pathname.endsWith("/dashboard") || pathname.includes("/content/"));

	if (!isProtected) {
		return NextResponse.next();
	}

	const token = request.cookies.get("azania_manage_session")?.value;
	if (!token) {
		const portal = pathname.split("/")[2];
		const loginUrl = new URL(`/manage/${portal}/login`, request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/manage/:portal/dashboard", "/manage/:portal/content/:path*"],
};
