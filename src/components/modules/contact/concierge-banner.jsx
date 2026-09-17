"use client";

import Link from "next/link";
import { Calendar, MessageSquare, ArrowRight, ShieldCheck, Sparkles, Clock, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

export function ConciergeBanner() {
  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.05}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-white via-[#FCF9F7] to-[#FBF3F0] border border-[#EC9C9D]/30 shadow-lg shadow-[#EC9C9D]/5 relative overflow-hidden">
            {/* Subtle soft ambient pink blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EC9C9D]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#F0A5A2]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Information & Reassurance */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#EC9C9D]/10 text-[#EC9C9D] border border-[#EC9C9D]/20">
                  <Clock className="w-3.5 h-3.5 text-[#EC9C9D]" />
                  <span>Instant Availability & Booking</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
                  Reserve your 1:1 consultation <br className="hidden sm:inline" />
                  <span className="font-serif italic font-normal text-[#EC9C9D]">online in seconds.</span>
                </h2>

                <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
                  Select your treatment and appointment slot in real time. Our Leeds clinic concierge confirms your booking instantly with zero waiting queues and dedicated 1-on-1 practitioner time.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#78716C]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#EC9C9D]" />
                    <span className="text-[#1C1917] font-medium">No upfront cancellation fees</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#D7CCC8] hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#EC9C9D]" />
                    <span className="text-[#1C1917] font-medium">Instant calendar reference</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#D7CCC8] hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#EC9C9D]" />
                    <span className="text-[#1C1917] font-medium">Private LS1 suite</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-touch actions */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/booking"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] text-white shadow-md hover:shadow-xl hover:brightness-105 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold leading-tight">Book Appointment Online</p>
                      <p className="text-xs text-white/80 mt-0.5">Select service, date & practitioner</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://tr.ee/zK8bgJAg4I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DFD5] hover:border-[#EC9C9D]/50 text-[#1C1917] hover:bg-[#FAF8F5] shadow-xs transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EC9C9D]/10 text-[#EC9C9D] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold leading-tight">WhatsApp Concierge</p>
                      <p className="text-xs text-[#78716C] mt-0.5">Direct chat with our clinic team</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#78716C] group-hover:text-[#EC9C9D] group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
