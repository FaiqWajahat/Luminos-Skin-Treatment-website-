import { NextResponse } from "next/server";
import { updateEnquiry, deleteEnquiry } from "@/lib/db-store";

export async function PATCH(req, { params }) {
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

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await deleteEnquiry(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
