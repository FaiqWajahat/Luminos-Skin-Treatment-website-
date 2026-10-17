"use client";

import { forwardRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, Copy, Home, Phone, RefreshCw } from "lucide-react";
import { CLINIC_INFO } from "@/constants/clinic-data";
import { WhatsAppIcon } from "@/components/shared/social-icons";

const NEXT_STEPS = [
  { title: "Request received", text: "Your booking request has been sent to the clinic." },
  { title: "Confirmation", text: "I’ll contact you by phone, WhatsApp or email to confirm your appointment." },
  { title: "£10 deposit", text: "A £10 deposit secures your slot and is taken off your treatment price on the day." },
];

const formatDate = (value) =>
  new Date(`${value}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function Row({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3 border-b border-[#F0E6E1] last:border-none">
      <dt className="text-sm text-[#78716C] shrink-0">{label}</dt>
      <dd className="text-sm font-medium text-[#1C1917] text-right break-all sm:break-normal">{children}</dd>
    </div>
  );
}

export const BookingConfirmation = forwardRef(function BookingConfirmation({ booking, onReset }, ref) {
  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(booking.referenceId);
      toast.success("Reference copied");
    } catch {
      toast.error("Couldn't copy — please note it down.");
    }
  };

  const whatsappText = `Hello, I've just requested a booking (${booking.referenceId}) for ${booking.treatment} on ${formatDate(booking.date)} at ${booking.time}.`;

  return (
    <div ref={ref} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
      {/* Header */}
      <div className="text-center space-y-4 pb-8 border-b border-[#E8DFD5]">
        <span className="relative mx-auto flex w-16 h-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F0A5A2] to-[#D97E80] text-white shadow-lg shadow-[#EC9C9D]/30">
          <Check className="w-8 h-8" strokeWidth={2.5} />
        </span>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D97E80]">Booking Request Received</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
            Thank you, {booking.name.split(" ")[0]}
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-md mx-auto">
            Your appointment request has been sent. Please keep your reference number for any questions.
          </p>
        </div>

        {booking.referenceId && (
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[#EC9C9D]/40 bg-[#FBEDEC]/60 pl-5 pr-2 py-2">
            <span className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78716C]">Reference</span>
              <span className="block font-mono text-lg font-bold text-[#1C1917]">{booking.referenceId}</span>
            </span>
            <button
              type="button"
              onClick={copyReference}
              aria-label="Copy reference"
              className="p-2.5 rounded-xl bg-white border border-[#E8DFD5] text-[#57534E] hover:text-[#D97E80] hover:border-[#EC9C9D] transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 pt-8">
        {/* Appointment summary */}
        <section className="md:col-span-3 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D97E80]">Appointment Summary</h3>
          <dl className="rounded-2xl border border-[#E8DFD5] bg-[#FDFBF9] px-5">
            <Row label="Treatment">{booking.treatment}</Row>
            <Row label="Date">{formatDate(booking.date)}</Row>
            <Row label="Time">{booking.time}</Row>
            {booking.duration && <Row label="Duration">{booking.duration}</Row>}
            <Row label="Price">{booking.price}</Row>
            <Row label="Deposit">£10 (taken off on the day)</Row>
            <Row label="Name">{booking.name}</Row>
            <Row label="Phone">{booking.phone}</Row>
            <Row label="Email">{booking.email}</Row>
          </dl>
        </section>

        {/* What happens next */}
        <section className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D97E80]">What Happens Next</h3>
          <ol className="space-y-5">
            {NEXT_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-3.5">
                <span
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? "bg-[#EC9C9D] text-white" : "bg-[#FBEDEC] text-[#D97E80]"
                  }`}
                >
                  {i === 0 ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1C1917]">{step.title}</p>
                  <p className="text-sm text-[#57534E] leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-2xl bg-[#FBEDEC]/60 border border-[#EC9C9D]/25 p-4 space-y-1">
            <p className="text-sm font-semibold text-[#1C1917]">Questions?</p>
            <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-[#57534E] hover:text-[#D97E80]">
              <Phone className="w-3.5 h-3.5 text-[#D97E80]" />
              {CLINIC_INFO.phoneDisplay}
            </a>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-10">
        <a
          href={`${CLINIC_INFO.socials.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:brightness-105 transition-all"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Message on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-[#44403C] bg-white border border-[#E8DFD5] hover:border-[#EC9C9D] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Book Another
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-[#44403C] hover:text-[#D97E80] transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
});
