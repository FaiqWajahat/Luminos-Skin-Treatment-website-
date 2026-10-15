import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateTreatment, deleteTreatment } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { id } = await params;
    const treatment = await updateTreatment(id, body);
    if (!treatment) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ treatment });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { id } = await params;
    await deleteTreatment(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
