import { NextResponse } from "next/server";
import { getTreatments, createTreatment } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    const result = await getTreatments({ page, limit, category });
    const responseData = Array.isArray(result)
      ? { treatments: result }
      : { treatments: result.treatments, pagination: result.pagination };

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
    const treatment = await createTreatment(body);
    return NextResponse.json({ success: true, treatment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
