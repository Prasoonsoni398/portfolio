"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Trophy,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  X,
  ExternalLink
} from "lucide-react";
import { Certification } from "@/types/certification";
import { Achievement } from "@/types/achievement";
import { AdminHeaderPortal } from "@/components/admin/AdminHeaderPortal";

const emptyCert: Certification = {
  id: "",
  title: "",
  issuer: "",
  issueYear: "2024",
  credentialUrl: "",
  skills: []
};

const emptyAch: Achievement = {
  id: "",
  title: "",
  category: "Engineering & Hackathons",
  date: "2024",
  description: "",
  metrics: ""
};

export default function AdminCertificationsPage() {
  const [activeTab, setActiveTab] = useState<"certifications" | "achievements">("certifications");
  const [certs, setCerts] = useState<Certification[]>([]);
  const [achs, setAchs] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // Cert Modal State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification>(emptyCert);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [certSkillsText, setCertSkillsText] = useState("");

  // Achievement Modal State
  const [achModalOpen, setAchModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement>(emptyAch);
  const [isEditingAch, setIsEditingAch] = useState(false);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [cRes, aRes] = await Promise.all([
        fetch("/api/admin/certifications"),
        fetch("/api/admin/achievements")
      ]);
      const cData = await cRes.json();
      const aData = await aRes.json();
      if (cData.success && Array.isArray(cData.certifications)) setCerts(cData.certifications);
      if (aData.success && Array.isArray(aData.achievements)) setAchs(aData.achievements);
    } catch (err) {
      console.error("Failed to load certifications or achievements:", err);
    } finally {
      setLoading(false);
    }
  }

  // Cert Handlers
  function handleOpenCreateCert() {
    setIsEditingCert(false);
    setEditingCert({ ...emptyCert, id: "cert-" + Date.now().toString(36) });
    setCertSkillsText("");
    setCertModalOpen(true);
  }

  function handleOpenEditCert(item: Certification) {
    setIsEditingCert(true);
    setEditingCert(item);
    setCertSkillsText(item.skills ? item.skills.join(", ") : "");
    setCertModalOpen(true);
  }

  async function handleSaveCert(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload: Certification = {
      ...editingCert,
      skills: certSkillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/certifications", {
        method: isEditingCert ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditingCert ? "Certification updated!" : "Certification added!");
        setCertModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error("Error saving cert:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCert(id: string, title: string) {
    if (!confirm(`Delete certification "${title}"?`)) return;
    try {
      await fetch(`/api/admin/certifications?id=${id}`, { method: "DELETE" });
      setCerts((prev) => prev.filter((c) => c.id !== id));
      showFeedback(`Certification removed`);
    } catch (err) {
      console.error(err);
    }
  }

  // Achievement Handlers
  function handleOpenCreateAch() {
    setIsEditingAch(false);
    setEditingAch({ ...emptyAch, id: "ach-" + Date.now().toString(36) });
    setAchModalOpen(true);
  }

  function handleOpenEditAch(item: Achievement) {
    setIsEditingAch(true);
    setEditingAch(item);
    setAchModalOpen(true);
  }

  async function handleSaveAch(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/achievements", {
        method: isEditingAch ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAch)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditingAch ? "Achievement updated!" : "Achievement added!");
        setAchModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error("Error saving ach:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAch(id: string, title: string) {
    if (!confirm(`Delete achievement "${title}"?`)) return;
    try {
      await fetch(`/api/admin/achievements?id=${id}`, { method: "DELETE" });
      setAchs((prev) => prev.filter((a) => a.id !== id));
      showFeedback(`Achievement removed`);
    } catch (err) {
      console.error(err);
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

      {/* Single Toolbar Row */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={activeTab === "certifications" ? handleOpenCreateCert : handleOpenCreateAch}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === "certifications" ? "Add Certification" : "Add Achievement"}</span>
        </button>
      </div>

      {/* Top Filter Tabs in Top Header Highlighted Part */}
      <AdminHeaderPortal>
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar -mb-px" aria-label="Credentials Tabs">
          <button
            onClick={() => setActiveTab("certifications")}
            className={`pb-3.5 pt-1 px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === "certifications"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                activeTab === "certifications" ? "bg-primary/20 text-primary" : "bg-base-200 text-base-content/80"
              }`}
            >
              {certs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`pb-3.5 pt-1 px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === "achievements"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Achievements</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                activeTab === "achievements" ? "bg-primary/20 text-primary" : "bg-base-200 text-base-content/80"
              }`}
            >
              {achs.length}
            </span>
          </button>
        </nav>
      </AdminHeaderPortal>

      {/* Content */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading records...
        </div>
      ) : activeTab === "certifications" ? (
        /* Certifications List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-primary">
                    {c.issuer}
                  </span>
                  <span className="text-xs text-base-content/50">{c.issueYear}</span>
                </div>
                <h3 className="font-bold text-sm text-base-content mb-2">{c.title}</h3>

                {c.skills && c.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded bg-base-100 text-base-content/80 border border-base-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs">
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 text-[11px] font-semibold"
                  >
                    Verify Credential <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-base-content/40 text-[11px]">No link</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditCert(c)}
                    className="p-1.5 rounded-lg bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(c.id, c.title)}
                    className="p-1.5 rounded-lg bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Achievements List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achs.map((a) => (
            <div
              key={a.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-5 hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-warning">
                    {a.category}
                  </span>
                  <span className="text-xs text-base-content/50">{a.date}</span>
                </div>
                <h3 className="font-bold text-sm text-base-content mb-2">{a.title}</h3>
                <p className="text-xs text-base-content/80 leading-relaxed">{a.description}</p>
                {a.metrics && (
                  <div className="mt-2 text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 inline-block font-semibold">
                    {a.metrics}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEditAch(a)}
                  className="p-1.5 rounded-lg bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteAch(a.id, a.title)}
                  className="p-1.5 rounded-lg bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cert Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300">
              <h3 className="font-bold text-sm text-base-content">
                {isEditingCert ? "Edit Certification" : "Add Certification"}
              </h3>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-base-content/60 hover:text-base-content"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Meta Frontend Developer Professional"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                    Issuer *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    placeholder="e.g. Meta / Coursera"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                    Issue Year
                  </label>
                  <input
                    type="text"
                    value={editingCert.issueYear}
                    onChange={(e) => setEditingCert({ ...editingCert, issueYear: e.target.value })}
                    placeholder="2024"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Verification URL
                </label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ""}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  placeholder="https://coursera.org/verify/..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={certSkillsText}
                  onChange={(e) => setCertSkillsText(e.target.value)}
                  placeholder="React, JavaScript, HTML, CSS"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-base-300 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-base-content/70 hover:text-base-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-xs font-semibold shadow-xs"
                >
                  {saving ? "Saving..." : "Save Certification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ach Modal */}
      {achModalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300">
              <h3 className="font-bold text-sm text-base-content">
                {isEditingAch ? "Edit Achievement" : "Add Achievement"}
              </h3>
              <button
                onClick={() => setAchModalOpen(false)}
                className="text-base-content/60 hover:text-base-content"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAch} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingAch.title}
                  onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                  placeholder="e.g. 50+ DSA Solutions Authored"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingAch.category}
                    onChange={(e) =>
                      setEditingAch({
                        ...editingAch,
                        category: e.target.value as Achievement["category"]
                      })
                    }
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  >
                    <option value="Engineering & Hackathons" className="bg-base-200">
                      Engineering & Hackathons
                    </option>
                    <option value="Content & Education" className="bg-base-200">
                      Content & Education
                    </option>
                    <option value="Open Source & Academic" className="bg-base-200">
                      Open Source & Academic
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={editingAch.date}
                    onChange={(e) => setEditingAch({ ...editingAch, date: e.target.value })}
                    placeholder="2024"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingAch.description}
                  onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                  placeholder="Summary of recognition and impact..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Key Metric / Badge Text
                </label>
                <input
                  type="text"
                  value={editingAch.metrics || ""}
                  onChange={(e) => setEditingAch({ ...editingAch, metrics: e.target.value })}
                  placeholder="e.g. 50+ Solutions / 1st Place"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-base-300 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAchModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-base-content/70 hover:text-base-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-xs font-semibold shadow-xs"
                >
                  {saving ? "Saving..." : "Save Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
