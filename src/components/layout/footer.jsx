import { CLINIC_INFO } from "@/constants/clinic-data";
import { WhatsAppIcon, InstagramIcon, TikTokIcon, FacebookIcon } from "@/components/shared/social-icons";

const SOCIAL_LINKS = [
  { label: "Instagram", href: CLINIC_INFO.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: CLINIC_INFO.socials.tiktok, icon: TikTokIcon },
  { label: "Facebook", href: CLINIC_INFO.socials.facebook, icon: FacebookIcon },
  { label: "WhatsApp", href: CLINIC_INFO.socials.whatsapp, icon: WhatsAppIcon },
];

// Social links and email only
export function Footer() {
  return (
    <footer className="relative z-10 bg-[#F7EBE8] text-[#1C1917]">
      <div className="h-1 w-full bg-gradient-to-r from-[#F0A5A2] via-[#EC9C9D] to-[#D97E80]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D97E80]">Follow us on</p>
          <div className="flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-10 h-10 rounded-full bg-[#EC9C9D] text-white hover:bg-[#D97E80] flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <a href={`mailto:${CLINIC_INFO.email}`} className="block text-sm text-[#44403C] hover:text-[#D97E80] transition-colors">
            {CLINIC_INFO.email}
          </a>
        </div>

        <p className="pt-6 w-full border-t border-[#E6D3CD] text-xs text-[#78716C]">
          © {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
