import { NextResponse } from "next/server";
import { getResults, createResult } from "@/lib/db-store";

export async function GET() {
  try {
    const results = await getResults();
    return NextResponse.json({ results });
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
