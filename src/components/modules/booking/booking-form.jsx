"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { CATALOG_TREATMENTS, CATEGORY_TITLES, formatTreatmentPrice } from "@/constants/treatment-catalog";
import { clinicNow } from "@/constants/booking-slots";
import { CustomDatePicker } from "./custom-date-picker";
import { TimeSlotPicker } from "./time-slot-picker";
import { CustomInput, CustomTextarea, CustomCheckbox } from "../contact/fields";
import { FadeIn } from "@/components/shared/animations";
import { BookingConfirmation } from "./booking-confirmation";
import { TreatmentSelect } from "./treatment-select";
import { User, Mail, Phone, Send } from "lucide-react";

const CONTACT_STORAGE_KEY = "luminous_client_info";

// Today at the clinic, or Monday when today is Sunday (closed)
function defaultDate() {
  const today = new Date(`${clinicNow().date}T00:00:00Z`);
  if (today.getUTCDay() === 0) today.setUTCDate(today.getUTCDate() + 1);
  return today.toISOString().slice(0, 10);
}

const emptyForm = () => ({ name: "", email: "", phone: "", treatmentSlug: "", preferredDate: defaultDate(), timeSlot: "", message: "", consent: false });

function Step({ number, title, error, children }) {
  return (
    <fieldset className="min-w-0 space-y-3">
      <legend className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1917]">
        <span className="w-6 h-6 rounded-full bg-[#FBEDEC] text-[#D97E80] text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        {title}
      </legend>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </fieldset>
  );
}

