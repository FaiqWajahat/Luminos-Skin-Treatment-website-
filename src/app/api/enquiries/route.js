import { NextResponse } from "next/server";
import { getEnquiries, createEnquiry, getBlockedSlots } from "@/lib/db-store";

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

    const slotNorm = timeSlot.trim().toLowerCase();

    // 1. Check blocked slots collection (admin closures & custom slot blocks)
    const blockedSlots = await getBlockedSlots();

    const isBlockedByAdmin = blockedSlots.some((b) => {
      if (b.date === preferredDate) {
        const bSlotNorm = (b.slot || "").trim().toLowerCase();
        if (bSlotNorm === "full_day" || bSlotNorm.includes("full day") || b.type === "FULL_DAY") {
          return "FULL_DAY";
        }
        if (bSlotNorm === slotNorm) return "SLOT";
        const clean1 = slotNorm.replace(/\s*(am|pm)/i, "").trim();
        const clean2 = bSlotNorm.replace(/\s*(am|pm)/i, "").trim();
        if (clean1 && clean2 && clean1 === clean2) return "SLOT";
      }
      return false;
    });

    if (isBlockedByAdmin === "FULL_DAY") {
      return NextResponse.json(
        { error: `The clinic is closed / fully blocked on ${preferredDate}. No appointments are available for this date.` },
        { status: 409 }
      );
    }

    if (isBlockedByAdmin === "SLOT") {
      return NextResponse.json(
        { error: `The ${timeSlot} slot on ${preferredDate} has been blocked by clinic admin. Please select another slot.` },
        { status: 409 }
      );
    }

    // 2. Check existing client enquiries for slot conflicts
    const existing = await getEnquiries();

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
