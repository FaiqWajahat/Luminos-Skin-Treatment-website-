"use client";

import { useEffect, useState } from "react";

export function MobileBookingBar({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const overview = document.getElementById("treatment-overview");
    const end = document.getElementById("treatment-end");
    if (!overview || !end) return;

    let frame;
    const updateVisibility = () => {
      setVisible(
        overview.getBoundingClientRect().bottom <= 80 &&
        end.getBoundingClientRect().top > window.innerHeight,
      );
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateVisibility);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Quick booking" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#F0E3DF] bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_-12px_rgba(28,25,23,0.15)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-4">{children}</div>
    </aside>
  );
}