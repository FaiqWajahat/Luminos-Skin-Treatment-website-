"use client";

import Link from "next/link";
import { CLINIC_INFO } from "@/constants/clinic-data";
import { LEEDS_TRANSIT_INFO } from "@/constants/contact-data";
import {
  MapPin,
  Clock,
  Train,
  Car,
  Bus,
  Accessibility,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";

const TRANSIT_ICONS = {
  Train,
  "Car & Parking": Car,
  Bus,
  Accessibility,
};

export function ClinicLocation() {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Centralized Section Header */}
        <FadeIn delay={0.05}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#EC9C9D]/10 text-[#EC9C9D] border border-[#EC9C9D]/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Visiting</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              Finding Our Central Leeds Sanctuary
            </h2>
            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              Situated in the heart of central Leeds LS1, our clinic offers a quiet, private sanctuary with effortless transit and secure parking.
            </p>
          </div>
        </FadeIn>

        {/* Map & Opening Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Google Map Embed Card */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.1} className="h-full">
              <div className="luxury-card rounded-3xl overflow-hidden bg-white border border-[#E8DFD5] shadow-sm flex flex-col h-full min-h-[380px] relative">
                {/* Map Header Bar */}
                <div className="p-4 bg-white border-b border-[#E8DFD5] flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-serif font-bold text-[#1C1917]">{CLINIC_INFO.name}</p>
                      <p className="text-[11px] text-[#78716C]">{CLINIC_INFO.address}</p>
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com/?q=Central+Leeds+LS1+4DY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1C1917] text-white hover:bg-black transition-colors"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3 text-[#EC9C9D]" />
                  </a>
                </div>

                {/* Google Map Iframe Embed */}
                <div className="relative flex-1 w-full min-h-[300px] bg-stone-100 overflow-hidden">
                  <iframe
                    title="Luminous Skin Clinic Leeds Location Map"
                    src="https://maps.google.com/maps?q=Park%20Row%20Leeds%20LS1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 absolute inset-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Hours & Direct Contact */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.15} className="h-full">
              <div className="luxury-card rounded-3xl p-6 sm:p-8 bg-white border border-[#E8DFD5] shadow-sm h-full flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                        Clinic Opening Hours
                      </h3>
                      <p className="text-xs text-[#78716C] mt-0.5">
                        Strictly 1-to-1 private appointments
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open Today
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    {CLINIC_INFO.hours.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-dashed border-[#E8DFD5]/70 last:border-none"
                      >
                        <span className="text-[#57534E] font-medium">{h.days}</span>
                        <span className="text-[#1C1917] font-semibold font-mono text-xs">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Helpline */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] space-y-2">
                  <p className="text-xs font-semibold text-[#1C1917]">Direct Clinic Concierge</p>
                  <div className="space-y-1.5 text-xs text-[#78716C]">
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#EC9C9D]" />
                      <span className="font-mono text-[#1C1917]">{CLINIC_INFO.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#EC9C9D]" />
                      <span>{CLINIC_INFO.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Centralized Transit & Parking Guidance */}
        <div className="space-y-8 pt-4">
          <FadeIn delay={0.1}>
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                Transit & Parking Guides
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C]">
                Effortless travel connections from anywhere across Yorkshire and Leeds City Centre.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEEDS_TRANSIT_INFO.map((item, idx) => {
              const IconComp = TRANSIT_ICONS[item.mode] || MapPin;
              return (
                <StaggerItem key={idx}>
                  <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] shadow-2xs space-y-2.5 h-full flex flex-col justify-between hover:border-[#EC9C9D]/50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1C1917]">
                          <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D]">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span>{item.title}</span>
                        </div>
                      </div>
                      <span className="inline-block text-[11px] font-semibold text-[#EC9C9D] bg-[#EC9C9D]/10 px-2 py-0.5 rounded-md border border-[#EC9C9D]/20">
                        {item.duration}
                      </span>
                      <p className="text-xs text-[#57534E] leading-relaxed pt-1">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
