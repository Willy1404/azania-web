import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function POST(request) {
	try {
		const body = await request.json();
		const messageId = body.messageId;
		const rating = body.rating;

		if (!messageId || !["up", "down"].includes(rating)) {
			return NextResponse.json({ error: "Invalid feedback." }, { status: 400 });
		}

		const prisma = getPrisma();
		if (!prisma) {
			return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
		}

		await prisma.karolFeedback.upsert({
			where: { messageId },
			create: {
				messageId,
				rating,
				comment: body.comment || null,
			},
			update: {
				rating,
				comment: body.comment || null,
			},
		});

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("[karol/feedback]", error);
		return NextResponse.json({ error: "Failed to save feedback." }, { status: 500 });
	}
}
