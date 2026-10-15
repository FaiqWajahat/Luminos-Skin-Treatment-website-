import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteUser } from "@/lib/db-store";

export async function DELETE(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
