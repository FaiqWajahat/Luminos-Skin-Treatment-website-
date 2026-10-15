import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getEnquiries, createEnquiry, getBlockedSlots } from "@/lib/db-store";
import { getPublicTreatments } from "@/lib/treatments";
import { clinicNow, findSlot, slotClosedReason, slotKey } from "@/constants/booking-slots";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

const isActive = (eq) => (eq.status || "New").trim().toLowerCase() !== "cancelled";
const isFullDay = (slot) => {
  const s = (slot || "").trim().toLowerCase();
  return s === "full_day" || s.includes("full day") || s.includes("clinic closed");
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Public: which slots are taken — no client details
    if (searchParams.get("scope") === "availability") {
      const enquiries = (await getEnquiries())
        .filter(isActive)
        .map(({ preferredDate, timeSlot, status }) => ({ preferredDate, timeSlot, status }));
      return NextResponse.json({ enquiries }, { headers: NO_STORE });
    }

    const denied = requireAdmin(req);
    if (denied) return denied;

    const enquiries = await getEnquiries();
    return NextResponse.json({ enquiries }, { headers: NO_STORE });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function generateReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `LUM-${code}`;
}

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Client details
    const name = clean(body.name, 100);
    const email = clean(body.email, 150).toLowerCase();
    const phone = clean(body.phone, 30);
    const message = clean(body.message, 1000);

    if (name.length < 2) return badRequest("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest("Please enter a valid email address.");
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(phone)) {
      return badRequest("Please enter a valid phone number.");
    }

    // 2. Treatment must be one we offer
    const treatments = await getPublicTreatments();
    const treatment = treatments.find((t) => t.slug === body.treatmentSlug);
    if (!treatment) return badRequest("Please choose a treatment from the menu.");

    // 3. Date & slot must be within opening hours and not in the past
    const preferredDate = clean(body.preferredDate, 10);
    const slot = findSlot(body.timeSlot);
    if (!slot) return badRequest("Please select a valid appointment time.");

    const closedReason = slotClosedReason(preferredDate, slot, clinicNow());
    if (closedReason) {
      return NextResponse.json(
        { error: `${slot.label} on ${preferredDate} isn't available — ${closedReason}. Please choose another time.` },
        { status: 409 },
      );
    }

    // 4. Not blocked by the clinic
    const blockedSlots = await getBlockedSlots();
    const blockedHere = blockedSlots.filter((b) => b.date === preferredDate);
    if (blockedHere.some((b) => b.type === "FULL_DAY" || isFullDay(b.slot))) {
      return NextResponse.json(
        { error: `The clinic is closed on ${preferredDate}. Please choose another date.` },
        { status: 409 },
      );
    }
    if (blockedHere.some((b) => slotKey(b.slot) === slot.id)) {
      return NextResponse.json(
        { error: `${slot.label} on ${preferredDate} is unavailable. Please choose another time.` },
        { status: 409 },
      );
    }

    // 5. Not already booked
    const existing = (await getEnquiries()).filter((eq) => isActive(eq) && eq.preferredDate === preferredDate);
    if (existing.some((eq) => isFullDay(eq.timeSlot) || slotKey(eq.timeSlot) === slot.id)) {
      return NextResponse.json(
        { error: `${slot.label} on ${preferredDate} has just been booked. Please choose another time.` },
        { status: 409 },
      );
    }

    // Only whitelisted fields are stored; status and notes stay under clinic control
    const enquiry = await createEnquiry({
      referenceId: generateReference(),
      name,
      email,
      phone,
      category: treatment.category,
      treatmentSlug: treatment.slug,
      treatmentTitle: treatment.title,
      preferredDate,
      timeSlot: slot.label,
      message,
    });

    return NextResponse.json(
      { success: true, enquiry: { referenceId: enquiry.referenceId, preferredDate, timeSlot: slot.label } },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/enquiries error:", err);
    return NextResponse.json({ error: "We couldn't save your booking. Please try again." }, { status: 500 });
  }
}

function badRequest(error) {
  return NextResponse.json({ error }, { status: 400 });
}
