"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved credentials from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("luminous_admin_credentials");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.password) setPassword(parsed.password);
        setRememberMe(true);
      }
    } catch (err) {
      console.warn("Could not read saved credentials:", err);
    }
  }, []);

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

      // Save or remove credentials based on rememberMe checkbox
      if (rememberMe) {
        localStorage.setItem(
          "luminous_admin_credentials",
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem("luminous_admin_credentials");
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
                  name="email"
                  autoComplete="username email"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D] focus:ring-1 focus:ring-[#EC9C9D]/40 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#EC9C9D]" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-400 hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me / Save Credentials Option */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-400 hover:text-neutral-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-[#0F0E0D] text-[#EC9C9D] accent-[#EC9C9D] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[11px]">Save username & password</span>
              </label>

              {email && password && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("luminous_admin_credentials");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-[10px] text-neutral-500 hover:text-neutral-400 hover:underline"
                >
                  Clear saved
                </button>
              )}
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
