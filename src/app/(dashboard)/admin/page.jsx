"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Sparkles, Images, Calendar, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";

export default function AdminOverviewPage() {
  const [data, setData] = useState({ enquiries: [], treatments: [], results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/enquiries").then((r) => r.json()),
      fetch("/api/treatments").then((r) => r.json()),
      fetch("/api/results").then((r) => r.json()),
    ]).then(([eq, tr, re]) => {
      setData({
        enquiries: eq.enquiries || [],
        treatments: tr.treatments || [],
        results: re.results || [],
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const newEnquiries = data.enquiries.filter((e) => e.status === "New").length;

  const stats = [
    {
      title: "Client Enquiries",
      value: data.enquiries.length,
      badge: `${newEnquiries} pending review`,
      icon: MessageSquare,
      color: "#EC9C9D",
      href: "/admin/enquiries",
    },
    {
      title: "Clinic Treatments",
      value: data.treatments.length,
      badge: `${data.treatments.filter(t => t.active !== false).length} active catalog`,
      icon: Sparkles,
      color: "#F0A5A2",
      href: "/admin/treatments",
    },
    {
      title: "Case Studies / Results",
      value: data.results.length,
      badge: "Uploaded to Cloudinary",
      icon: Images,
      color: "#D97E80",
      href: "/admin/results",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Clinic Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time enquiries, treatment pricing and patient before/after portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/treatments"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#EC9C9D]/10 border border-[#EC9C9D]/20 text-[#F0A5A2] hover:bg-[#EC9C9D]/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EC9C9D]" />
            <span>Manage Catalog</span>
          </Link>
          <Link
            href="/admin/results"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] text-white shadow-sm shadow-[#EC9C9D]/20 hover:opacity-95 transition-opacity"
          >
            <Images className="w-3.5 h-3.5" />
            <span>Upload Result</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Link
              key={i}
              href={s.href}
              className="p-6 rounded-3xl bg-[#161412] border border-neutral-800/80 hover:border-[#EC9C9D]/40 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-4">
                <span className="text-xs font-medium text-neutral-300">{s.title}</span>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: s.color + "18" }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  {loading ? "..." : s.value}
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-[#EC9C9D] transition-colors" />
              </div>
              <p className="text-[11px] mt-2 font-medium" style={{ color: s.color }}>
                {s.badge}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Box */}
      <div className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-neutral-800/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-serif font-semibold text-white">
              Recent Consultations & Bookings
            </h3>
            <p className="text-[11px] text-neutral-400">Incoming enquiries from the public booking forms</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs text-[#EC9C9D] hover:text-[#F0A5A2] font-medium flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-neutral-800/60">
          {loading ? (
            <div className="p-10 text-center text-xs text-neutral-500">Loading clinic records...</div>
          ) : data.enquiries.length === 0 ? (
            <div className="p-10 text-center text-xs text-neutral-500">No client enquiries received yet.</div>
          ) : (
            data.enquiries.slice(0, 6).map((eq) => (
              <div key={eq._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-800/25 transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{eq.name}</p>
                    <span className="text-[10px] text-neutral-500 font-mono">#{eq.referenceId || "REF"}</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    {eq.email} &bull; {eq.phone} &bull; <span className="text-neutral-300 font-medium">{eq.treatmentTitle || "General Consultation"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-500 hidden sm:inline">
                    {eq.createdAt ? new Date(eq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : ""}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-3 py-1 rounded-full border ${
                      eq.status === "New"
                        ? "bg-[#EC9C9D]/15 text-[#EC9C9D] border-[#EC9C9D]/30"
                        : eq.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}
                  >
                    {eq.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
