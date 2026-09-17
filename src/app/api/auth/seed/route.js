import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models";

export async function POST() {
  try {
    await connectToDatabase();
    const existing = await User.findOne({ email: "admin@luminous.com" });
    if (existing) return NextResponse.json({ message: "Admin already exists" });
    await User.create({ name: "Admin", email: "admin@luminous.com", password: "luminous123", role: "admin" });
    return NextResponse.json({ success: true, message: "Created: admin@luminous.com / luminous123" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
