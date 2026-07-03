import { NextResponse } from "next/server";
import { requirePortalSession } from "@/lib/cms/auth";
import { canManageContent } from "@/lib/cms/portals";
import {
	getKarolAnalytics,
	getKarolConversations,
	getKarolFeedback,
	getUnansweredQuestions,
} from "@/lib/karol/analytics";
import { getPrisma } from "@/lib/db";
import {
	deleteKarolDocument,
	ingestUploadedDocument,
	reindexAllDocuments,
	reindexDocument,
} from "@/lib/karol/ingest";
import { getKarolSettings, saveKarolSettings } from "@/lib/karol/settings";
import { KAROL_ALLOWED_MIME_TYPES } from "@/lib/karol/constants";

async function requireKarolAdmin(portal) {
	const session = await requirePortalSession(portal);
	if (!session || !canManageContent(session.role, "karol_ai")) {
		return null;
	}
	return session;
}

export async function GET(request, { params }) {
	const { portal } = await params;
	const session = await requireKarolAdmin(portal);
	if (!session) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const type = new URL(request.url).searchParams.get("type") || "documents";
	const prisma = getPrisma();

	if (type === "analytics") {
		return NextResponse.json(await getKarolAnalytics());
	}
	if (type === "conversations") {
		return NextResponse.json({ items: await getKarolConversations() });
	}
	if (type === "unanswered") {
		return NextResponse.json({ items: await getUnansweredQuestions() });
	}
	if (type === "feedback") {
		return NextResponse.json({ items: await getKarolFeedback() });
	}
	if (type === "settings") {
		return NextResponse.json({ data: await getKarolSettings() });
	}

	const documents = prisma
		? await prisma.karolDocument.findMany({ orderBy: { updatedAt: "desc" } })
		: [];

	return NextResponse.json({ items: documents });
}

export async function POST(request, { params }) {
	const { portal } = await params;
	const session = await requireKarolAdmin(portal);
	if (!session) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const contentType = request.headers.get("content-type") || "";

	if (contentType.includes("multipart/form-data")) {
		const formData = await request.formData();
		const file = formData.get("file");
		const title = String(formData.get("title") || "").trim();
		const category = String(formData.get("category") || "Website Pages").trim();

		if (!file || typeof file === "string") {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		}

		if (!KAROL_ALLOWED_MIME_TYPES.includes(file.type)) {
			return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const document = await ingestUploadedDocument({
			buffer,
			filename: file.name,
			mimeType: file.type,
			title: title || file.name,
			category,
			uploadedBy: session.email,
		});

		return NextResponse.json({ document });
	}

	const body = await request.json();

	if (body.action === "reindex-all") {
		const result = await reindexAllDocuments();
		return NextResponse.json(result);
	}

	if (body.action === "reindex" && body.documentId) {
		await reindexDocument(body.documentId);
		return NextResponse.json({ ok: true });
	}

	if (body.action === "save-settings" && body.data) {
		await saveKarolSettings(body.data, session.email);
		return NextResponse.json({ ok: true });
	}

	return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}

export async function DELETE(request, { params }) {
	const { portal } = await params;
	const session = await requireKarolAdmin(portal);
	if (!session) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const documentId = new URL(request.url).searchParams.get("id");
	if (!documentId) {
		return NextResponse.json({ error: "Document id required." }, { status: 400 });
	}

	await deleteKarolDocument(documentId);
	return NextResponse.json({ ok: true });
}
