import { NextResponse } from "next/server";
import { getBlockedSlots, createBlockedSlot } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const blockedSlots = await getBlockedSlots();
    return NextResponse.json(
      { blockedSlots },
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
    const { date, slot, reason, type } = body;

    if (!date || !slot) {
      return NextResponse.json(
        { error: "Please provide both date and time slot / block type." },
        { status: 400 }
      );
    }

    const blockedSlot = await createBlockedSlot({
      date,
      slot,
      reason: reason || "Admin Blocked",
      type: type || (slot === "FULL_DAY" ? "FULL_DAY" : "SLOT"),
    });

    return NextResponse.json({ success: true, blockedSlot }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
