import React from "react";
import Link from "next/link";
import {
  Inbox,
  FolderGit2,
  Wrench,
  Briefcase,
  ArrowUpRight,
  Sparkles,
  PlusCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const stats = db.getDashboardStats();
  const inquiries = db.getInquiries();
  const projects = db.getProjects();
  const profile = db.getProfile();

  return (
    <div className="space-y-8">
      {/* Single Toolbar Row */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-xs font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Project</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-semibold transition-colors"
        >
          <span>Live Portfolio</span>
          <ExternalLink className="w-3.5 h-3.5 text-base-content/60" />
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Inquiries / Leads */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-primary/40 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
              Client Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-base-content">{stats.totalInquiries}</span>
            {stats.newInquiriesCount > 0 ? (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                {stats.newInquiriesCount} new
              </span>
            ) : (
              <span className="text-xs text-base-content/50">All reviewed</span>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs">
            <Link
              href="/admin/inquiries"
              className="text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              Open Lead Inbox <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Projects */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-secondary/40 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
              Flagship Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-base-content">{stats.projectsCount}</span>
            <span className="text-xs text-base-content/60">
              ({stats.featuredProjectsCount} featured)
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs">
            <Link
              href="/admin/projects"
              className="text-secondary hover:underline flex items-center gap-1 font-semibold"
            >
              Manage Projects <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Skills */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-accent/40 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
              Technical Skills
            </span>
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-base-content">{stats.totalSkillsCount}</span>
            <span className="text-xs text-base-content/60">
              across {stats.skillsCategoryCount} categories
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs">
            <Link
              href="/admin/skills"
              className="text-accent hover:underline flex items-center gap-1 font-semibold"
            >
              Configure Skills <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Services & Experience */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-warning/40 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
              Career & Services
            </span>
            <div className="w-9 h-9 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-base-content">{stats.experienceCount}</span>
            <span className="text-xs text-base-content/60">
              roles &bull; {stats.servicesCount} services
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs">
            <Link
              href="/admin/experience"
              className="text-warning hover:underline flex items-center gap-1 font-semibold"
            >
              View Timeline <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Recent Inquiries / Leads */}
        <div className="lg:col-span-2 bg-base-200 border border-base-300 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-base-content flex items-center gap-2">
                <Inbox className="w-4 h-4 text-primary" />
                Recent Client Leads & Inquiries
              </h2>
              <p className="text-xs text-base-content/70 mt-0.5">
                Contact submissions received directly from your public website.
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            >
              View all ({inquiries.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-base-300 rounded-xl">
              <Inbox className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
              <p className="text-sm font-medium text-base-content/70">No inquiries received yet.</p>
              <p className="text-xs text-base-content/50 mt-1">
                When visitors submit your contact form, their messages will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 4).map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href="/admin/inquiries"
                  className="block p-4 rounded-xl bg-base-100 hover:bg-base-300/50 border border-base-300 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-base-content truncate">
                          {inquiry.name}
                        </span>
                        <span className="text-xs text-base-content/60 truncate">
                          &lt;{inquiry.email}&gt;
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-base-content/80 line-clamp-1">
                        {inquiry.subject}
                      </p>
                      <p className="text-xs text-base-content/60 mt-1 line-clamp-2">
                        {inquiry.message}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          inquiry.status === "new"
                            ? "bg-primary/15 text-primary border-primary/30"
                            : inquiry.status === "in_review"
                            ? "bg-warning/15 text-warning border-warning/30"
                            : inquiry.status === "contacted"
                            ? "bg-success/15 text-success border-success/30"
                            : "bg-base-300 text-base-content/60 border-base-300"
                        }`}
                      >
                        {inquiry.status.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-base-content/50">
                        {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Quick Actions & System Overview */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
            <h2 className="text-base font-bold text-base-content flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3 rounded-xl bg-base-100 hover:bg-base-300/60 border border-base-300 transition-colors text-xs font-semibold text-base-content"
              >
                <div className="flex items-center gap-2.5">
                  <FolderGit2 className="w-4 h-4 text-secondary" />
                  <span>Add New Project</span>
                </div>
                <ChevronRight className="w-4 h-4 text-base-content/40" />
              </Link>

              <Link
                href="/admin/skills"
                className="flex items-center justify-between p-3 rounded-xl bg-base-100 hover:bg-base-300/60 border border-base-300 transition-colors text-xs font-semibold text-base-content"
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span>Update Skills & Tech</span>
                </div>
                <ChevronRight className="w-4 h-4 text-base-content/40" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-base-100 hover:bg-base-300/60 border border-base-300 transition-colors text-xs font-semibold text-base-content"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Edit Profile & Social Links</span>
                </div>
                <ChevronRight className="w-4 h-4 text-base-content/40" />
              </Link>
            </div>
          </div>

          {/* Quick Portfolio Status Info */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
            <h2 className="text-base font-bold text-base-content mb-3">Portfolio Status</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-base-300/50">
                <span className="text-base-content/70">Available For Hire</span>
                <span className="text-success font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" /> Yes (Open)
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-base-300/50">
                <span className="text-base-content/70">Data Engine</span>
                <span className="text-primary font-mono text-[11px]">Local JSON / Atomic</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-base-300/50">
                <span className="text-base-content/70">Email Dispatch</span>
                <span className="text-base-content">EmailJS + CRM Inbox</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-base-content/70">Primary Email</span>
                <span className="text-base-content font-medium truncate max-w-[150px]">{profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Preview Table */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-base-content flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-secondary" />
              Flagship Projects Status
            </h2>
            <p className="text-xs text-base-content/70 mt-0.5">
              Live projects currently showcased on your portfolio.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            Manage all ({projects.length}) <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-base-300 text-base-content/60 font-semibold">
                <th className="pb-3 pl-2">Project</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Technologies</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300/50">
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id} className="hover:bg-base-100/50">
                  <td className="py-3 pl-2 font-semibold text-base-content">
                    <div>{project.title}</div>
                    <div className="text-[11px] text-base-content/60 font-normal truncate max-w-xs">{project.tagline}</div>
                  </td>
                  <td className="py-3 text-base-content/80">{project.category}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-base-100 text-[10px] text-base-content/80 border border-base-300"
                        >
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-base-content/50">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3">
                    {project.featured ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary border border-primary/30">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] text-base-content/60 bg-base-100 border border-base-300">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <Link
                      href="/admin/projects"
                      className="text-primary hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
