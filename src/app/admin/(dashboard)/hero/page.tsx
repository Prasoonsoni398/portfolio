"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Save,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Download,
  Mail,
  User,
  Sliders,
  Eye,
  RefreshCw
} from "lucide-react";
import { ProfileSettings } from "@/types/profile";
import { AdminHeaderPortal } from "@/components/admin/AdminHeaderPortal";

const defaultProfile: ProfileSettings = {
  name: "Prasoon Soni",
  title: "Frontend Developer & Full-Stack Engineer",
  shortTitle: "Frontend / Full-Stack Developer",
  role: "Trainee at Raj Digital, Bhopal",
  bio: "I build responsive, scalable, and user-focused web applications with React, Next.js, Node.js, and TypeScript.",
  location: "Bhopal, Madhya Pradesh, India",
  email: "contact.prasoonsoni@gmail.com",
  githubUsername: "Prasoonsoni398",
  githubUrl: "https://github.com/Prasoonsoni398",
  linkedinUrl: "https://linkedin.com/in/prasoonsoni398",
  siteUrl: "https://prasoonsoni.dev",
  resumePath: "/resume/resume.pdf",
  availableForHire: true,
  heroGreeting: "Hello World, my name is",
  heroTagline: "Frontend Developer & Full-Stack Engineer",
  heroDescription: "I build responsive, scalable, and user-focused web applications with React, Next.js, Node.js, and TypeScript. Passionate about clean code, high-performance interfaces, and interactive software craftsmanship.",
  heroStatusText: "Available for Opportunities",
  heroPrimaryCtaText: "View My Work",
  heroPrimaryCtaLink: "#projects",
  heroSecondaryCtaText: "Download Resume"
};

type HeroTab = "content" | "cta" | "badge" | "preview";

export default function HeroCustomizationPage() {
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfile);
  const [activeTab, setActiveTab] = useState<HeroTab>("content");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success && data.profile) {
        setProfile({
          ...defaultProfile,
          ...data.profile
        });
      }
    } catch (err) {
      console.error("Failed to load hero profile:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("Hero section customized & saved successfully!");
      } else {
        alert("Failed to save hero customization");
      }
    } catch (err) {
      console.error("Error saving hero profile:", err);
      alert("Error saving hero settings");
    } finally {
      setSaving(false);
    }
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-base-200 border border-primary/40 text-primary text-xs font-semibold shadow-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          {feedback}
        </div>
      )}

      {/* Top Filter Tabs in Top Header Highlighted Part with active bottom border */}
      <AdminHeaderPortal>
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto overflow-y-hidden no-scrollbar h-full" aria-label="Hero Customization Tabs">
          {[
            { id: "content", label: "Headline & Bio", icon: Sparkles },
            { id: "cta", label: "CTA Buttons & Links", icon: ArrowRight },
            { id: "badge", label: "Availability Badge", icon: Sliders },
            { id: "preview", label: "Live Card Preview", icon: Eye }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as HeroTab)}
                className={`h-full px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
                  isSelected
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </AdminHeaderPortal>

      {/* Single Toolbar Row: Live Status on Left, Actions on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs font-medium text-base-content/70">
            Live on Website &bull; Changes update portfolio Hero instantly
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-semibold transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-base-content/60" />
          </Link>
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Hero..." : "Save Hero Section"}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Customization Content */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading hero settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Tab 1: Headline & Bio */}
          {activeTab === "content" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Hero Greeting
                </label>
                <input
                  type="text"
                  value={profile.heroGreeting || ""}
                  onChange={(e) => setProfile({ ...profile, heroGreeting: e.target.value })}
                  placeholder="e.g. Hello World, my name is"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
                <span className="text-[11px] text-base-content/50 mt-1 block">
                  Top small monospace greeting displayed above your name.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Headline Display Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Prasoon Soni"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary font-bold"
                />
                <span className="text-[11px] text-base-content/50 mt-1 block">
                  Large bold H1 title of the portfolio hero.
                </span>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Hero Subtitle / Professional Role
                </label>
                <input
                  type="text"
                  value={profile.heroTagline || profile.title || ""}
                  onChange={(e) => setProfile({ ...profile, heroTagline: e.target.value })}
                  placeholder="e.g. Frontend Developer & Full-Stack Engineer"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
                <span className="text-[11px] text-base-content/50 mt-1 block">
                  Secondary headline displayed under your name.
                </span>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Hero Introduction Paragraph
                </label>
                <textarea
                  rows={4}
                  value={profile.heroDescription || profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, heroDescription: e.target.value })}
                  placeholder="Tell clients, recruiters, and visitors who you are and what you build..."
                  className="w-full p-3 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary leading-relaxed"
                />
                <span className="text-[11px] text-base-content/50 mt-1 block">
                  Displayed prominently beneath the title before the CTA buttons.
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Action Buttons & CTAs */}
          {activeTab === "cta" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={profile.heroPrimaryCtaText || ""}
                  onChange={(e) => setProfile({ ...profile, heroPrimaryCtaText: e.target.value })}
                  placeholder="e.g. View My Work"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Primary CTA Link (Href)
                </label>
                <input
                  type="text"
                  value={profile.heroPrimaryCtaLink || ""}
                  onChange={(e) => setProfile({ ...profile, heroPrimaryCtaLink: e.target.value })}
                  placeholder="e.g. #projects or /projects"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={profile.heroSecondaryCtaText || ""}
                  onChange={(e) => setProfile({ ...profile, heroSecondaryCtaText: e.target.value })}
                  placeholder="e.g. Download Resume"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Resume Download Path
                </label>
                <input
                  type="text"
                  value={profile.resumePath}
                  onChange={(e) => setProfile({ ...profile, resumePath: e.target.value })}
                  placeholder="/resume/resume.pdf"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Availability Badge */}
          {activeTab === "badge" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Availability Badge Text
                </label>
                <input
                  type="text"
                  value={profile.heroStatusText || ""}
                  onChange={(e) => setProfile({ ...profile, heroStatusText: e.target.value })}
                  placeholder="e.g. Available for Opportunities"
                  className="w-full p-2.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="availableForHireToggle"
                  checked={profile.availableForHire}
                  onChange={(e) => setProfile({ ...profile, availableForHire: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-base-300 focus:ring-primary cursor-pointer"
                />
                <label htmlFor="availableForHireToggle" className="text-xs font-semibold text-base-content cursor-pointer">
                  Display pulsating green "Available for Hire" badge in Hero
                </label>
              </div>
            </div>
          )}

          {/* Tab 4: Live Card Preview */}
          {activeTab === "preview" && (
            <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
              <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">
                Hero Section Preview
              </span>

              {profile.availableForHire && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 border border-success/30 text-success text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  <span>{profile.heroStatusText || "Available for Opportunities"}</span>
                </div>
              )}

              <div className="space-y-1">
                <p className="font-mono text-xs text-primary">{profile.heroGreeting || "Hello World, my name is"}</p>
                <h2 className="text-2xl sm:text-3xl font-black text-base-content">{profile.name}</h2>
                <h3 className="text-base sm:text-lg font-bold text-base-content/80">
                  {profile.heroTagline || profile.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-base-content/75 max-w-xl leading-relaxed">
                {profile.heroDescription || profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-primary text-primary-content text-xs">
                  <span>{profile.heroPrimaryCtaText || "View My Work"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-base-100 text-base-content border border-base-300 text-xs">
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>{profile.heroSecondaryCtaText || "Download Resume"}</span>
                </span>

                <span className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-base-content/70">
                  <Mail className="w-3.5 h-3.5 text-secondary" />
                  <span>Contact Me</span>
                </span>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
