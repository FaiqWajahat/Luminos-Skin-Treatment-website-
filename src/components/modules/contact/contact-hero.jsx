"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Sparkles, MapPin, MessageSquare } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function ContactHero() {
  return (
    <section className="relative min-h-[48vh] lg:min-h-[52vh] py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      {/* ── Background Layer with Luxury Aesthetic & Image Slot ── */}
      <div className="absolute inset-0 z-0 bg-[#141211]">
        <Image
          src="/contactpage-hero.png"
          alt="Luminous Skin Clinic Leeds Contact Sanctuary"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />

        {/* Ambient Warm Luxury Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#EC9C9D]/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-[#D97E80]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Professional Multi-Stop Dark Scrim Overlay for ultra-sharp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100F]/95 via-[#141211]/70 to-[#171514]/55 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center,transparent_0%,rgba(18,16,15,0.7)_100%]" />

        {/* Delicate corner luxury wireframe marks */}
        <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#F0A5A2]/40" />
        <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#F0A5A2]/40" />
        <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#F0A5A2]/40" />
        <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#F0A5A2]/40" />
      </div>

      {/* ── Foreground Centralized Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="space-y-6"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F0A5A2] bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F0A5A2]" />
            <span>Clinic Concierge · Central Leeds</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight leading-[1.12] text-white">
            Connect With Our Team. <br className="hidden sm:inline" />
            <em className="font-serif italic font-normal text-[#F0A5A2]">
              At Your Own Pace.
            </em>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto font-normal">
            Whether you seek treatment advice, wish to speak directly with our clinicians, or are planning your visit to our central Leeds sanctuary, we are here with unhurried care.
          </p>

          {/* Compact Actions */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>

            <a
              href="https://wa.me/447700900123?text=Hello%20Luminous%20Clinic,%20I%20would%20like%20to%20ask%20a%20quick%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

          {/* Trust Points */}
          <div className="pt-6 border-t border-white/10 max-w-lg mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span className="text-neutral-300">100% Confidential Care</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F0A5A2]" />
              <span className="text-neutral-300">Central Leeds LS1</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
