import { CLINIC_INFO } from "@/constants/clinic-data";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon, InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/shared/social-icons";

export function ClinicInfoCard() {
  return (
    <div className="space-y-6">
      {/* Map/Location Slot */}
      <ImagePlaceholder
        aspect="video"
        category="Leeds Location"
        label="Central Leeds Wellness Suite & Entrance Slot"
        icon="camera"
        overlayCaption="Convenient access via Leeds City Centre rail & bus links"
      />

      <div className="luxury-card rounded-2xl p-6 sm:p-7 space-y-6">
        <h4 className="text-base font-semibold text-[#1C1917] border-b border-[#E8DFD5] pb-3">
          Clinic Details & Visiting Information
        </h4>

        <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#1C1917] block font-semibold">Address</strong>
              <span>{CLINIC_INFO.address}, {CLINIC_INFO.location}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#1C1917] block font-semibold">Telephone & WhatsApp</strong>
              <a
                href={CLINIC_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EC9C9D] transition-colors"
              >
                {CLINIC_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#1C1917] block font-semibold">Direct Email</strong>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="hover:text-[#EC9C9D] transition-colors"
              >
                {CLINIC_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#1C1917] block font-semibold">Clinic Hours</strong>
              {CLINIC_INFO.hours.map((h, i) => (
                <p key={i} className="text-xs text-[#78716C]">
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons row */}
        <div className="pt-2 border-t border-[#E8DFD5] space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#78716C] block">
            Follow & Chat Directly
          </span>
          <div className="flex items-center gap-2">
            <a
              href={CLINIC_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] hover:border-[#25D366] text-[#1C1917] hover:text-[#25D366] flex items-center justify-center transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={CLINIC_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] hover:border-[#E1306C] text-[#1C1917] hover:text-[#E1306C] flex items-center justify-center transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={CLINIC_INFO.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] hover:border-black text-[#1C1917] hover:text-black flex items-center justify-center transition-colors"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={CLINIC_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFD5] hover:border-[#1877F2] text-[#1C1917] hover:text-[#1877F2] flex items-center justify-center transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/booking"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#292524] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Online Instead</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
