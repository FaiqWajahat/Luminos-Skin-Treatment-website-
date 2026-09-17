"use client";

import { CONTACT_CHANNELS, SOCIAL_CHANNELS } from "@/constants/contact-data";
import { Phone, MessageSquare, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { WhatsAppIcon, InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/shared/social-icons";

const ICONS = {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
};

export function ContactMethods() {
  return (
    <section className="py-12 border-b border-[#E8DFD5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC9C9D]">
                Direct Channels
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                Connect directly with our team
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-md">
              Choose the channel most convenient for you. For instant questions, our concierge WhatsApp and direct phone line are monitored continuously.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_CHANNELS.map((channel) => {
            const Icon = ICONS[channel.icon] || Mail;

            return (
              <StaggerItem key={channel.id}>
                <div className="luxury-card rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#EC9C9D] transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#EC9C9D]/10 border border-[#EC9C9D]/20 flex items-center justify-center text-[#EC9C9D] group-hover:scale-105 group-hover:bg-[#EC9C9D] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <BadgePill variant={channel.badgeVariant}>
                        {channel.badge}
                      </BadgePill>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-[#1C1917]">
                        {channel.title}
                      </h3>
                      <p className="text-xs text-[#78716C] leading-relaxed">
                        {channel.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      <p className="text-sm font-semibold text-[#1C1917] font-mono select-all">
                        {channel.value}
                      </p>
                      <p className="text-[11px] text-[#A8A29E] mt-0.5">
                        {channel.availability}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#E8DFD5]">
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-[#1C1917] bg-[#FAF8F5] group-hover:bg-[#1C1917] group-hover:text-white border border-[#E8DFD5] group-hover:border-[#1C1917] transition-all duration-200"
                    >
                      <span>{channel.actionLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Social Presence Grid */}
        <FadeIn delay={0.2}>
          <div className="mt-12 pt-8 border-t border-[#E8DFD5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EC9C9D]">
                  Social & Community
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1C1917] tracking-tight">
                  Follow Luminous across our official channels
                </h3>
              </div>
              <p className="text-xs text-[#78716C]">
                Daily treatment stories, client skin transformations, and clinical advice
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              {SOCIAL_CHANNELS.map((item) => {
                const IconComponent =
                  item.type === "whatsapp"
                    ? WhatsAppIcon
                    : item.type === "instagram"
                    ? InstagramIcon
                    : item.type === "tiktok"
                    ? TikTokIcon
                    : FacebookIcon;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white border border-[#E8DFD5] hover:border-[#EC9C9D] hover:shadow-xs transition-all duration-200 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] text-[#1C1917] group-hover:text-[#EC9C9D] group-hover:border-[#EC9C9D]/30 flex items-center justify-center transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917] group-hover:text-[#EC9C9D] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#78716C] truncate max-w-[110px]">
                          {item.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#EC9C9D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
