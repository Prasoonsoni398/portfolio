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
    <div className="h-screen bg-base-100 text-base-content flex flex-col antialiased overflow-hidden">
      {/* Sidebar Component */}
      <AdminSidebar
        userEmail={userEmail}
        newInquiriesCount={newInquiriesCount}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col h-screen overflow-hidden">
        {/* Header Breadcrumb Bar */}
        <AdminHeader
          userEmail={userEmail}
          onToggleMobileMenu={() => setMobileOpen(true)}
        />

        {/* Page Content with isolated smooth scrolling if content exceeds height */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
