import { getContentSingleton } from "@/lib/cms/content";
import { KAROL_DEFAULT_SETTINGS } from "@/lib/karol/constants";

const CONTENT_KEY = "karol_settings";

export async function getKarolSettings() {
	const data = await getContentSingleton(CONTENT_KEY, KAROL_DEFAULT_SETTINGS);
	const merged = { ...KAROL_DEFAULT_SETTINGS, ...data };

	if (merged.model === "gpt-4o-mini" || merged.model === "gpt-5.5") {
		merged.model = KAROL_DEFAULT_SETTINGS.model;
	}

	if (!merged.systemPrompt?.includes("Chat naturally like a helpful human")) {
		merged.systemPrompt = KAROL_DEFAULT_SETTINGS.systemPrompt;
	}

	if (merged.temperature < 0.5) {
		merged.temperature = KAROL_DEFAULT_SETTINGS.temperature;
	}

	return merged;
}

export async function saveKarolSettings(data, updatedBy) {
	const { saveContentSingleton } = await import("@/lib/cms/content");
	return saveContentSingleton({
		contentKey: CONTENT_KEY,
		data: { ...KAROL_DEFAULT_SETTINGS, ...data },
		updatedBy,
	});
}
