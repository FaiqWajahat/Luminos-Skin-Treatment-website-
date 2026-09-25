"use client";

import { useState, useRef } from "react";
import { FadeIn } from "@/components/shared/animations";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  Film,
} from "lucide-react";

const DEFAULT_VIDEOS = [
  {
    id: "vid-1",
    title: "Bespoke Facial Therapy",
    subtitle: "Deep Cleanse & Hydration",
    url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335442/video-01.mp4",
  },
  {
    id: "vid-2",
    title: "Collagen & Barrier Repair",
    subtitle: "Advanced Skin Protocol",
    url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335686/vedio-2.mp4",
  },
  {
    id: "vid-3",
    title: "Laser & Radiance Therapy",
    subtitle: "Targeted Skin Glow",
    url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335714/vedio-3.mp4",
  },
  {
    id: "vid-4",
    title: "Clinical Exfoliation Protocol",
    subtitle: "Luminous Complexion",
    url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335726/vedio-4.mp4",
  },
  {
    id: "vid-5",
    title: "Sanctuary Lounge Experience",
    subtitle: "Leeds 1:1 Private Suite",
    url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335738/vedio-5.mp4",
  },
];

function VideoCard({ video, onOpenModal }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      onClick={() => onOpenModal(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl overflow-hidden bg-[#1C1917] border border-[#E8DFD5] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[9/16] flex flex-col justify-end"
    >
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* Dark luxury gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:opacity-90 transition-opacity" />

      {/* Header Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white tracking-wider uppercase">
          <Sparkles className="w-3 h-3 text-[#EC9C9D]" />
          <span>Hover to Play</span>
        </span>

        {/* Audio Mute/Unmute Quick Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#EC9C9D]" />}
        </button>
      </div>

      {/* Play/Pause Overlay Icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all shadow-lg ${
          isPlaying ? "opacity-0 group-hover:opacity-100 bg-[#EC9C9D]/90 text-black scale-100" : "opacity-90 group-hover:scale-110 group-hover:bg-[#EC9C9D] group-hover:text-black"
        }`}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="relative z-10 p-4 sm:p-5 space-y-1 text-white">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#EC9C9D] block">
          {video.subtitle}
        </span>
        <h4 className="text-sm sm:text-base font-serif font-bold text-white leading-tight group-hover:text-[#EC9C9D] transition-colors">
          {video.title}
        </h4>
        <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
          <Maximize2 className="w-3 h-3 text-[#EC9C9D]" />
          <span>Hover to play &bull; Tap to expand</span>
        </div>
      </div>
    </div>
  );
}

export function ClinicVideos({ videos = DEFAULT_VIDEOS }) {
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const modalVideoRef = useRef(null);
  const [modalMuted, setModalMuted] = useState(false);

  const videoList = videos && videos.length > 0 ? videos : DEFAULT_VIDEOS;

  return (
    <section className="py-16 sm:py-24 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Decorative luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EC9C9D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EC9C9D]/15 border border-[#EC9C9D]/30 text-[#EC9C9D] text-xs font-semibold uppercase tracking-[0.2em]">
            <Film className="w-3.5 h-3.5" />
            <span>Clinical Reels & Patient Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
            Experience Luminous In Motion
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
            Take a private look inside our Leeds clinic. Watch our bespoke facial protocols, advanced collagen therapies, and serene sanctuary atmosphere.
          </p>
        </FadeIn>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {videoList.map((video, idx) => (
            <FadeIn key={video.id || idx} delay={idx * 0.08}>
              <VideoCard video={video} onOpenModal={(v) => setActiveModalVideo(v)} />
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal Preview */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#1C1917] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EC9C9D]" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">{activeModalVideo.title}</h4>
                  <p className="text-[10px] text-[#EC9C9D]">{activeModalVideo.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (modalVideoRef.current) {
                      modalVideoRef.current.muted = !modalMuted;
                      setModalMuted(!modalMuted);
                    }
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={modalMuted ? "Unmute" : "Mute"}
                >
                  {modalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#EC9C9D]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalVideo(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Video Player */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={modalVideoRef}
                src={activeModalVideo.url}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
