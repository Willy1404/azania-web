import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { canAccessPortal } from "@/lib/cms/portals";

const SESSION_COOKIE = "azania_manage_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionSecret() {
	const secret = process.env.SESSION_SECRET;
	if (!secret) {
		throw new Error("SESSION_SECRET is not configured.");
	}
	return new TextEncoder().encode(secret);
}

export async function hashPassword(password) {
	return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

export async function createSession(user, portalId) {
	const token = await new SignJWT({
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		portalId,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`${SESSION_MAX_AGE}s`)
		.sign(getSessionSecret());

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_MAX_AGE,
		path: "/",
	});
}

export async function getSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get(SESSION_COOKIE)?.value;
	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, getSessionSecret());
		return payload;
	} catch {
		return null;
	}
}

export async function clearSession() {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE);
}

export async function loginUser({ email, password, portalId }) {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return { error: "Invalid email or password." };

	const valid = await verifyPassword(password, user.password);
	if (!valid) return { error: "Invalid email or password." };

	if (!canAccessPortal(user.role, portalId)) {
		return { error: "You do not have access to this management portal." };
	}

	await createSession(user, portalId);
	return { user };
}

export async function requirePortalSession(portalId) {
	const session = await getSession();
	if (!session || session.portalId !== portalId) {
		return null;
	}
	if (!canAccessPortal(session.role, portalId)) {
		return null;
	}
	return session;
}
