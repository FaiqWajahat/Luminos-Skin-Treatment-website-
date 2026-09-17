"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0D0C] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Soft Pink Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#EC9C9D]/15 via-[#F0A5A2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D97E80]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-[#EC9C9D]/20 mb-4 ring-4 ring-[#EC9C9D]/20 border border-neutral-800 bg-white">
            <img src="/logo.jpeg" alt="Luminous" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-serif font-semibold text-white tracking-tight">Luminous</h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#EC9C9D]/10 border border-[#EC9C9D]/20 text-[10px] font-medium tracking-widest text-[#F0A5A2] uppercase">
            <Sparkles className="w-3 h-3 text-[#EC9C9D]" />
            <span>Admin Portal</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#181614]/90 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-lg font-medium text-white">Sign In</h2>
            <p className="text-xs text-neutral-400">Access clinic enquiries, treatments & results</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@luminous.com"
                  required
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D] focus:ring-1 focus:ring-[#EC9C9D]/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D] focus:ring-1 focus:ring-[#EC9C9D]/40 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] text-white font-medium py-3 rounded-xl text-sm hover:opacity-95 shadow-md shadow-[#EC9C9D]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-center">
            <p className="text-[11px] text-neutral-400">
              Default credentials: <span className="text-[#F0A5A2] font-mono">admin@luminous.com</span> / <span className="text-[#F0A5A2] font-mono">luminous123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
