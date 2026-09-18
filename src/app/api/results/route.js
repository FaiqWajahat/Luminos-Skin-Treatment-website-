import { NextResponse } from "next/server";
import { getResults, createResult } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const result = await getResults({ page, limit });
    const responseData = Array.isArray(result)
      ? { results: result }
      : { results: result.results, pagination: result.pagination };

    return NextResponse.json(
      responseData,
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createResult(body);
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
