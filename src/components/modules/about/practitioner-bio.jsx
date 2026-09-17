"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const CREDENTIALS = [
  {
    icon: Award,
    title: "Fully Certified",
    desc: "Advanced clinical dermaplaning, microneedling & infection control certified.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Comprehensive UK medical aesthetic malpractice & clinical indemnity cover.",
  },
  {
    icon: Heart,
    title: "Client-Led Pacing",
    desc: "Every procedure is personalized and adjusted to your comfort threshold.",
  },
];

export function PractitionerBio() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F0EB]/60 border-y border-[#E8DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#F0A5A2]/25 to-transparent blur-xl -z-10" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5]">
                <Image
                  src="/about-founder.png"
                  alt="Lead Aesthetic Practitioner - Luminous Skin Clinic Leeds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8DFD5]/80 shadow-md">
                  <p className="text-xs font-semibold text-[#1C1917]">Clinical Skin Specialist</p>
                  <p className="text-[10px] text-[#78716C]">Lead Practitioner · Luminous Leeds</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy & Credentials Column */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#EC9C9D] bg-[#EC9C9D]/10 border border-[#EC9C9D]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#EC9C9D]" />
                <span>Practitioner In Residence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] leading-tight">
                Dedicated to clinical excellence and genuine, attentive care.
              </h2>

              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                With advanced certifications in clinical dermaplaning, automated microneedling collagen induction, and medical-grade wavelength phototherapy, every appointment is delivered with the highest standards of safety, sterile protocols, and aesthetic nuance.
              </p>

              <p className="text-sm text-[#78716C] leading-relaxed">
                We believe that skin transformation is never one-size-fits-all. By dedicating our practice exclusively to private one-to-one bookings, you receive unhurried diagnostics and treatments specifically customized to your dermal needs.
              </p>
            </motion.div>

            {/* Credentials 3-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {CREDENTIALS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease }}
                    whileHover={{ y: -3 }}
                    className="p-5 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs space-y-2.5 hover:border-[#EAA59E] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#EC9C9D]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-[#78716C] leading-relaxed">
                      {c.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
