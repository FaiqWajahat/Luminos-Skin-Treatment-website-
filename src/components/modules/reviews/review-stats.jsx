import { Star, ShieldCheck, Heart, ExternalLink } from "lucide-react";

const TRUSTPILOT_URL =
  "https://uk.trustpilot.com/review/luminousskinclinic.co.uk?utm_content=link_in_bio&utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

export function ReviewStats() {
  const metrics = [
    {
      icon: (
        <div className="w-5 h-5 flex items-center justify-center rounded-[2px] bg-[#00B67A]">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M12 2l2.9 6.8 7.1.6-5.3 4.8 1.6 7-6.3-3.7-6.3 3.7 1.6-7-5.3-4.8 7.1-.6z" />
          </svg>
        </div>
      ),
      value: "4.9 / 5.0",
      label: "TrustScore 'Excellent'",
      link: TRUSTPILOT_URL,
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#00B67A]" />,
      value: "19 Reviews",
      label: "100% Trustpilot Verified",
      link: TRUSTPILOT_URL,
    },
    {
      icon: <Star className="w-5 h-5 text-[#EC9C9D] fill-[#EC9C9D]" />,
      value: "100%",
      label: "4 & 5-Star Experiences",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#EC9C9D]" />,
      value: "Leeds Based",
      label: "Beeston LS11 Sanctuary",
    },
  ];

  return (
    <section className="py-10 border-b border-[#E8DFD5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="text-center space-y-1.5 p-4 rounded-xl bg-white border border-[#E8DFD5]/80 hover:border-[#EC9C9D]/50 hover:shadow-xs transition-all"
            >
              <div className="flex justify-center">{m.icon}</div>
              <span className="text-xl font-serif font-bold text-[#1C1917] block">
                {m.value}
              </span>
              <p className="text-xs text-[#78716C]">{m.label}</p>
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-[#00B67A] hover:underline font-medium pt-1"
                >
                  <span>View on Trustpilot</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
