import { NextResponse } from "next/server";
import { deleteBlockedSlot } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing blocked slot ID." }, { status: 400 });
    }
    const result = await deleteBlockedSlot(id);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
