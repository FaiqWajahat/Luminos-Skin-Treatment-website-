import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getUsers, createUser } from "@/lib/db-store";

export async function GET(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 });
    }
    const user = await createUser({ name, email, password, role });
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
