/**
 * Elegant Badge Pill
 */
export function BadgePill({
  children,
  variant = "gold", // "gold", "neutral", "outline"
  className = "",
}) {
  const styles = {
    gold: "bg-[#EC9C9D]/10 text-[#EC9C9D] border-[#EC9C9D]/25",
    neutral: "bg-[#F3ECE6] text-[#443E38] border-[#E8DFD5]",
    outline: "bg-transparent text-[#78716C] border-[#E8DFD5]",
  }[variant] || "bg-[#EC9C9D]/10 text-[#EC9C9D] border-[#EC9C9D]/25";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
