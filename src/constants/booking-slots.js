/**
 * Booking schedule rules — shared by the booking form (what to show)
 * and the enquiries API (what to accept), so the two can never disagree.
 */

export const CLINIC_TIMEZONE = "Europe/London";

/** Minimum notice for a same-day booking, in minutes */
export const MIN_NOTICE_MINUTES = 60;

/** How far ahead clients can book, in days */
export const BOOKING_WINDOW_DAYS = 30;

// 30-minute session slots, 09:30 – 18:00
export const CLINICAL_SLOTS = [
  { id: "09:30", label: "09:30 AM", period: "Morning" },
  { id: "10:00", label: "10:00 AM", period: "Morning" },
  { id: "10:30", label: "10:30 AM", period: "Morning" },
  { id: "11:00", label: "11:00 AM", period: "Morning" },
  { id: "11:30", label: "11:30 AM", period: "Morning" },
  { id: "12:00", label: "12:00 PM", period: "Afternoon" },
  { id: "12:30", label: "12:30 PM", period: "Afternoon" },
  { id: "13:00", label: "01:00 PM", period: "Afternoon" },
  { id: "13:30", label: "01:30 PM", period: "Afternoon" },
  { id: "14:00", label: "02:00 PM", period: "Afternoon" },
  { id: "14:30", label: "02:30 PM", period: "Afternoon" },
  { id: "15:00", label: "03:00 PM", period: "Afternoon" },
  { id: "15:30", label: "03:30 PM", period: "Afternoon" },
  { id: "16:00", label: "04:00 PM", period: "Afternoon" },
  { id: "16:30", label: "04:30 PM", period: "Afternoon" },
  { id: "17:00", label: "05:00 PM", period: "Evening" },
  { id: "17:30", label: "05:30 PM", period: "Evening" },
  { id: "18:00", label: "06:00 PM", period: "Evening" },
];

const toMinutes = (id) => {
  const [h, m] = id.split(":").map(Number);
  return h * 60 + m;
};

/** Today's date ("YYYY-MM-DD") and minutes past midnight at the clinic */
export function clinicNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: CLINIC_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

const dayOfWeek = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sunday
};

export const findSlot = (value) => {
  const v = (value || "").trim().toLowerCase();
  return CLINICAL_SLOTS.find((s) => s.label.toLowerCase() === v || s.id === v) || null;
};

/**
 * Why a slot can't be booked on a date (ignoring existing bookings), or null if it can.
 * Covers Sundays, past dates and same-day notice. Monday–Saturday share the same hours.
 */
export function slotClosedReason(dateStr, slot, now = clinicNow()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || "")) return "Invalid date";
  if (dateStr < now.date) return "Date has passed";
  const daysAhead = (Date.parse(`${dateStr}T00:00:00Z`) - Date.parse(`${now.date}T00:00:00Z`)) / 86400000;
  if (daysAhead > BOOKING_WINDOW_DAYS) return "Too far ahead";

  const dow = dayOfWeek(dateStr);
  if (dow === 0) return "Closed on Sundays";

  const start = toMinutes(slot.id);

  if (dateStr === now.date && start < now.minutes + MIN_NOTICE_MINUTES) return "Too soon";

  return null;
}

/** Normalised slot key for comparing "09:30 AM", "09:30" etc. */
export const slotKey = (value) => findSlot(value)?.id || (value || "").trim().toLowerCase();
