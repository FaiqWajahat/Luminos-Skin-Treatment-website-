import { NextResponse } from "next/server";
import { getEnquiries, createEnquiry } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json(
      { enquiries },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
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
