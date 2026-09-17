import { CLINIC_INFO } from "@/constants/clinic-data";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import Link from "next/link";

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
              <strong className="text-[#1C1917] block font-semibold">Telephone</strong>
              <span>{CLINIC_INFO.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#1C1917] block font-semibold">Direct Email</strong>
              <span>{CLINIC_INFO.email}</span>
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
