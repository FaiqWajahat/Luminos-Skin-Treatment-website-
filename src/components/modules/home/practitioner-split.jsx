"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const values = [
  {
    title: "5+ Years Leeds Lead Facialist",
    desc: "Certified Beauty Therapist delivering safe, advanced, and effective treatments tailored to your skin.",
  },
  {
    title: "Calm, Kind & Friendly Experience",
    desc: "Skincare is more than a treatment — it’s an experience of care, confidence, and restorative well-being.",
  },
  {
    title: "Visible Results from Session 1",
    desc: "A holistic, non-invasive approach ensuring you leave fresher, smoother, and glowing inside and out.",
  },
];

export function PractitionerSplit() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-6"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F0A5A2]/20 to-transparent blur-2xl -z-10" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5]">
                <Image
                  src="/Practitioner-Split-img.png"
                  alt="Madiha Naz (Madi) - Founder & Lead Facialist at Luminous Leeds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8DFD5]/80 shadow-md">
                  <p className="text-xs font-semibold text-[#1C1917]">Madiha Naz (Madi)</p>
                  <p className="text-[10px] text-[#78716C]">Founder & Certified Beauty Therapist · Leeds</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease }}
              className="space-y-4"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#EC9C9D]">
                Meet The Founder · Luminous Leeds
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] leading-tight">
                Where beauty, science, and serenity come together.
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                With over five years of experience as a certified Beauty Therapist and one of the best facialists in Leeds, Madiha Naz (Madi) blends science and relaxation to deliver visible, radiant results. Every session is thoughtfully designed to deliver visible results while providing a moment of pure relaxation.
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="space-y-3 pt-1">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease }}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#E8DFD5]/80 hover:border-[#EAA59E] hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917]">{v.title}</h4>
                    <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1C1917] hover:bg-[#292524] transition-colors"
              >
                Read Madi’s Story & About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
