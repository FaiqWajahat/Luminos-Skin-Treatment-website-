import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Gem, Leaf, Sparkles, Sun, Wind } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { PetalMark } from "@/components/shared/floral-accent";

const SKIN_GOALS = [
  { label: "Hydration", note: "Plump, comfortable skin", icon: Droplets },
  { label: "Clarity", note: "Clearer, calmer pores", icon: Leaf },
  { label: "Glow", note: "Bright, radiant complexion", icon: Sun },
  { label: "Texture", note: "Smooth, refined surface", icon: Wind },
  { label: "Firmness", note: "Lifted, resilient contours", icon: Gem },
  { label: "Skin Renewal", note: "Fresh, renewed skin", icon: Sparkles },
];

export function SkinConcerns() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FBEDEC] blur-3xl opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Clinic photo */}
        <FadeIn direction="right" className="lg:col-span-5">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] border border-[#EC9C9D]/25" />
            <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-2xl shadow-[#1C1917]/10">
              <Image
                src="/home-01.jpeg"
                alt="Inside Luminous Skin Clinic, Leeds"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/35 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:-right-6 sm:w-64 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8DFD5] shadow-xl px-4 py-3.5">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FBEDEC] text-[#D97E80] shrink-0">
                <PetalMark className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1C1917]">Tailored to you</p>
                <p className="text-xs text-[#57534E]">Every treatment starts with your skin</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Copy & skin goals */}
        <div className="lg:col-span-7 space-y-8 pt-6 lg:pt-0">
          <FadeIn className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D97E80]">
              <span className="h-px w-8 bg-[#EC9C9D]" />
              Skin Concerns
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-[#1C1917] leading-[1.12]">
              Let’s Give Your Skin <em className="italic font-normal text-[#D97E80]">Some Love</em>
            </h2>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed max-w-xl">
              Every complexion is different. From tired, dull-looking skin to dryness, congestion and visible
              signs of ageing, our personalised treatments are designed around your individual skin needs.
            </p>
          </FadeIn>

          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {SKIN_GOALS.map(({ label, note, icon: Icon }, i) => (
              <FadeIn key={label} delay={i * 0.05} className="h-full">
                <div role="listitem" className="group h-full rounded-2xl border border-[#E8DFD5] bg-[#FDFBF9] p-4 sm:p-5 hover:border-[#EC9C9D]/50 hover:bg-white hover:shadow-lg hover:shadow-[#EC9C9D]/10 transition-all duration-300">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FBEDEC] text-[#D97E80] group-hover:bg-[#EC9C9D] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="mt-3 font-serif text-base sm:text-lg font-bold text-[#1C1917]">{label}</p>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-snug mt-0.5">{note}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] border-b border-[#EC9C9D] pb-1 hover:text-[#D97E80] transition-colors"
            >
              Find the right treatment for you
              <ArrowRight className="w-4 h-4 text-[#D97E80] group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
