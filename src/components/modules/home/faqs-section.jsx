"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FAQS } from "@/constants/clinic-data";
import { SectionHeader } from "@/components/shared/section-header";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Plus, Minus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Clean Architectural Image Slot (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5]">
                <Image
                  src="/home-FAQ (2).png"
                  alt="Luminous Skin Consultation Lounge - Leeds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E8DFD5]/80 shadow-xs">
                  <p className="text-xs font-semibold text-[#1C1917]">Private Consultation Lounge</p>
                  <p className="text-[10px] text-[#78716C]">Central Leeds · Unhurried 1:1 Care</p>
                </div>
              </div>

              <div className="px-1 text-xs text-[#78716C] leading-relaxed">
                <p className="font-medium text-[#443E38]">
                  Leeds City Centre Wellness Suite
                </p>
                <p>Private, unhurried consultations tailored strictly to your skin goals.</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Minimalist Professional FAQs (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Clean Section Header */}
            <SectionHeader
              eyebrow="Frequently Asked Questions"
              title="Everything you need to know before your visit."
              description="Transparent answers to the most common questions about our clinical treatments, appointments, and skin health protocols."
            />

            {/* Clean, Simple Accordion List */}
            <div className="divide-y divide-[#E8DFD5] border-y border-[#E8DFD5]">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={faq.id} className="py-5 transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex items-start justify-between gap-6 cursor-pointer select-none group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-serif text-sm font-medium text-[#EC9C9D] shrink-0 pt-0.5">
                          0{idx + 1}
                        </span>
                        <h3 className={`text-base font-medium tracking-tight transition-colors ${
                          isOpen ? "text-[#EC9C9D]" : "text-[#1C1917] group-hover:text-[#EC9C9D]"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      <div className="shrink-0 pt-1 text-[#78716C] group-hover:text-[#EC9C9D] transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#EC9C9D]" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-2 text-sm text-[#57534E] leading-relaxed pl-8 sm:pl-9 pr-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
