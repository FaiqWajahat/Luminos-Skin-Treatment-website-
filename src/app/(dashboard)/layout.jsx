"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Images,
  Users,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
  Shield,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Treatments", href: "/admin/treatments", icon: Sparkles },
  { label: "Results", href: "/admin/results", icon: Images },
  { label: "Pages", href: "/admin/content", icon: FileText },
  { label: "Admin Users", href: "/admin/users", icon: Users },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Read saved sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("luminous_admin_sidebar_open");
    if (saved !== null) {
      setSidebarOpen(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("luminous_admin_sidebar_open", String(next));
      return next;
    });
  };

  if (pathname === "/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const isActive = (href) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const currentNav = navItems.find((item) => isActive(item.href)) || { label: "Dashboard" };

  return (
    <div className="min-h-screen bg-[#0E0D0C] text-white flex flex-col">
      {/* Top Navbar Header (Consistent & Professional - Never overlaps content) */}
      <header className="h-16 bg-[#161412] border-b border-neutral-800/80 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center gap-2 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/70 border border-neutral-800 transition-colors"
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4 text-[#EC9C9D]" />
            ) : (
              <PanelLeft className="w-4 h-4 text-[#EC9C9D]" />
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/70 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Clinic Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shadow-[#EC9C9D]/20 border border-neutral-800 bg-white flex items-center justify-center">
              <img src="/logo.jpeg" alt="Luminous" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-semibold text-sm text-white leading-none block">
                Luminous
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#EC9C9D] font-medium">
                Admin Console
              </span>
            </div>
          </div>

          {/* Breadcrumb Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 pl-3 border-l border-neutral-800">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-200 font-medium">{currentNav.label}</span>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3 h-3 text-[#EC9C9D]" />
          </Link>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EC9C9D]/15 border border-[#EC9C9D]/30 flex items-center justify-center text-[11px] font-bold text-[#F0A5A2]">
              A
            </div>
            <span className="text-xs text-neutral-300 font-medium hidden md:inline">Admin</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Body Area: Sidebar + Main Content */}
      <div className="flex-1 flex min-w-0">
        {/* Desktop Sidebar (Smooth Width Transition: 60 to 0) */}
        <aside
          className={`hidden md:flex flex-col border-r border-neutral-800/80 bg-[#161412] shrink-0 sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-30 overflow-hidden ${
            sidebarOpen ? "w-60 opacity-100" : "w-0 opacity-0 border-r-0 pointer-events-none"
          }`}
        >
          {/* Nav Items */}
          <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto w-60 shrink-0">
            <p className="px-3 pb-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Management
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    active
                      ? "bg-[#EC9C9D]/15 text-[#F0A5A2] shadow-sm border border-[#EC9C9D]/25"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active ? "text-[#EC9C9D]" : "text-neutral-400 group-hover:text-white"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#EC9C9D]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Footer inside sidebar */}
          <div className="p-3 border-t border-neutral-800/60 w-60 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-neutral-900/50 border border-neutral-800/60 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#EC9C9D]" />
              <span className="text-[10px] text-neutral-400">Authenticated Admin</span>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#161412] border-r border-neutral-800 flex flex-col p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl overflow-hidden border border-neutral-800 bg-white flex items-center justify-center">
                    <img src="/logo.jpeg" alt="Luminous" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-white">Luminous Admin</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-neutral-400 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium ${
                        active
                          ? "bg-[#EC9C9D]/15 text-[#F0A5A2] border border-[#EC9C9D]/25"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="space-y-1 pt-4 border-t border-neutral-800">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-neutral-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Public Website</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-red-400 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
