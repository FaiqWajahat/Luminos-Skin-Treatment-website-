"use client";

/**
 * Luxury Skeleton Loaders
 * Designed to mirror exact card layouts with warm ivory shimmer animations.
 */

// 1. Treatment Card Skeleton (Used in /treatments)
export function TreatmentCardSkeleton() {
  return (
    <div className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between h-full w-full bg-white border border-[#E8DFD5] shadow-xs">
      {/* Image Skeleton */}
      <div className="p-2.5 pb-0">
        <div className="aspect-[16/10] w-full rounded-xl skeleton-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category Pill Skeleton */}
          <div className="flex items-center justify-between gap-2 h-6">
            <div className="h-3 w-28 rounded-md skeleton-shimmer" />
            <div className="h-4 w-20 rounded-full skeleton-shimmer" />
          </div>

          {/* Title Skeleton (2 lines) */}
          <div className="space-y-1.5 min-h-[3.25rem] flex flex-col justify-center">
            <div className="h-5 w-4/5 rounded-md skeleton-shimmer" />
            <div className="h-5 w-1/2 rounded-md skeleton-shimmer" />
          </div>

          {/* Description Skeleton (3 lines) */}
          <div className="space-y-2 min-h-[3.8rem] pt-1">
            <div className="h-3.5 w-full rounded-md skeleton-shimmer" />
            <div className="h-3.5 w-11/12 rounded-md skeleton-shimmer" />
            <div className="h-3.5 w-3/4 rounded-md skeleton-shimmer" />
          </div>

          {/* Benefits Bullets Skeleton */}
          <div className="space-y-2 pt-3 border-t border-[#E8DFD5]/70 min-h-[4.5rem]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full skeleton-shimmer shrink-0" />
              <div className="h-3 w-3/4 rounded-md skeleton-shimmer" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full skeleton-shimmer shrink-0" />
              <div className="h-3 w-2/3 rounded-md skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Pricing & CTA Skeleton */}
        <div className="pt-4 border-t border-[#E8DFD5] space-y-3.5 mt-auto">
          <div className="h-7 w-20 rounded-md skeleton-shimmer" />
          <div className="h-11 w-full rounded-xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// 2. Pricing Row Skeleton (Used in /pricing)
export function PricingRowSkeleton() {
  return (
    <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white">
      <div className="space-y-2.5 sm:max-w-md w-full">
        {/* Category Pill */}
        <div className="h-4 w-32 rounded-full skeleton-shimmer" />
        {/* Title */}
        <div className="h-6 w-3/4 rounded-md skeleton-shimmer" />
        {/* Description */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 w-full rounded-md skeleton-shimmer" />
          <div className="h-3.5 w-2/3 rounded-md skeleton-shimmer" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD5]/60 flex justify-end">
        <div className="h-8 w-20 rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

// 3. Popular Treatment Card Skeleton (Used on Home Page)
export function PopularTreatmentSkeleton() {
  return (
    <div className="luxury-card rounded-2xl overflow-hidden flex flex-col h-full bg-white border border-[#E8DFD5]">
      <div className="p-2 pb-0">
        <div className="aspect-[16/10] w-full rounded-xl skeleton-shimmer" />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-md skeleton-shimmer" />
          <div className="h-5 w-3/4 rounded-md skeleton-shimmer" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded-md skeleton-shimmer" />
            <div className="h-3 w-4/5 rounded-md skeleton-shimmer" />
          </div>
        </div>
        <div className="pt-3 border-t border-[#E8DFD5] space-y-3">
          <div className="h-6 w-16 rounded-md skeleton-shimmer" />
          <div className="h-10 w-full rounded-xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// 4. Results Case Study Skeleton (Used on /results)
export function ResultsCardSkeleton() {
  return (
    <div className="luxury-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full border border-[#E8DFD5] bg-white shadow-2xs">
      {/* Before / After Split */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-md skeleton-shimmer" />
          <div className="aspect-[3/4] w-full rounded-xl skeleton-shimmer" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-md skeleton-shimmer" />
          <div className="aspect-[3/4] w-full rounded-xl skeleton-shimmer" />
        </div>
      </div>

      {/* Protocol info */}
      <div className="space-y-3">
        <div className="h-3 w-32 rounded-md skeleton-shimmer" />
        <div className="h-6 w-4/5 rounded-md skeleton-shimmer" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded-md skeleton-shimmer" />
          <div className="h-3.5 w-2/3 rounded-md skeleton-shimmer" />
        </div>
      </div>

      {/* Outcome pill */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD5] space-y-2">
        <div className="h-3 w-28 rounded-md skeleton-shimmer" />
        <div className="h-4 w-full rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

// 5. Booking Flow Category Skeletons
export function BookingCategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-2xl border border-[#E8DFD5] bg-white flex flex-col justify-between min-h-[110px] space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
            <div className="h-4 w-16 rounded-full skeleton-shimmer" />
          </div>
          <div className="h-4 w-3/4 rounded-md skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
