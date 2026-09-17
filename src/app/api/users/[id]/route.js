import { NextResponse } from "next/server";
import { deleteUser } from "@/lib/db-store";

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
