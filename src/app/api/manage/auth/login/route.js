import { NextResponse } from "next/server";
import { loginUser } from "@/lib/cms/auth";
import { getPortal } from "@/lib/cms/portals";

export async function POST(request) {
	try {
		const body = await request.json();
		const { email, password, portalId } = body;

		if (!email || !password || !portalId) {
			return NextResponse.json(
				{ error: "Email, password, and portal are required." },
				{ status: 400 }
			);
		}

		if (!getPortal(portalId)) {
			return NextResponse.json({ error: "Invalid portal." }, { status: 400 });
		}

		const result = await loginUser({ email, password, portalId });
		if (result.error) {
			return NextResponse.json({ error: result.error }, { status: 401 });
		}

		return NextResponse.json({
			ok: true,
			user: {
				name: result.user.name,
				email: result.user.email,
				role: result.user.role,
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Unable to sign in right now." },
			{ status: 500 }
		);
	}
}
