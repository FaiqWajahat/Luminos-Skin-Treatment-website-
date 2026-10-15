import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateEnquiry, deleteEnquiry } from "@/lib/db-store";

export async function PATCH(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { id } = await params;
    const enquiry = await updateEnquiry(id, body);
    if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ enquiry });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await deleteEnquiry(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
