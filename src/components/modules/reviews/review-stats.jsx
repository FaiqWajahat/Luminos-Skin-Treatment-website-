import { Star, ShieldCheck, Heart, Users } from "lucide-react";

export function ReviewStats() {
  const metrics = [
    {
      icon: <Star className="w-5 h-5 text-[#EC9C9D] fill-[#EC9C9D]" />,
      value: "5.0 / 5.0",
      label: "Average Review Rating",
    },
    {
      icon: <Users className="w-5 h-5 text-[#EC9C9D]" />,
      value: "100%",
      label: "One-to-One Private Attention",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#EC9C9D]" />,
      value: "Verified",
      label: "Authentic Client Submissions",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#EC9C9D]" />,
      value: "Leeds Based",
      label: "Local Yorkshire Sanctuary",
    },
  ];

  return (
    <section className="py-10 border-b border-[#E8DFD5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="text-center space-y-1.5 p-4 rounded-xl bg-white border border-[#E8DFD5]/80">
              <div className="flex justify-center">{m.icon}</div>
              <span className="text-xl font-serif font-bold text-[#1C1917] block">
                {m.value}
              </span>
              <p className="text-xs text-[#78716C]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
