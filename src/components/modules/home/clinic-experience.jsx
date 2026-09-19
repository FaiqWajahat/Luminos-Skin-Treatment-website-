"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Clock, MapPin, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const EXPERIENCE_HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "1:1 Dedicated Private Suite",
    desc: "No crowded waiting areas or overlapping appointments. Your session is completely private, peaceful, and unhurried.",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Sterilization",
    desc: "Autoclave equipment sterilization and single-use consumables opened exclusively in your presence for ultimate safety.",
  },
  {
    icon: CheckCircle2,
    title: "Bespoke Dermal Formulations",
    desc: "Every protocol is custom-blended with medical-grade actives calibrated precisely to your skin barrier and goals.",
  },
  {
    icon: Clock,
    title: "Visible Results from Session 1",
    desc: "Holistic, science-backed non-invasive therapies designed to deliver immediate radiance with zero harsh downtime.",
  },
];

export function ClinicExperience() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#EC9C9D]/10 blur-[120px] -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Content & Features */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EC9C9D]/10 border border-[#EC9C9D]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#EC9C9D]">
                <Sparkles className="w-3.5 h-3.5 text-[#EC9C9D]" />
                <span>The Clinic Experience · Leeds</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#1C1917] leading-[1.18]">
                A Calm, Private Sanctuary for Restorative Skin Health
              </h2>

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Step away from the rush of everyday life. Located near Elland Road Stadium in Beeston, Leeds LS11, our dedicated clinic suite provides an unhurried, one-to-one clinical setting where advanced aesthetic science meets soothing sensory relaxation.
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {EXPERIENCE_HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease }}
                    className="p-4 rounded-xl bg-white border border-[#E8DFD5] hover:border-[#EAA59E] hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#1C1917]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#78716C] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#292524] shadow-sm transition-all duration-200"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#1C1917] bg-white border border-[#E8DFD5] hover:border-[#EC9C9D] hover:bg-[#FAF8F5] transition-all duration-200"
              >
                <span>Explore Treatments</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft glow halo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#EC9C9D]/25 via-[#E8DFD5]/40 to-transparent blur-2xl -z-10" />

              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5]">
                <Image
                  src="/about-02.jpeg"
                  alt="Luminous Skin Clinic Treatment Suite in Beeston, Leeds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={false}
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                />
                
                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8DFD5]/80 shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EC9C9D]" />
                    <span className="text-[11px] font-medium text-[#1C1917]">Beeston, Leeds LS11</span>
                  </div>
                  <span className="bg-[#1C1917]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full">
                    Private Suite
                  </span>
                </div>

                {/* Bottom Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8DFD5]/90 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D] shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1C1917]">
                        Near Elland Road Stadium
                      </p>
                      <p className="text-[11px] text-[#78716C]">
                        Discreet, by appointment only · 1:1 focused care
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
