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
    const { preferredDate, timeSlot } = body;

    if (!preferredDate || !timeSlot) {
      return NextResponse.json(
        { error: "Please select both a date and time slot for your appointment." },
        { status: 400 }
      );
    }

    // Check existing enquiries for slot conflicts
    const existing = await getEnquiries();
    const slotNorm = timeSlot.trim().toLowerCase();

    const isConflict = existing.some((eq) => {
      const eqStatus = (eq.status || "New").trim().toLowerCase();
      if (eq.preferredDate === preferredDate && eqStatus !== "cancelled") {
        const eqSlotNorm = (eq.timeSlot || "").trim().toLowerCase();
        if (eqSlotNorm === slotNorm) return true;

        // Also compare standard slot label translations (e.g., "09:30 AM" vs "09:30")
        const clean1 = slotNorm.replace(/\s*(am|pm)/i, "").trim();
        const clean2 = eqSlotNorm.replace(/\s*(am|pm)/i, "").trim();
        if (clean1 && clean2 && clean1 === clean2) return true;
      }
      return false;
    });

    if (isConflict) {
      return NextResponse.json(
        { error: `The ${timeSlot} appointment slot on ${preferredDate} is already reserved. Please select another slot.` },
        { status: 409 }
      );
    }

    const enquiry = await createEnquiry(body);
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
