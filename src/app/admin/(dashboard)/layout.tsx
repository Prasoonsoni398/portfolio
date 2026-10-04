import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata = {
  title: "CRM Admin Dashboard | Prasoon Soni Portfolio",
  description: "Portfolio CRM and Content Management Dashboard"
};

export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = db.getDashboardStats();

  return (
    <AdminLayoutShell
      userEmail={session.email}
      newInquiriesCount={stats.newInquiriesCount}
    >
      {children}
    </AdminLayoutShell>
  );
}
