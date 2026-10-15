/**
 * Signature floral details — a petal sprig echoing the Luminous logo.
 * Purely decorative: keep usage light (section headers, dividers).
 */
export function PetalMark({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c3 3.5 4 7 2.6 10.4-.8 2-2.6 3.6-2.6 3.6s-1.8-1.6-2.6-3.6C8 9 9 5.5 12 2z" />
      <path
        d="M5.2 8.6c2.7.6 4.6 2.4 5.2 5 .3 1.3.2 2.5.2 2.5s-1.2-.2-2.4-.9C6.1 13.8 4.9 11.5 5.2 8.6z"
        opacity=".55"
      />
      <path
        d="M18.8 8.6c.3 2.9-.9 5.2-3 6.6-1.2.7-2.4.9-2.4.9s-.1-1.2.2-2.5c.6-2.6 2.5-4.4 5.2-5z"
        opacity=".55"
      />
      <path d="M12 17.5c.5 1.6.5 3 .2 4.5h-.4c-.3-1.5-.3-2.9.2-4.5z" opacity=".55" />
    </svg>
  );
}

export function FloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 text-[#EC9C9D] ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#EC9C9D]/60" />
      <PetalMark className="w-4 h-4" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#EC9C9D]/60" />
    </div>
  );
}

/** Small four-point sparkle */
export function Sparkle({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0z" />
    </svg>
  );
}
