"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const CREDENTIALS = [
  {
    icon: Award,
    title: "5+ Years Experience",
    desc: "Certified Beauty Therapist & recognized as one of the leading facialists in Leeds.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Advanced Care",
    desc: "Targeted, evidence-backed and non-invasive treatments for naturally radiant skin.",
  },
  {
    icon: Heart,
    title: "Calm, Kind & Friendly",
    desc: "An attentive, welcoming atmosphere where every client feels valued and cared for.",
  },
];

export function PractitionerBio({ data = {} }) {
  const {
    founderImage = "/about-founder.png",
    founderName = "Madiha Naz (Madi)",
    founderTitle = "Founder & Owner · Certified Beauty Therapist & Leeds Lead Facialist",
    founderBio = "“I’m Madi, the founder and owner of Luminous Skin business — a sanctuary where beauty, science, and serenity come together. With over five years of experience as a certified Beauty Therapist and one of the best facialists in Leeds, my passion lies in helping clients achieve naturally radiant, healthy skin through safe, advanced, and effective treatments.”\n\n“Known for my calm, kind, and friendly nature, I believe that skincare is more than a treatment — it’s an experience of care, confidence, and well-being. Every session is thoughtfully designed to deliver visible results while providing a moment of pure relaxation.”\n\n“At Luminous Skin Clinic, my goal is to create a welcoming space where every client feels valued, cared for, and leaves glowing — inside and out.”"
  } = data;

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
                {founderImage?.startsWith("data:") ? (
                  <img
                    src={founderImage}
                    alt={`${founderName} - ${founderTitle}`}
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                ) : (
                  <Image
                    src={founderImage || "/about-founder.png"}
                    alt={`${founderName} - ${founderTitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-[#E8DFD5]/80 shadow-md">
                  <p className="text-xs sm:text-sm font-semibold text-[#1C1917]">{founderName}</p>
                  <p className="text-[11px] text-[#78716C] line-clamp-1" title={founderTitle}>{founderTitle}</p>
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
                <span>Founder & Lead Facialist</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] leading-tight">
                  Meet {founderName.split(' ')[0]}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#EC9C9D] mt-1 tracking-wide">
                  {founderTitle}
                </p>
              </div>

              <div className="space-y-3.5 text-sm sm:text-[15px] text-[#57534E] leading-relaxed">
                {founderBio.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
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
