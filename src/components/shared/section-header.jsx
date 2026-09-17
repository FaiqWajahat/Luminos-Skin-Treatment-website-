/**
 * Reusable Luxury Section Header
 * Enforces editorial consistency across all pages.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left", // "left", "center"
  className = "",
  dark = false,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-3 ${isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-[#F0A5A2]" : "text-[#EC9C9D]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAA59E]" />
          {eyebrow}
        </div>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] ${
            dark ? "text-white" : "text-[#1C1917]"
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            dark ? "text-neutral-300" : "text-[#57534E]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
