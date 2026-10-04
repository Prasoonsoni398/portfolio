"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";

const routeNames: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/hero": "Hero (Home) Customization",
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
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-colors h-[57px] min-h-[57px] gap-2">
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-md sm:text-sm font-medium">
          <span className="font-semibold text-base-content truncate ">
            {currentLabel}
          </span>
        </nav>
      </div>

      {/* Right: Top Tabs with Bottom Border in Highlighted Area */}
      <div
        id="admin-header-tabs-portal"
        className="flex-1 flex items-center justify-end overflow-x-auto overflow-y-hidden no-scrollbar h-full px-1 sm:px-3"
      />
    </header>
  );
}
