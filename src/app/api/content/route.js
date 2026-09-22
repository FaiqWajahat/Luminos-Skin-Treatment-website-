import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/db-store";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Type query parameter is required" },
        { status: 400 },
      );
    }

    const content = await getContent(type);

    // If not found, it returns null which is fine, frontend handles it.
    return NextResponse.json(
      { content },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Type and data are required" },
        { status: 400 },
      );
    }

    const updated = await updateContent(type, data);
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
