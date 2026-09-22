import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FALLBACK_IMAGES = {
  // All Clinic Facials
  "classic-facial": "/home-treatment-1.png",
  "extraction-deep-cleansing-facial": "/home-treatment-2.png",
  "signature-spa-facial": "/aboutpage-clinicalphilosophy.png",
  "ultimate-glow-facial": "/home-treatment-3.png",
  "enzyme-peel-facial-cold-therapy": "/home-treatment-4.png",
  "all-anti-aging-facial-massages": "/about-The Leeds-Sanctuary.png",

  // Massage Therapy
  "swedish-relaxing-therapy": "/about-The Leeds-Sanctuary.png",
  "deep-tissue-therapy": "/home-treatment-1.png",
  "hot-stone-therapy": "/about-The Leeds-Sanctuary.png",
  "aroma-therapy-asmr": "/aboutpage-clinicalphilosophy.png",
  "lymphatic-wood-sculpt-massage": "/Practitioner-Split-img.png",
  "indian-head-hand-foot-reflexology": "/home-treatment-2.png",
  "led-light-therapy-for-pains-add-on": "/home-treatment-4.png",

  // Facial Skin Treatments
  "led-light-treatment": "/home-treatment-4.png",
  "skin-regenerate-replenish-oxygen-therapy": "/home-treatment-1.png",
  "full-hydrafacial-inc-ot-rf-led": "/home-treatment-3.png",
  "micro-hydro-dermabrasion-with-ot": "/home-treatment-2.png",
  "acne-treatment-high-frequency": "/Practitioner-Split-img.png",
  "rf-skin-tightening-full-facial-treatment": "/home-treatment-3.png",
  "microneedling": "/home-treatment-3.png",
  "intense-therapy-for-dry-skin-hydration-infused": "/home-treatment-1.png",
  "dermaplaning-treatment-full-facial": "/home-treatment-2.png",
  "ultrasound-galvanic-cold-therapy-add-on": "/aboutpage-clinicalphilosophy.png",
  "eyebrow-shaping-tinting-face-threading": "/home-treatment-1.png",
};

const formatImageSrc = (src) => {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  return `data:image/jpeg;base64,${src}`;
};

export function TreatmentCard({ treatment }) {
  const rawImage =
    treatment.image && treatment.image.trim() !== ""
      ? treatment.image
      : FALLBACK_IMAGES[treatment.slug] ||
        FALLBACK_IMAGES[treatment.id] ||
        "/home-treatment-1.png";

  const imageSrc = formatImageSrc(rawImage);

  return (
    <article className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between h-full w-full bg-white border border-[#E8DFD5] shadow-xs hover:shadow-md hover:border-[#EC9C9D]/50 transition-all duration-300">
      {/* Visual / Image */}
      <div className="p-2.5 pb-0">
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#FAF8F5]">
          <img
            src={imageSrc}
            alt={treatment.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "/home-treatment-1.png";
            }}
          />
        </div>
      </div>

      {/* Card Content - flex-1 with uniform spacing & aligned sections */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category & Badge with fixed height for perfect vertical alignment */}
          <div className="flex items-center justify-between gap-2 h-6">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#EC9C9D] truncate">
              {treatment.category}
            </span>
            {treatment.popular && (
              <span className="text-[10px] font-semibold text-[#EC9C9D] bg-[#EC9C9D]/10 px-2.5 py-0.5 rounded-full border border-[#EC9C9D]/20 shrink-0">
                Client Favorite
              </span>
            )}
          </div>

          {/* Title with fixed min-height and 2-line clamp for equal row alignment */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1C1917] leading-snug line-clamp-2 min-h-[3.25rem] flex items-center">
            {treatment.title}
          </h3>

          {/* Description with fixed min-height and 3-line clamp */}
          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3 min-h-[3.8rem]">
            {treatment.shortDescription || treatment.tagline}
          </p>

          {/* Treatment Details & Aftercare as written */}
          {treatment.benefits &&
            (Array.isArray(treatment.benefits)
              ? treatment.benefits.length > 0
              : Boolean(treatment.benefits)) && (
              <div className="pt-3 border-t border-[#E8DFD5]/70">
                <div className="space-y-1 text-xs text-[#78716C]">
                  {Array.isArray(treatment.benefits) ? (
                    treatment.benefits.map((line, idx) => (
                      <p key={idx} className="leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#EC9C9D] shrink-0 mt-0.5">•</span>
                        <span>{line.replace(/^[•\-\*]\s*/, "")}</span>
                      </p>
                    ))
                  ) : (
                    <div className="leading-relaxed whitespace-pre-line">
                      {treatment.benefits}
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Pricing & CTA pinned strictly to bottom */}
        <div className="pt-4 border-t border-[#E8DFD5] space-y-3.5 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-[#1C1917]">
              £{treatment.price}
            </span>
          </div>

          <div className="pt-1">
            <Link
              href={`/booking?treatment=${treatment.slug}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80] shadow-xs hover:opacity-95 transition-all text-center"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
