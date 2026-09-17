"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SKIN_CONCERNS } from "@/constants/clinic-data";
import { SectionHeader } from "@/components/shared/section-header";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function ConcernsGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
        >
          <SectionHeader
            eyebrow="Start With Your Skin"
            title="What would you like help with?"
            description="You do not need to know the medical treatment name. Start with your concern and we will guide you to the most effective clinical options."
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKIN_CONCERNS.map((concern, i) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease }}
            >
              <Link
                href="/treatments"
                className="group luxury-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-5 h-full block"
              >
                <div className="space-y-3">
                  <span className="font-serif text-xl font-bold text-[#EC9C9D] block">
                    {concern.number}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1C1917] group-hover:text-[#EC9C9D] transition-colors duration-300">
                    {concern.title}
                  </h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">
                    {concern.description}
                  </p>
                </div>

                <motion.div
                  className="pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#EC9C9D]"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.22 }}
                >
                  <span>Explore options</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
