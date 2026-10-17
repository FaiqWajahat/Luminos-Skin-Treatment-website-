"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PetalMark } from "@/components/shared/floral-accent";

const ease = [0.22, 1, 0.36, 1];

export const heroText = "text-sm sm:text-base text-[#44403C] leading-relaxed max-w-xl";

function HeroImage({ image, alt, imagePosition, sizes }) {
  return image?.startsWith("data:") ? (
    <img src={image} alt={alt} className={`w-full h-full object-cover ${imagePosition}`} />
  ) : (
    <Image src={image} alt={alt} fill priority quality={95} sizes={sizes} className={`object-cover ${imagePosition}`} />
  );
}

/**
 * Shared hero for the main pages (Home, Services, About, Contact): soft pink backdrop,
 * heading and introduction on the left and the photo fading in from the right.
 */
export function PageHero({ eyebrow, title, tagline, children, image, alt, imagePosition = "object-center" }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FBEDEC] via-[#FCF4F2] to-[#FAF8F5]">
      {/* Decorative petals */}
      <PetalMark className="pointer-events-none absolute -left-6 top-10 w-28 h-28 text-[#EC9C9D]/15 -rotate-12" />
      <PetalMark className="pointer-events-none absolute left-[38%] bottom-6 w-16 h-16 text-[#EC9C9D]/10 rotate-12 hidden lg:block" />

      {/* Photo: stacked on mobile, right half on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease }}
        className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%] [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]"
      >
        <HeroImage image={image} alt={alt} imagePosition={imagePosition} sizes="(max-width: 1024px) 100vw, 55vw" />
      </motion.div>

      {/* Copy */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="lg:w-[48%] pt-2 pb-12 sm:pb-14 lg:min-h-[540px] lg:py-20 flex flex-col justify-center space-y-5"
        >
          <h1 className="space-y-2">
            {eyebrow && <em className="block font-serif italic font-normal text-2xl sm:text-3xl text-[#D97E80]">{eyebrow}</em>}
            <span className="block font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] text-[#1C1917]">
              {title}
            </span>
            {tagline && <em className="block pt-1 font-serif italic font-normal text-xl sm:text-2xl text-[#D97E80]">{tagline}</em>}
          </h1>
          <span aria-hidden="true" className="block h-0.5 w-14 rounded-full bg-[#EC9C9D]" />
          {children}
        </motion.div>
      </div>
    </section>
  );
}
