"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/shared/animations";
import { InstagramIcon } from "@/components/shared/social-icons";
import { ExternalLink, Play, Layers } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/luminouss_skin_clinic";
const INSTAGRAM_HANDLE = "@luminouss_skin_clinic";

// Real posts directly from @luminouss_skin_clinic
const INITIAL_POSTS = [
  {
    postId: "DdXKa63MbrW",
    permalink: "https://www.instagram.com/reel/DdXKa63MbrW/",
    mediaUrl: "/instagram/ig-post-1.jpg",
    caption: "✨INTRODUCING: “LUMINOUS ULTIMATE SKIN REJUVENATION” Your brand-new signature facial combining Hydrafacial + Microneedling + Cold Therapy + LED Light Therapy. Launch Price £99 (was £140) ✨",
    dateStr: "17 Sep 2026",
    mediaType: "VIDEO",
  },
  {
    postId: "DdUjfhFss1P",
    permalink: "https://www.instagram.com/p/DdUjfhFss1P/",
    mediaUrl: "/instagram/ig-post-2.jpg",
    caption: "✨September: Reset & Refresh Your Skin✨ Deep Cleansing Facial to deeply cleanse impurities, sweep away dead skin, calm congestion & restore radiant glow 🌿",
    dateStr: "15 Sep 2026",
    mediaType: "IMAGE",
  },
  {
    postId: "DdOaaKUMJa2",
    permalink: "https://www.instagram.com/reel/DdOaaKUMJa2/",
    mediaUrl: "/instagram/ig-post-3.jpg",
    caption: "✨ BREATHE LIFE INTO YOUR SKIN ✨ Give your skin the fresh, radiant boost it deserves with Oxygen Therapy 💕 Refresh & revitalise tired, dull-looking skin 🤍",
    dateStr: "13 Sep 2026",
    mediaType: "VIDEO",
  },
  {
    postId: "DdM7RytMORw",
    permalink: "https://www.instagram.com/p/DdM7RytMORw/",
    mediaUrl: "/instagram/ig-post-4.jpg",
    caption: "Beautiful result after just 2 sessions of RF Skin Tightening Treatment. Visibly firmer, smoother, and more lifted with natural collagen boost ✨",
    dateStr: "12 Sep 2026",
    mediaType: "IMAGE",
  },
];

export function InstagramFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [loading, setLoading] = useState(false);

  // Fetch real-time latest 4 posts from /api/instagram
  useEffect(() => {
    let isMounted = true;
    async function loadLiveFeed() {
      try {
        setLoading(true);
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
            if (isMounted) {
              setPosts(data.posts.slice(0, 4));
            }
          }
        }
      } catch (err) {
        console.warn("Using cached Instagram feed:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadLiveFeed();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] border-t border-[#E8DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Clean Luxury Header */}
        <FadeIn delay={0.05}>
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8E7] text-[#D97E80] text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07A7C] animate-pulse"></span>
              <span>Live From Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              On Instagram
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Real client moments, clinical transformations, and behind-the-scenes skin rituals in Leeds.
            </p>
          </div>
        </FadeIn>

        {/* 4 Real-Time Instagram Posts Grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {posts.map((post, idx) => {
              const isVideo = post.mediaType === "VIDEO" || post.isVideo;
              const isCarousel = post.mediaType === "CAROUSEL_ALBUM" || post.isCarousel;
              const link = post.permalink || INSTAGRAM_URL;
              const imageSrc = post.mediaUrl || post.image;
              const dateDisplay = post.dateStr || (post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "Recent");

              return (
                <a
                  key={post.postId || post.id || idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-[380px] sm:h-[420px] lg:h-[460px] w-full rounded-2xl overflow-hidden bg-neutral-900 block shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#E8DFD5]/80 hover:border-[#EC9C9D]/60 hover:-translate-y-1"
                  aria-label={`View post on Instagram: ${post.caption}`}
                >
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt={post.caption || "Luminous Skin Clinic Instagram Post"}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Corner Badge (Reel Video Play or Carousel Layers) */}
                  {isVideo && (
                    <div className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-white shadow-xs">
                      <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                    </div>
                  )}
                  {isCarousel && (
                    <div className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-white shadow-xs">
                      <Layers className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {/* Hover Glass Overlay - 100% Real Post Details */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white/90 uppercase tracking-wider">
                        {isVideo ? "Reel" : isCarousel ? "Carousel" : "Post"} &bull; {dateDisplay}
                      </span>
                      <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white shadow-xs">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs sm:text-[13px] line-clamp-5 leading-relaxed text-white/95 font-medium whitespace-pre-line">
                        {post.caption}
                      </p>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/20">
                        <span className="text-[#F0A5A2] font-semibold flex items-center gap-1 group-hover:underline">
                          <span>View on Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                        <span className="text-white/70 text-[10px]">
                          @luminouss_skin_clinic
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </FadeIn>

        {/* Centered Instagram CTA Button */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] shadow-md shadow-[#EC9C9D]/30 hover:opacity-95 hover:shadow-lg hover:shadow-[#EC9C9D]/40 transition-all cursor-pointer group"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow {INSTAGRAM_HANDLE}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
