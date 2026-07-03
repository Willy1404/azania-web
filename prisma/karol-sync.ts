import "dotenv/config";
import { syncAllCmsContent } from "../src/lib/karol/cms-sync";

async function main() {
	const started = Date.now();
	const result = await syncAllCmsContent();
	const elapsedMs = Date.now() - started;

	console.log(`Karol sync complete (${elapsedMs}ms)`);
	console.log(`  Documents checked: ${result.total}`);
	if (result.created) console.log(`  New: ${result.created}`);
	if (result.updated) console.log(`  Updated: ${result.updated}`);
	if (result.unchanged) console.log(`  Unchanged: ${result.unchanged}`);
	console.log(`  Knowledge chunks: ${result.totalChunks}`);

	if (result.unchanged === result.total) {
		console.log("  No CMS changes detected — Karol is already up to date.");
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
