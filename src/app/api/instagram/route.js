import { NextResponse } from "next/server";
import { getLatestInstagramPosts, syncInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true";

    const posts = await getLatestInstagramPosts(forceSync);

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
      timestamp: new Date().toISOString(),
    });
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

export async function POST() {
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
