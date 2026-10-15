"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clapperboard, Copy, Heart } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { SectionHeader } from "@/components/shared/section-header";
import { InstagramIcon } from "@/components/shared/social-icons";
import { CLINIC_INFO } from "@/constants/clinic-data";

const PROFILE_URL = CLINIC_INFO.socials.instagram;
const HANDLE = "@" + PROFILE_URL.replace(/\/$/, "").split("/").pop();
// The server refreshes the feed from Instagram; this only picks up the result
const REFRESH_MS = 2 * 60 * 1000;

// Captions read better on the website without the trailing hashtag block
function cleanCaption(caption = "") {
  return caption.replace(/(\s*#[\p{L}\p{N}_]+)+\s*$/u, "").trim();
}

// Cloudinary and local images go through Next's optimiser; anything else loads as-is
function canOptimise(src = "") {
  return src.startsWith("/") || src.includes("res.cloudinary.com");
}

function MediaBadge({ type }) {
  if (type === "VIDEO") {
    return (
      <span className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white" title="Reel">
        <Clapperboard className="w-4 h-4" />
      </span>
    );
  }
  if (type === "CAROUSEL_ALBUM") {
    return (
      <span className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white" title="Carousel">
        <Copy className="w-4 h-4" />
      </span>
    );
  }
  return null;
}

function PostCard({ post, index }) {
  const caption = cleanCaption(post.caption);

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open Instagram post: ${caption.slice(0, 80) || "Luminous Skin Clinic"}`}
      className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-[#F3ECE6] border border-[#E8DFD5] shadow-sm hover:shadow-2xl hover:shadow-[#D97E80]/20 hover:-translate-y-1 transition-all duration-500"
    >
      <Image
        src={post.mediaUrl}
        alt={caption.slice(0, 120) || "Luminous Skin Clinic on Instagram"}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        unoptimized={!canOptimise(post.mediaUrl)}
        priority={index < 2}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <MediaBadge type={post.mediaType} />

      {/* Caption overlay: always visible on touch screens, revealed on hover for desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 text-white translate-y-0 lg:translate-y-3 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
        {post.dateStr && (
          <span className="block text-[10px] uppercase tracking-[0.18em] text-[#F0A5A2] font-semibold mb-1.5">
            {post.dateStr}
          </span>
        )}
        {caption && (
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 text-white/90">{caption}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
          <InstagramIcon className="w-3.5 h-3.5" />
          View post
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}

export function InstagramFeed({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const inFlight = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const refresh = async () => {
      if (inFlight.current || document.visibilityState !== "visible") return;
      inFlight.current = true;
      try {
        const res = await fetch("/api/instagram", { cache: "no-store", signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && Array.isArray(json.posts) && json.posts.length > 0) {
          setPosts(json.posts);
        }
      } catch {
        // Keep showing the current posts if a refresh fails
      } finally {
        inFlight.current = false;
      }
    };

    const interval = setInterval(refresh, REFRESH_MS);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-0 w-[420px] h-[420px] rounded-full bg-[#FBEDEC]/80 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
            <SectionHeader
              eyebrow="Follow Our Journey"
              title="Fresh from our Instagram."
              description="Treatment moments, real results and the latest offers from the clinic, straight from our feed."
            />

            {/* Profile chip */}
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group self-start md:self-end shrink-0 inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8DFD5] hover:border-[#EC9C9D] transition-colors"
            >
              <span className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#F9CE34] via-[#EE2A7B] to-[#6228D7]">
                <span className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1C1917]">
                  <InstagramIcon className="w-4.5 h-4.5" />
                </span>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-[#1C1917]">{HANDLE}</span>
                <span className="text-[11px] text-[#78716C]">{CLINIC_INFO.name}</span>
              </span>
              <span className="ml-2 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] group-hover:opacity-95 transition-opacity">
                <Heart className="w-3 h-3" />
                Follow
              </span>
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {posts.slice(0, 4).map((post, idx) => (
            <FadeIn key={post.postId} delay={idx * 0.08}>
              <PostCard post={post} index={idx} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
