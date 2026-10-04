"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  Shield,
  Palette
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const routeNames: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/inquiries": "Inquiries & Leads",
  "/admin/projects": "Projects Portfolio",
  "/admin/skills": "Skills & Tech Stack",
  "/admin/experience": "Experience History",
  "/admin/education": "Education & Degrees",
  "/admin/services": "Services & Offerings",
  "/admin/certifications": "Certifications & Achievements",
  "/admin/settings": "Site & Profile Settings"
};

interface AdminHeaderProps {
  userEmail: string;
  onToggleMobileMenu?: () => void;
}

export function AdminHeader({ userEmail, onToggleMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const { theme, isDark, toggleMode, mounted } = useTheme();

  const currentLabel = routeNames[pathname] || "Admin Console";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-colors">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <Link
            href="/admin"
            className="text-base-content/60 hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Portfolio CRM</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-base-content/40 shrink-0" />

          <span className="font-semibold text-base-content truncate max-w-[150px] sm:max-w-none">
            {currentLabel}
          </span>
        </nav>
      </div>

      {/* Right: Actions, Theme Switcher & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* FlyonUI Light/Dark Mode Toggle */}
        <button
          onClick={toggleMode}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 flex items-center gap-2 text-xs font-medium transition-all cursor-pointer"
          title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
        >
          {mounted && isDark ? (
            <>
              <Sun className="w-4 h-4 text-warning" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        {/* View Live Site Shortcut */}
        <Link
          href="/"
          target="_blank"
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 flex items-center gap-1.5 text-xs font-medium transition-colors"
          title="Open Public Portfolio in new tab"
        >
          <span className="hidden sm:inline">Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-base-content/60" />
        </Link>

        {/* Admin Verified Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span className="truncate max-w-[140px]">{userEmail}</span>
        </div>
      </div>
    </header>
  );
}
