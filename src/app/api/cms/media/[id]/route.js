import { getMediaAsset } from "@/lib/cms/media";

export async function GET(_request, { params }) {
	const { id } = await params;
	const asset = await getMediaAsset(id);

	if (!asset) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(asset.data, {
		headers: {
			"Content-Type": asset.mimeType,
			"Content-Length": String(asset.size),
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Disposition": `inline; filename="${asset.filename.replace(/"/g, "")}"`,
		},
	});
}
