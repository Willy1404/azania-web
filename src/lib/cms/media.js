import { getPrisma } from "@/lib/db";
import { getMediaAssetUrl } from "@/lib/cms/mediaUrls";

export { CMS_MEDIA_URL_PREFIX, getMediaAssetUrl, isCmsMediaUrl } from "@/lib/cms/mediaUrls";

export async function getMediaAsset(id) {
	const prisma = getPrisma();
	if (!prisma) return null;

	try {
		return await prisma.mediaAsset.findUnique({ where: { id } });
	} catch (error) {
		console.warn("[cms] Failed to load media asset:", error?.message || error);
		return null;
	}
}

export async function saveMediaAsset({ buffer, filename, mimeType, kind, uploadedBy }) {
	const prisma = getPrisma();
	if (!prisma) {
		throw new Error("Database unavailable. Cannot store uploaded media.");
	}

	const asset = await prisma.mediaAsset.create({
		data: {
			filename,
			mimeType,
			kind,
			size: buffer.length,
			data: buffer,
			uploadedBy,
		},
	});

	return {
		id: asset.id,
		url: getMediaAssetUrl(asset.id),
		kind: asset.kind,
		filename: asset.filename,
		size: asset.size,
	};
}
