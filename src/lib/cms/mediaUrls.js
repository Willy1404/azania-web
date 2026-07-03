export const CMS_MEDIA_URL_PREFIX = "/api/cms/media/";

export function getMediaAssetUrl(id) {
	return `${CMS_MEDIA_URL_PREFIX}${id}`;
}

export function isCmsMediaUrl(url) {
	return typeof url === "string" && url.startsWith(CMS_MEDIA_URL_PREFIX);
}
