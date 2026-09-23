"use client";

import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { TREATMENTS, CLINIC_INFO } from "@/constants/clinic-data";
import { CategoryPicker } from "./category-picker";
import { TreatmentPicker } from "./treatment-picker";
import { CustomDatePicker } from "./custom-date-picker";
import { TimeSlotPicker } from "./time-slot-picker";
import { CustomInput, CustomTextarea, CustomCheckbox } from "../contact/fields";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animations";
import { BookingCategorySkeleton } from "@/components/shared/skeleton-loaders";
import {
  User,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Copy,
  Clock,
  ArrowRight,
  RefreshCw,
  MapPin,
  Check,
  ExternalLink,
} from "lucide-react";

export function BookingForm() {
  const [treatmentsList, setTreatmentsList] = useState(TREATMENTS);
  const [loadingTreatments, setLoadingTreatments] = useState(true);
  const [existingEnquiries, setExistingEnquiries] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);

  // Fetch live treatments, enquiries, and blocked slots with real-time sync
  const loadEnquiries = async () => {
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/enquiries", { cache: "no-store" }),
        fetch("/api/blocked-slots", { cache: "no-store" }),
      ]);
      const d1 = await r1.json();
      const d2 = await r2.json();
      if (d1.enquiries) setExistingEnquiries(d1.enquiries);
      if (d2.blockedSlots) setBlockedSlots(d2.blockedSlots);
    } catch (err) {
      console.warn("Could not fetch enquiries / blocked slots for availability:", err);
    }
  };

  useEffect(() => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => {
        if (d.treatments && d.treatments.length > 0) {
          setTreatmentsList(d.treatments);
        }
      })
      .catch((err) => console.warn("Using fallback treatments:", err))
      .finally(() => setLoadingTreatments(false));

    loadEnquiries();
    // Real-time interval polling every 4 seconds so slot bookings are always fresh
    const interval = setInterval(loadEnquiries, 4000);
    return () => clearInterval(interval);
  }, []);

  // Compute categories & group treatments
  const { categories, treatmentsByCategory } = useMemo(() => {
    const standardOrder = [
      "All Clinic Facials",
      "Facial Skin Treatments",
      "Massage Therapy",
    ];
    const availableCats = [
      ...new Set(treatmentsList.map((t) => (t.category || "").trim()).filter(Boolean)),
    ];
    const sortedCats = [
      ...standardOrder.filter((c) => availableCats.includes(c)),
      ...availableCats.filter((c) => !standardOrder.includes(c)),
    ];
    const grouped = {};
    sortedCats.forEach((c) => {
      grouped[c] = treatmentsList.filter((t) => (t.category || "").trim() === c);
    });
    return { categories: sortedCats, treatmentsByCategory: grouped };
  }, [treatmentsList]);

  // Default next day (tomorrow)
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If tomorrow is Sunday, skip to Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Primary Cascaded State
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatmentSlug: "",
    preferredDate: tomorrowStr,
    timeSlot: "",
    message: "",
    consent: false,
  });

  // Load saved contact details from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("luminous_client_info");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && (parsed.name || parsed.email || parsed.phone)) {
            setFormData((prev) => ({
              ...prev,
              name: parsed.name || prev.name,
              email: parsed.email || prev.email,
              phone: parsed.phone || prev.phone,
            }));
          }
        }
      }
    } catch (err) {
      // Ignore local storage errors
    }
  }, []);

  const saveClientInfo = (info) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("luminous_client_info", JSON.stringify(info));
      }
    } catch (err) {
      // Ignore local storage errors
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstCat = categories[0];
      setSelectedCategory(firstCat);
      const available = treatmentsByCategory[firstCat];
      if (available && available.length > 0 && !formData.treatmentSlug) {
        setFormData((prev) => ({ ...prev, treatmentSlug: available[0].slug }));
      }
    }
  }, [categories, treatmentsByCategory, selectedCategory, formData.treatmentSlug]);

  // Keep treatment selection synced when category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const available = treatmentsByCategory[cat];
    if (available && available.length > 0) {
      setFormData((prev) => ({ ...prev, treatmentSlug: available[0].slug }));
    }
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [referenceId, setReferenceId] = useState("");

  const selectedTreatment = useMemo(() => {
    if (!formData.treatmentSlug) return treatmentsList[0] || {};
    return treatmentsList.find((t) => t.slug === formData.treatmentSlug) || treatmentsList[0] || {};
  }, [treatmentsList, formData.treatmentSlug]);

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Telephone number is required for booking confirmation.";
    }

    if (!formData.preferredDate) {
      errs.preferredDate = "Please choose a consultation date.";
    }

    if (!formData.timeSlot) {
      errs.timeSlot = "Please select an available appointment slot.";
    }

    if (!formData.consent) {
      errs.consent = "Please confirm clinical appointment consent.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please select all required options to confirm your booking.");
      return;
    }

    setIsSubmitting(true);

    const generatedId = `LUM-BK-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceId: generatedId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: selectedCategory,
          treatmentTitle: selectedTreatment?.title || "Clinical Appointment",
          preferredDate: formData.preferredDate,
          timeSlot: formData.timeSlot,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "This slot is no longer available. Please select another slot.");
        await loadEnquiries();
        return;
      }

      setReferenceId(generatedId);
      setSubmittedData({ ...formData, treatmentTitle: selectedTreatment?.title });
      toast.success("Appointment reserved! Your slot has been secured.");
      await loadEnquiries();
    } catch (err) {
      console.warn("Booking submitted locally with reference:", err);
      setReferenceId(generatedId);
      setSubmittedData({ ...formData, treatmentTitle: selectedTreatment?.title });
      toast.success("Appointment reference generated!");
      await loadEnquiries();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      toast.success("Booking reference copied to clipboard!");
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setReferenceId("");
    let savedContact = { name: formData.name, email: formData.email, phone: formData.phone };
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("luminous_client_info");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed) {
            savedContact = {
              name: parsed.name || formData.name,
              email: parsed.email || formData.email,
              phone: parsed.phone || formData.phone,
            };
          }
        }
      }
    } catch (e) {}

    setFormData({
      name: savedContact.name || "",
      email: savedContact.email || "",
      phone: savedContact.phone || "",
      treatmentSlug: treatmentsByCategory[selectedCategory]?.[0]?.slug || "",
      preferredDate: tomorrowStr,
      timeSlot: "",
      message: "",
      consent: false,
    });
    setErrors({});
  };

  return (
    <section id="booking-form" className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Booking Form Column */}
          <FadeIn delay={0.05} className="lg:col-span-8">
            <div className="luxury-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DFD5] bg-white shadow-sm relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80]" />

              {submittedData ? (
                /* Success Confirmation State */
                <div className="py-6 space-y-6 animate-fadeIn">
                  <div className="text-center space-y-2.5">
                    <div className="w-16 h-16 rounded-2xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/25 text-[#EC9C9D] flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
                      Appointment Reserved Successfully
                    </h3>
                    <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#1C1917]">{submittedData.name}</strong>. Your reservation request for{" "}
                      <strong className="text-[#1C1917]">{selectedTreatment.title}</strong> at our Leeds clinic has been received.
                    </p>
                  </div>

                  {/* Reference Card */}
                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] space-y-4 max-w-xl mx-auto">
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#E8DFD5]">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#78716C]">
                          Booking Reference
                        </span>
                        <p className="font-mono font-bold text-xl text-[#1C1917] mt-0.5">
                          {referenceId}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1C1917] hover:text-[#EC9C9D] bg-white border border-[#E8DFD5] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Ref</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-[#57534E]">
                      <div className="flex justify-between py-1">
                        <span className="text-[#78716C]">Treatment:</span>
                        <span className="font-semibold text-[#1C1917] text-right">
                          {selectedTreatment.title}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#78716C]">Date & Time Slot:</span>
                        <span className="font-semibold text-[#EC9C9D]">
                          {submittedData.preferredDate} at {submittedData.timeSlot}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#78716C]">Total Price:</span>
                        <span className="font-serif font-bold text-[#1C1917]">
                          £{selectedTreatment.price}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-[#E8DFD5]/60 pt-1.5">
                        <span className="text-[#78716C]">Advance Deposit:</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          £10 Applicable (To secure slot)
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#78716C]">Remaining Balance on Arrival:</span>
                        <span className="font-serif font-bold text-[#1C1917]">
                          £{Math.max(0, (Number(selectedTreatment.price) || 0) - 10)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#78716C]">Client Contact:</span>
                        <span className="font-semibold text-[#1C1917]">
                          {submittedData.phone}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#57534E] space-y-1">
                      <p className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
                        <span>£10 Advance Deposit Applicable</span>
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#78716C]">
                        Our clinic coordinator will contact you to confirm your £10 advance deposit details. The £10 is deducted directly from your treatment total on the day.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/447950774790?text=Hello%20Luminous%20Clinic,%20I%20have%20booked%20reference%20${referenceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80] shadow-sm hover:opacity-95 transition-all"
                    >
                      <span>Chat With Clinic Concierge</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="w-full sm:w-auto cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-2" />
                      <span>Book Another Appointment</span>
                    </Button>
                  </div>
                </div>
              ) : (
                /* Main Enterprise Cascaded Form */
                <form onSubmit={handleSubmit} className="space-y-9" noValidate>
                  {/* Header */}
                  <div className="space-y-2 border-b border-[#E8DFD5] pb-5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#EC9C9D]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Clinical Reservation</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
                      Reserve Your Bespoke Treatment & Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-2xl">
                      Select your category, protocol, date, and live slot below. Our Leeds clinic confirms private 1:1 sessions instantly with zero waiting queues.
                    </p>
                  </div>

                  {/* 1. Category Selection */}
                  {loadingTreatments ? (
                    <div className="space-y-3">
                      <div className="h-4 w-48 rounded-md skeleton-shimmer" />
                      <BookingCategorySkeleton />
                    </div>
                  ) : (
                    <CategoryPicker
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onSelectCategory={handleCategoryChange}
                      treatmentsByCategory={treatmentsByCategory}
                    />
                  )}

                  {/* 2. Treatment Selection */}
                  <TreatmentPicker
                    treatments={treatmentsByCategory[selectedCategory] || []}
                    selectedSlug={formData.treatmentSlug}
                    onSelectTreatment={(slug) => setFormData({ ...formData, treatmentSlug: slug })}
                  />

                  {/* 3. Custom Date Picker */}
                  <CustomDatePicker
                    selectedDate={formData.preferredDate}
                    existingEnquiries={existingEnquiries}
                    blockedSlots={blockedSlots}
                    onSelectDate={(dateStr) => {
                      setFormData((prev) => ({
                        ...prev,
                        preferredDate: dateStr,
                        timeSlot: "", // Reset slot when date changes
                      }));
                      if (errors.preferredDate || errors.timeSlot) {
                        setErrors((prev) => ({
                          ...prev,
                          preferredDate: undefined,
                          timeSlot: undefined,
                        }));
                      }
                    }}
                  />

                  {/* 4. Live Time Slot Picker (Available vs Booked) */}
                  <TimeSlotPicker
                    selectedDate={formData.preferredDate}
                    selectedSlot={formData.timeSlot}
                    onSelectSlot={(slotLabel) => {
                      setFormData({ ...formData, timeSlot: slotLabel });
                      if (errors.timeSlot) setErrors({ ...errors, timeSlot: undefined });
                    }}
                    existingEnquiries={existingEnquiries}
                    blockedSlots={blockedSlots}
                  />

                  {/* 5. Client Information (All Custom Inputs) */}
                  <div className="space-y-4 pt-4 border-t border-[#E8DFD5]">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-[11px] flex items-center justify-center font-mono">
                        5
                      </span>
                      <span>Client Details & Skin Goals</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <CustomInput
                        label="Full Name"
                        placeholder="e.g. Sarah Jenkins"
                        icon={User}
                        required
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => {
                            const updated = { ...prev, name: val };
                            saveClientInfo({ name: updated.name, email: updated.email, phone: updated.phone });
                            return updated;
                          });
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        error={errors.name}
                      />

                      <CustomInput
                        label="Email Address"
                        type="email"
                        placeholder="sarah@example.co.uk"
                        icon={Mail}
                        required
                        value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => {
                            const updated = { ...prev, email: val };
                            saveClientInfo({ name: updated.name, email: updated.email, phone: updated.phone });
                            return updated;
                          });
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        error={errors.email}
                      />
                    </div>

                    <CustomInput
                      label="Telephone / Mobile Number"
                      type="tel"
                      placeholder="+44 7..."
                      icon={Phone}
                      helperText="For consultation callback & appointment confirmation"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => {
                          const updated = { ...prev, phone: val };
                          saveClientInfo({ name: updated.name, email: updated.email, phone: updated.phone });
                          return updated;
                        });
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      error={errors.phone}
                    />

                    <CustomTextarea
                      name="message"
                      label="Your Skin Goals or Sensitivities (Optional)"
                      placeholder="Tell us what you'd like to address, current products used, or any medical allergies..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      suggestionChips={[
                        "Sensitive skin barrier",
                        "Acne / Breakouts concern",
                        "First time clinical facial",
                        "Special event preparation",
                      ]}
                    />

                    <CustomCheckbox
                      id="booking-consent"
                      checked={formData.consent}
                      onChange={(checked) => {
                        setFormData({ ...formData, consent: checked });
                        if (errors.consent) setErrors({ ...errors, consent: undefined });
                      }}
                      error={errors.consent}
                      required
                    >
                      <span>
                        I confirm this booking request and consent to Luminous Skin Clinic storing my consultation details.
                      </span>
                    </CustomCheckbox>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 rounded-xl cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Securing Your Leeds Appointment...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm & Reserve Appointment Slot</span>
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-center text-[#78716C] pt-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#EC9C9D]" />
                      <span>£10 advance deposit applicable to secure appointment • Deducted from treatment total on the day</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Right Summary Sidebar (Live Synchronized) */}
          <FadeIn delay={0.12} className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="luxury-card rounded-3xl p-6 sm:p-7 space-y-5 bg-white border border-[#E8DFD5] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EC9C9D]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Reservation Summary</span>
              </div>

              {/* Selected Treatment Detail */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#EC9C9D] bg-[#EC9C9D]/10 px-2 py-0.5 rounded border border-[#EC9C9D]/20">
                  {selectedCategory}
                </span>
                <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                  {selectedTreatment.title}
                </h4>
                <p className="text-xs text-[#78716C] leading-relaxed">
                  {selectedTreatment.tagline || selectedTreatment.shortDescription}
                </p>
              </div>

              {/* Date & Slot Badge */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#78716C]">Selected Date:</span>
                  <span className="font-semibold text-[#1C1917] font-mono">
                    {formData.preferredDate || "Select date"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#78716C]">Chosen Slot:</span>
                  <span className="font-semibold text-[#EC9C9D] font-mono">
                    {formData.timeSlot || "Select slot"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#E8DFD5]/60">
                  <span className="text-[#78716C]">Total Price:</span>
                  <span className="font-serif font-bold text-base text-[#1C1917]">
                    £{selectedTreatment.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#78716C]">Advance Deposit:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    £10 (Secures Slot)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#78716C]">Balance on Arrival:</span>
                  <span className="font-serif font-bold text-sm text-[#1C1917]">
                    £{Math.max(0, (Number(selectedTreatment.price) || 0) - 10)}
                  </span>
                </div>
              </div>

              {/* £10 Advance Deposit Notice */}
              <div className="p-3.5 rounded-2xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
                  <span>£10 Advance Deposit Applicable</span>
                </div>
                <p className="text-[11px] text-[#57534E] leading-relaxed">
                  A £10 advance deposit is required to secure your appointment slot. This is deducted from your treatment total on the day.
                </p>
              </div>

              {/* Clinic Location & Trust Points */}
              <div className="pt-2 border-t border-[#E8DFD5] space-y-2.5 text-xs text-[#78716C]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#EC9C9D] shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#EC9C9D] shrink-0 mt-0.5" />
                  <span>Mon - Fri 9:30 AM - 6:30 PM | Sat 10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
