import { Droplets, Gem, Leaf, Sparkles, Sun, Wind } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

const SKIN_GOALS = [
  { label: "Glow", icon: Sun },
  { label: "Hydration", icon: Droplets },
  { label: "Clarity", icon: Leaf },
  { label: "Texture", icon: Wind },
  { label: "Firmness", icon: Gem },
  { label: "Skin Renewal", icon: Sparkles },
];

export function SkinConcerns() {
  return (
    <section className="py-16 lg:py-20 bg-white border-y border-[#E8DFD5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
            Let’s Give Your Skin <em className="italic font-normal text-[#D97E80]">Some Love</em>
          </h2>
          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
            Every complexion is different. From tired, dull-looking skin to dryness, congestion and visible
            signs of ageing, our personalised treatments are designed around your individual skin needs.
          </p>
        </FadeIn>

        <FadeIn>
          <ul className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-y-8 gap-x-4">
            {SKIN_GOALS.map(({ label, icon: Icon }) => (
              <li key={label} className="flex flex-col items-center gap-3">
                <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FBEDEC] text-[#D97E80] border border-[#EC9C9D]/25">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-sm font-medium text-[#1C1917]">{label}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn>
          <p className="mt-10 font-serif italic text-lg sm:text-xl text-[#D97E80]">
            Because your skin deserves personalised care.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
