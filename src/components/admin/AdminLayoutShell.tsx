"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutShellProps {
  userEmail: string;
  newInquiriesCount: number;
  children: React.ReactNode;
}

export function AdminLayoutShell({
  userEmail,
  newInquiriesCount,
  children
}: AdminLayoutShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col antialiased">
      {/* Sidebar Component */}
      <AdminSidebar
        userEmail={userEmail}
        newInquiriesCount={newInquiriesCount}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Header Breadcrumb Bar */}
        <AdminHeader
          userEmail={userEmail}
          onToggleMobileMenu={() => setMobileOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
