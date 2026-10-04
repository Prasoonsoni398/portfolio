"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle,
  RefreshCw,
  User,
  Share2,
  Shield,
  Sparkles
} from "lucide-react";
import { ProfileSettings } from "@/types/profile";
import { AdminHeaderPortal } from "@/components/admin/AdminHeaderPortal";

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "hero" | "identity" | "social" | "security">("all");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success && data.profile) {
        setProfile(data.profile);
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("Profile and site settings updated successfully!");
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }

  if (loading || !profile) {
    return (
      <div className="p-12 text-center text-xs text-base-content/50">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
        Loading settings...
      </div>
    );
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

      {/* Single Toolbar Row */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
        </button>
      </div>

      {/* Top Filter Tabs in Top Header Highlighted Part */}
      <AdminHeaderPortal>
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar -mb-px" aria-label="Settings Sections">
          {[
            { id: "all", label: "All Settings", icon: Settings },
            { id: "identity", label: "Identity & Bio", icon: User },
            { id: "social", label: "Social & Resume", icon: Share2 },
            { id: "security", label: "Security & Env", icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3.5 pt-1 px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Bio & Identity */}
        {(activeTab === "all" || activeTab === "identity") && (
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-base-300/50">
            <User className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
              Personal Identity & Bio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Professional Role
              </label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                placeholder="e.g. Trainee at Raj Digital, Bhopal"
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Headline / Full Title
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Short Title (Navbar & Footer)
              </label>
              <input
                type="text"
                value={profile.shortTitle}
                onChange={(e) => setProfile({ ...profile, shortTitle: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
              About Bio
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.availableForHire}
                  onChange={(e) =>
                    setProfile({ ...profile, availableForHire: e.target.checked })
                  }
                  className="rounded accent-primary"
                />
                <span className="text-xs text-success font-semibold">
                  Available for Hire / Contract
                </span>
              </label>
            </div>
          </div>
        </div>
        )}

        {/* Social Links & Resume */}
        {(activeTab === "all" || activeTab === "social") && (
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-base-300/50">
            <Share2 className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
              Social Links & Resume
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={profile.githubUrl}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                GitHub Username
              </label>
              <input
                type="text"
                value={profile.githubUsername}
                onChange={(e) => setProfile({ ...profile, githubUsername: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                Resume File Path / Link
              </label>
              <input
                type="text"
                value={profile.resumePath}
                onChange={(e) => setProfile({ ...profile, resumePath: e.target.value })}
                placeholder="/resume/resume.pdf"
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        )}

        {/* Security & System Info */}
        {(activeTab === "all" || activeTab === "security") && (
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-base-300/50">
            <Shield className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-base-content uppercase tracking-wider">
              Security & Environment Settings
            </h2>
          </div>

          <p className="text-xs text-base-content/70">
            Administrator credentials and session secret can be updated securely in your local environment file:
          </p>

          <div className="p-4 rounded-xl bg-base-100 border border-base-300 font-mono text-xs text-primary space-y-1">
            <div>ADMIN_EMAIL=contact.prasoonsoni@gmail.com</div>
            <div>ADMIN_PASSWORD=admin123</div>
            <div>ADMIN_SESSION_SECRET=portfolio_crm_secret_key_...</div>
          </div>
        </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
