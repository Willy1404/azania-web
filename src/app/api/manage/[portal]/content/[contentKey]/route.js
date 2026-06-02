import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
	getContentCollection,
	getContentSingleton,
	saveContentCollectionBulk,
	saveContentCollectionItem,
	saveContentSingleton,
} from "@/lib/cms/content";
import { requirePortalSession } from "@/lib/cms/auth";
import {
	canManageContent,
	CONTENT_MODULES,
	getPortal,
} from "@/lib/cms/portals";

const REVALIDATE_PATHS = {
	business_banking_pages: ["/", "/business-banking"],
	personal_banking_pages: ["/", "/personal-banking"],
	treasury_capital_pages: ["/", "/treasury-and-capital"],
	home_news: ["/"],
	forex_rates: ["/"],
	faq_items: ["/faq"],
	reports: ["/reports"],
	tariff_sections: ["/support/tariff-guide"],
	nav_items: ["/"],
};

function revalidateContent(contentKey) {
	for (const path of REVALIDATE_PATHS[contentKey] || ["/"]) {
		revalidatePath(path);
	}
}

export async function GET(request, { params }) {
	const { portal, contentKey } = await params;
	const session = await requirePortalSession(portal);

	if (!session || !canManageContent(session.role, contentKey)) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const module = CONTENT_MODULES[contentKey];
	if (!module) {
		return NextResponse.json({ error: "Unknown content module." }, { status: 404 });
	}

	if (module.collection) {
		const items = await getContentCollection(contentKey, []);
		return NextResponse.json({ items, module });
	}

	const data = await getContentSingleton(contentKey, null);
	return NextResponse.json({ data, module });
}

export async function PUT(request, { params }) {
	const { portal, contentKey } = await params;
	const session = await requirePortalSession(portal);

	if (!session || !canManageContent(session.role, contentKey)) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const module = CONTENT_MODULES[contentKey];
	if (!module) {
		return NextResponse.json({ error: "Unknown content module." }, { status: 404 });
	}

	const body = await request.json();

	try {
		if (module.collection && Array.isArray(body.items)) {
			await saveContentCollectionBulk({
				contentKey,
				items: body.items,
				updatedBy: session.email,
			});
			revalidateContent(contentKey);
			return NextResponse.json({ ok: true });
		}

		if (module.collection && body.item?.slug) {
			await saveContentCollectionItem({
				contentKey,
				slug: body.item.slug,
				data: body.item,
				updatedBy: session.email,
			});
			revalidateContent(contentKey);
			return NextResponse.json({ ok: true });
		}

		if (!module.collection && body.data !== undefined) {
			await saveContentSingleton({
				contentKey,
				data: body.data,
				updatedBy: session.email,
			});
			revalidateContent(contentKey);
			return NextResponse.json({ ok: true });
		}

		return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to save content." }, { status: 500 });
	}
}
