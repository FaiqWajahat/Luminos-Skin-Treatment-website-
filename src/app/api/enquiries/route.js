import { NextResponse } from "next/server";
import { getEnquiries, createEnquiry } from "@/lib/db-store";

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ enquiries });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const enquiry = await createEnquiry(body);
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
