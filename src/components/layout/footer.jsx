"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { CLINIC_INFO } from "@/constants/clinic-data";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/shared/social-icons";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTreatmentsClick = (e) => {
    if (pathname === "/treatments") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 bg-[#1C1917] text-[#FAF8F5] border-t border-[#292524] mt-24">
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Ethos */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-800 bg-white flex items-center justify-center shrink-0">
                <img src="/logo.jpeg" alt="Luminous Skin Clinic" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight text-white leading-tight">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-xs text-[#EC9C9D] font-medium tracking-tight mt-1">
                  🌸~Luminosity is the essence of BEAUT🌸
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Personalised clinical skin, facial and wellness treatments designed around your unique skin goals, comfort and long-term confidence.
            </p>

            {/* Social Channels */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EAA59E] block">
                Connect & Follow
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={CLINIC_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#25D366]/60 text-neutral-400 hover:text-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={CLINIC_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  title="Instagram"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#E1306C]/60 text-neutral-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 flex items-center justify-center transition-all duration-200"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={CLINIC_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on TikTok"
                  title="TikTok"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-white/60 text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all duration-200"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={CLINIC_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Facebook"
                  title="Facebook"
                  className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#1877F2]/60 text-neutral-400 hover:text-[#1877F2] hover:bg-[#1877F2]/10 flex items-center justify-center transition-all duration-200"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#F0A5A2] hover:text-white transition-colors cursor-pointer"
              >
                <span>Reserve Appointment</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Treatments Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAA59E]">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="hover:text-[#F0A5A2] transition-colors cursor-pointer block"
                >
                  Rejuvenating Facial
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="hover:text-[#F0A5A2] transition-colors cursor-pointer block"
                >
                  Dermaplaning
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="hover:text-[#F0A5A2] transition-colors cursor-pointer block"
                >
                  Microneedling
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="hover:text-[#F0A5A2] transition-colors cursor-pointer block"
                >
                  LED Light Treatment
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="hover:text-[#F0A5A2] transition-colors cursor-pointer block"
                >
                  Microdermabrasion
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/treatments"
                  scroll={true}
                  onClick={handleTreatmentsClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#EC9C9D] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>View All Treatments</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAA59E]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-[#F0A5A2] transition-colors cursor-pointer block">
                  About Clinic
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F0A5A2] transition-colors cursor-pointer block">
                  Treatment Pricing
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[#F0A5A2] transition-colors cursor-pointer block">
                  Client Results
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F0A5A2] transition-colors cursor-pointer block">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Location & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAA59E]">
              Leeds Clinic
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAA59E] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#EAA59E] shrink-0 mt-0.5" />
                <a
                  href={CLINIC_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F0A5A2] transition-colors"
                >
                  {CLINIC_INFO.phone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#EAA59E] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-[#F0A5A2] transition-colors"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#EAA59E] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Fri: 9:30 AM - 6:30 PM</p>
                  <p>Sat: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <a
              href={CLINIC_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={CLINIC_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors"
            >
              Instagram
            </a>
            <a
              href={CLINIC_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a
              href={CLINIC_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2] transition-colors"
            >
              Facebook
            </a>
            <Link href="/contact" className="hover:text-white transition-colors cursor-pointer">
              Bookings & Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
