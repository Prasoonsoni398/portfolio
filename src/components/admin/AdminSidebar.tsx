"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Inbox,
  FolderGit2,
  Wrench,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ChevronRight,
  ShieldCheck,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface AdminSidebarProps {
  userEmail: string;
  newInquiriesCount?: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function AdminSidebar({
  userEmail,
  newInquiriesCount = 0,
  mobileOpen,
  setMobileOpen
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const { isDark, toggleMode, mounted } = useTheme();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Hero (Home)", href: "/admin/hero", icon: Home },
    {
      label: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: Inbox,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined
    },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Skills & Tech", href: "/admin/skills", icon: Wrench },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Education", href: "/admin/education", icon: GraduationCap },
    { label: "Services", href: "/admin/services", icon: Sparkles },
    { label: "Certifications", href: "/admin/certifications", icon: Award },
    { label: "Site & Profile", href: "/admin/settings", icon: Settings }
  ];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-base-content/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-base-200 border-r border-base-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-base-300 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <div className="font-bold text-sm text-base-content flex items-center gap-1.5">
                Portfolio CRM
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-base-content/60">Control Dashboard</p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
            Portfolio Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30 font-semibold shadow-xs"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-300/60 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-primary" : "text-base-content/60 group-hover:text-base-content"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-content">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
            External Links
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-base-content/70 hover:text-base-content hover:bg-base-300/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-base-content/60 group-hover:text-base-content" />
              <span>View Live Portfolio</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-base-content/40 group-hover:text-base-content/80 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Footer / User Session */}
        <div className="p-3 border-t border-base-300 bg-base-300/30">
          <div className="p-2.5 rounded-xl bg-base-100 border border-base-300 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-[11px] font-semibold text-base-content truncate">{userEmail}</p>
              <p className="text-[10px] text-success flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Verified Admin
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMode}
                title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
                className="p-1.5 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-300 transition-colors cursor-pointer"
              >
                {mounted && isDark ? (
                  <Sun className="w-4 h-4 text-warning" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Log out of CRM"
                className="p-1.5 rounded-lg text-base-content/60 hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
