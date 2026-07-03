import { NextResponse } from "next/server";
import { getSession } from "@/lib/cms/auth";
import { saveUploadedFile } from "@/lib/cms/upload";

export async function POST(request) {
	const session = await getSession();
	if (!session) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get("file");
		const result = await saveUploadedFile(file, session.email);
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message || "Upload failed." },
			{ status: 400 }
		);
	}
}
