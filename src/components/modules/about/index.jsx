import Image from "next/image";
import { FadeIn } from "@/components/shared/animations";
import { FloralDivider } from "@/components/shared/floral-accent";
import { PageHero, heroText } from "@/components/shared/page-hero";
import { CLINIC_INFO } from "@/constants/clinic-data";

// Short introduction to Madi → the clinic
export function AboutView({ data = {} }) {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="About"
        title="Madi & Luminous Skin Clinic"
        image={data.founderImage || "/about-founder.png"}
        alt="Madi, founder of Luminous Skin Clinic"
        imagePosition="object-top"
        textInHero
      >
        <p className={heroText}>
          I’m Madi, a certified beauty therapist and one of the best facialists in Leeds. With a passion for
          healthy skin and a calm, caring approach, I’m dedicated to helping you feel confident, relaxed and
          naturally radiant.
        </p>
        <p className={heroText}>
          Luminous Skin Clinic was created with one simple goal — to provide personalised, results-driven
          treatments in a calming and welcoming space.
        </p>
        <p className="font-serif italic text-lg text-[#D97E80]">Trusted care. Beautiful results.</p>
      </PageHero>

      {/* The clinic */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E8DFD5]">
        <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-sm bg-[#F3ECE6]">
            <Image
              src="/about-the-leeds-sanctuary.jpeg"
              alt="Treatment room at Luminous Skin Clinic"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-4">
            <FloralDivider className="justify-center md:justify-start" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">The Clinic</h2>
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
              Located in {CLINIC_INFO.area}, Luminous Skin Clinic offers professional facial treatments, advanced
              skincare and relaxing therapies — all designed to bring out your natural glow.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
