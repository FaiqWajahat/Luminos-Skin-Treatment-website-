import { NextResponse, after } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getInstagramFeed, syncInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";

// Public read of the stored feed; a stale feed is refreshed after responding.
// Forced syncs are admin-only (POST) because they launch a browser scrape.
export async function GET() {
  try {
    const { posts, isStale, lastSyncedAt } = await getInstagramFeed();
    if (isStale) after(() => syncInstagramPosts().catch(() => {}));

    return NextResponse.json(
      {
        success: true,
        posts,
        count: posts.length,
        lastSyncedAt,
        timestamp: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("GET /api/instagram error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Instagram posts",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const result = await syncInstagramPosts();
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/instagram error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to sync Instagram posts",
      },
      { status: 500 }
    );
  }
}
