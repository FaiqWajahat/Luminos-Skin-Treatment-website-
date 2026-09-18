import { NextResponse } from "next/server";
import { updateResult, deleteResult } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const result = await updateResult(id, body);
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await deleteResult(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