export function BookingForm({ initialTreatment = "" }) {
  const [treatments, setTreatments] = useState(CATALOG_TREATMENTS);
  const [existingEnquiries, setExistingEnquiries] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);
  const confirmationRef = useRef(null);

  const loadAvailability = async () => {
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/enquiries?scope=availability", { cache: "no-store" }),
        fetch("/api/blocked-slots", { cache: "no-store" }),
      ]);
      const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
      if (d1.enquiries) setExistingEnquiries(d1.enquiries);
      if (d2.blockedSlots) setBlockedSlots(d2.blockedSlots);
    } catch (err) {
      console.warn("Could not load availability:", err);
    }
  };

  useEffect(() => {
    fetch("/api/treatments?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => d.treatments?.length && setTreatments(d.treatments))
      .catch((err) => console.warn("Using fallback treatments:", err));

    // Saved contact details from a previous booking
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || "null");
        if (saved) setFormData((prev) => ({ ...prev, name: saved.name || "", email: saved.email || "", phone: saved.phone || "" }));
      } catch {}
      loadAvailability();
    });

    const interval = setInterval(loadAvailability, 30000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  // Treatments grouped in catalogue order for the dropdown
  const groups = useMemo(() => {
    const cats = [...new Set(treatments.map((t) => (t.category || "").trim()).filter(Boolean))];
    const ordered = [...CATEGORY_TITLES.filter((c) => cats.includes(c)), ...cats.filter((c) => !CATEGORY_TITLES.includes(c))];
    return ordered.map((category) => ({ category, items: treatments.filter((t) => (t.category || "").trim() === category) }));
  }, [treatments]);

  // /booking?treatment=slug preselects the treatment chosen on its detail page
  const treatmentSlug = formData.treatmentSlug || (treatments.some((t) => t.slug === initialTreatment) ? initialTreatment : "");
  const selectedTreatment = treatments.find((t) => t.slug === treatmentSlug);

  useEffect(() => {
    if (!booking) return;
    // Hero is gone, so start the confirmation from the top of the page
    const frame = requestAnimationFrame(() => {
      confirmationRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [booking]);

  const handleReset = () => {
    setBooking(null);
    setFormData((prev) => ({ ...emptyForm(), name: prev.name, email: prev.email, phone: prev.phone }));
    setErrors({});
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
  };

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!selectedTreatment) errs.treatmentSlug = "Please choose a treatment.";
    if (!formData.preferredDate) errs.preferredDate = "Please choose a date.";
    if (!formData.timeSlot) errs.timeSlot = "Please choose a time.";
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errs.email = "Please enter a valid email address.";
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(formData.phone.trim())) {
      errs.phone = "Please enter a valid phone number, e.g. 07950 774790.";
    }
    if (!formData.consent) errs.consent = "Please tick to confirm your booking request.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          treatmentSlug: selectedTreatment.slug,
          preferredDate: formData.preferredDate,
          timeSlot: formData.timeSlot,
          message: formData.message,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data.error || "We couldn't send your booking. Please try again.");
        // Slot taken or closed in the meantime: ask the client to pick again
        if (response.status === 409) {
          setFormData((prev) => ({ ...prev, timeSlot: "" }));
          setErrors((prev) => ({ ...prev, timeSlot: data.error }));
        }
        await loadAvailability();
        return;
      }

      try {
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }));
      } catch {}

      setBooking({
        referenceId: data.enquiry?.referenceId || "",
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        treatment: selectedTreatment.title,
        duration: selectedTreatment.duration,
        price: formatTreatmentPrice(selectedTreatment),
        date: formData.preferredDate,
        time: formData.timeSlot,
      });
      toast.success("Booking request sent!");
      await loadAvailability();
    } catch (err) {
      console.error("Booking request failed:", err);
      toast.error("We couldn't reach the clinic. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" className="py-14 lg:py-20 bg-[#FAF8F5]">
      <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DFD5] bg-white shadow-sm">
          {booking ? (
            <BookingConfirmation ref={confirmationRef} booking={booking} onReset={handleReset} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-9" noValidate>
              <div className="text-center space-y-2 pb-8 border-b border-[#E8DFD5]">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
                  Book Your Appointment
                </h1>
                <p className="text-sm text-[#57534E]">
                  Choose your treatment, date and time, and I’ll be in touch to confirm.
                </p>
              </div>

              <Step number={1} title="Choose your treatment" error={errors.treatmentSlug}>
                <TreatmentSelect
                  groups={groups}
                  value={treatmentSlug}
                  onChange={(slug) => update("treatmentSlug", slug)}
                  error={errors.treatmentSlug}
                />
              </Step>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-8">
              <Step number={2} title="Pick a date" error={errors.preferredDate}>
                <CustomDatePicker
                  selectedDate={formData.preferredDate}
                  existingEnquiries={existingEnquiries}
                  blockedSlots={blockedSlots}
                  onSelectDate={(date) => {
                    setFormData((prev) => ({ ...prev, preferredDate: date, timeSlot: "" }));
                    setErrors((prev) => ({ ...prev, preferredDate: undefined, timeSlot: undefined }));
                  }}
                />
              </Step>

              <Step number={3} title="Pick a time" error={errors.timeSlot}>
                {formData.preferredDate ? (
                  <TimeSlotPicker
                    selectedDate={formData.preferredDate}
                    selectedSlot={formData.timeSlot}
                    onSelectSlot={(slot) => update("timeSlot", slot)}
                    existingEnquiries={existingEnquiries}
                    blockedSlots={blockedSlots}
                  />
                ) : (
                  <p className="py-10 px-6 text-center text-sm text-[#78716C] rounded-2xl border border-dashed border-[#E8DFD5]">
                    Choose a date to see available times.
                  </p>
                )}
              </Step>
              </div>

              <Step number={4} title="Your details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInput
                    label="Full Name"
                    autoComplete="name"
                    icon={User}
                    required
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    error={errors.name}
                  />
                  <CustomInput
                    label="Phone Number"
                    autoComplete="tel"
                    type="tel"
                    icon={Phone}
                    required
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    error={errors.phone}
                  />
                </div>
                <CustomInput
                  label="Email Address"
                  autoComplete="email"
                  type="email"
                  icon={Mail}
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                />
                <CustomTextarea
                  name="message"
                  label="Anything I should know? (Optional)"
                  placeholder="Skin concerns, allergies or questions…"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => update("message", e.target.value)}
                />
                <CustomCheckbox
                  id="booking-consent"
                  checked={formData.consent}
                  onChange={(checked) => update("consent", checked)}
                  error={errors.consent}
                  required
                >
                  <span>I confirm this booking request and agree to Luminous Skin Clinic storing my details.</span>
                </CustomCheckbox>
              </Step>

              <div className="space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:shadow-lg hover:brightness-105 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending…" : "Request Appointment"}
                </button>
                <p className="text-xs text-center text-[#78716C]">
                  A £10 deposit secures your appointment and is taken off your treatment price on the day.
                </p>
              </div>
            </form>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
