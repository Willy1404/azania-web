import { NextResponse } from "next/server";
import { runKarolChat } from "@/lib/karol/chat";
import { getKarolSettings } from "@/lib/karol/settings";
import { getKarolStatus } from "@/lib/karol/status";

export async function GET() {
	const [settings, status] = await Promise.all([getKarolSettings(), getKarolStatus()]);
	return NextResponse.json({
		enabled: settings.enabled,
		assistantName: settings.assistantName,
		welcomeMessageEn: settings.welcomeMessageEn,
		welcomeMessageSw: settings.welcomeMessageSw,
		quickActions: settings.quickActions,
		ready: status.ready,
		hasApiKey: status.hasApiKey,
		aiMode: status.aiMode,
		knowledgeChunks: status.knowledgeChunks,
	});
}

export async function POST(request) {
	try {
		const body = await request.json();
		const sessionId = body.sessionId || "anonymous";
		const message = String(body.message || "").trim();
		const history = Array.isArray(body.history) ? body.history : [];

		if (!message) {
			return NextResponse.json({ error: "Message is required." }, { status: 400 });
		}

		if (message.length > 2000) {
			return NextResponse.json({ error: "Message is too long." }, { status: 400 });
		}

		const result = await runKarolChat({ sessionId, message, history });
		return NextResponse.json(result);
	} catch (error) {
		console.error("[karol/chat]", error);
		return NextResponse.json(
			{
				answer:
					"I'm having trouble right now. Please contact Azania Bank Customer Care for assistance.",
				failed: true,
			},
			{ status: 500 }
		);
	}
}
