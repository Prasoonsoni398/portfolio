"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";

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
  const currentLabel = routeNames[pathname] || "Admin Console";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-colors min-h-[57px] gap-2">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 py-2 flex-shrink-0">
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
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-base-content/60 hidden md:inline">Portfolio CRM</span>
          <ChevronRight className="w-3.5 h-3.5 text-base-content/40 hidden md:inline" />
          <span className="font-semibold text-base-content truncate max-w-[120px] sm:max-w-none">
            {currentLabel}
          </span>
        </nav>
      </div>

      {/* Right: Top Tabs with Bottom Border in Highlighted Area */}
      <div
        id="admin-header-tabs-portal"
        className="flex-1 flex items-center justify-end overflow-x-auto no-scrollbar self-stretch items-end px-1 sm:px-3 -mb-px"
      />
    </header>
  );
}
