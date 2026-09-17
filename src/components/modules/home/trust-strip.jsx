"use client";

import { motion } from "framer-motion";
import { TRUST_PILLARS } from "@/constants/clinic-data";

const ease = [0.22, 1, 0.36, 1];

export function TrustStrip() {
  return (
    <section className="border-y border-[#E8DFD5] bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="space-y-1.5 group"
            >
              <span className="font-serif text-xl lg:text-2xl font-bold text-[#EC9C9D] block group-hover:scale-105 transition-transform origin-left">
                {pillar.number}
              </span>
              <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-[#1C1917]">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#78716C] leading-relaxed hidden sm:block">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
