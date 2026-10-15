"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FloralDivider } from "@/components/shared/floral-accent";

const ease = [0.22, 1, 0.36, 1];

// Short story about Luminous Skin Clinic
export function AboutPhilosophy() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-6 space-y-5"
          >
            <FloralDivider />
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#D97E80]">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] leading-[1.18]">
              Where beauty meets serenity.
            </h2>
            <div className="space-y-4 text-base text-[#44403C] leading-relaxed">
              <p>
                Luminous Skin Clinic began with a simple wish — to create a calm, welcoming space in Leeds
                where skin health and relaxation go hand in hand.
              </p>
              <p>
                More than a salon, it’s your personal escape for self-care. Every treatment blends
                advanced techniques with premium products to renew your skin, restore balance and enhance
                your natural glow — without invasive procedures.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5]">
              <Image
                src="/about-01.jpeg"
                alt="Inside Luminous Skin Clinic, Leeds"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
