"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { SectionHeader } from "@/components/shared/section-header";
import { Sparkles, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: "01",
    title: "Listen first, diagnose thoroughly",
    desc: "Every face tells a unique biological story. We assess lifestyle, current homecare habits, and dermal barrier integrity before suggesting any treatment.",
  },
  {
    num: "02",
    title: "Transparent, evidence-based guidance",
    desc: "We explain exactly how clinical modalities and active peptides interact with your skin matrix. No marketing gimmicks—pure dermatological clarity.",
  },
  {
    num: "03",
    title: "Sustainable, progressive skin health",
    desc: "We reject harsh, aggressive over-exfoliation and transient social trends. Our focus is reinforcing your natural lipid barrier for enduring radiance.",
  },
];

export function AboutPhilosophy() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease }}
              className="space-y-4"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#EC9C9D]">
                Our Clinical Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-[#1C1917] leading-[1.18]">
                Professional skincare designed to feel welcoming, never intimidating.
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Traditional clinics can often feel cold, rushed, or pressured. At Luminous, we created a peaceful sanctuary in central Leeds where clinical precision meets restorative, unhurried comfort.
              </p>
            </motion.div>

            {/* Philosophy Steps */}
            <div className="space-y-3.5">
              {steps.map((s, idx) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease }}
                  className="luxury-card p-5 rounded-xl space-y-1.5 hover:border-[#EAA59E] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-sm font-bold text-[#EC9C9D]">
                      {s.num}
                    </span>
                    <h3 className="text-sm font-semibold text-[#1C1917] tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed pl-6">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-6 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F0A5A2]/20 to-transparent blur-2xl -z-10" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5]">
                <Image
                  src="/aboutpage-clinicalphilosophy.png"
                  alt="Luminous Leeds Treatment Sanctuary Suite & Atmosphere"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8DFD5]/80 shadow-md">
                  <p className="text-xs font-semibold text-[#1C1917]">Private Treatment Suite</p>
                  <p className="text-[10px] text-[#78716C]">Central Leeds · Unhurried 1:1 Clinical Sanctuary</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
