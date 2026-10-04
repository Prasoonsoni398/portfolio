"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  X,
  MapPin,
  Calendar
} from "lucide-react";
import { Experience } from "@/types/experience";

const emptyExperience: Experience = {
  id: "",
  role: "",
  organization: "",
  location: "Bhopal, India",
  startDate: "2024",
  endDate: "Present",
  isCurrent: true,
  type: "Full-time",
  summary: "",
  responsibilities: [],
  technologies: [],
  achievements: []
};

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience>(emptyExperience);
  const [isEditing, setIsEditing] = useState(false);
  const [respText, setRespText] = useState("");
  const [techText, setTechText] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  async function fetchExperience() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.success && Array.isArray(data.experience)) {
        setExperiences(data.experience);
      }
    } catch (err) {
      console.error("Failed to load experience:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setIsEditing(false);
    setEditingItem({
      ...emptyExperience,
      id: "exp-" + Date.now().toString(36)
    });
    setRespText("");
    setTechText("");
    setModalOpen(true);
  }

  function handleOpenEdit(item: Experience) {
    setIsEditing(true);
    setEditingItem(item);
    setRespText(item.responsibilities ? item.responsibilities.join("\n") : "");
    setTechText(item.technologies ? item.technologies.join(", ") : "");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Experience = {
      ...editingItem,
      responsibilities: respText
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      technologies: techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/experience", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditing ? "Experience updated!" : "Experience added!");
        setModalOpen(false);
        fetchExperience();
      } else {
        alert(data.error || "Failed to save experience");
      }
    } catch (err) {
      console.error("Error saving experience:", err);
      alert("Error saving experience");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, role: string) {
    if (!confirm(`Are you sure you want to delete "${role}"?`)) return;

    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
        showFeedback(`Role "${role}" removed`);
      }
    } catch (err) {
      console.error("Failed to delete experience:", err);
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            CAREER &bull; {experiences.length} ROLES
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Professional Experience Manager
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage your employment history, traineeships, and career achievements.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading experience records...
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
          <Briefcase className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
          <p className="text-sm font-semibold text-base-content">No experience records found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((item) => (
            <div
              key={item.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-6 hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-base text-base-content">{item.role}</h3>
                  <span className="text-base-content/40">&bull;</span>
                  <span className="text-sm font-semibold text-primary">{item.organization}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-base-100 text-base-content/80 border border-base-300">
                    {item.type}
                  </span>
                  {item.isCurrent && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/30">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-base-content/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-base-content/40" />
                    {item.startDate} &mdash; {item.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-base-content/40" />
                    {item.location}
                  </span>
                </div>

                <p className="text-xs text-base-content/80 leading-relaxed pt-1">{item.summary}</p>

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-base-content/70 space-y-1 pt-2">
                    {item.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-base-100 text-base-content/80 border border-base-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300 transition-colors"
                  title="Edit Experience"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.role)}
                  className="p-2 rounded-xl bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300 transition-colors"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            <div className="p-5 border-b border-base-300 flex items-center justify-between">
              <h2 className="text-base font-bold text-base-content flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                {isEditing ? "Edit Experience" : "Add Experience"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-base-content/60 hover:text-base-content"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Trainee Software Engineer"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.organization}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, organization: e.target.value })
                    }
                    placeholder="e.g. Raj Digital"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, location: e.target.value })
                    }
                    placeholder="e.g. Bhopal, India"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={editingItem.startDate}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, startDate: e.target.value })
                    }
                    placeholder="Jan 2024"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={editingItem.endDate}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, endDate: e.target.value })
                    }
                    placeholder="Present"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <select
                    value={editingItem.type}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        type: e.target.value as Experience["type"]
                      })
                    }
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  >
                    <option value="Full-time" className="bg-base-200">
                      Full-time
                    </option>
                    <option value="Traineeship" className="bg-base-200">
                      Traineeship
                    </option>
                    <option value="Educational Content Development" className="bg-base-200">
                      Educational Content Development
                    </option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isCurrent}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isCurrent: e.target.checked })
                      }
                      className="accent-primary"
                    />
                    <span className="text-xs text-base-content/80 font-medium">Currently in this role</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Summary / Overview
                </label>
                <textarea
                  rows={2}
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Overview of scope and impact..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Key Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={respText}
                  onChange={(e) => setRespText(e.target.value)}
                  placeholder="Built responsive React frontends&#10;Integrated REST APIs&#10;Conducted code reviews"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                  placeholder="React, Next.js, TypeScript, Tailwind CSS"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-base-300 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-base-content/70 hover:text-base-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm disabled:opacity-50"
                >
                  {saving ? "Saving..." : isEditing ? "Update Role" : "Add Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
