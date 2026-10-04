"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  X,
  MapPin
} from "lucide-react";
import { Education } from "@/types/education";
import { AdminHeaderPortal } from "@/components/admin/AdminHeaderPortal";

const emptyEducation: Education = {
  id: "",
  degree: "",
  field: "Computer Science & Engineering",
  institution: "",
  university: "RGPV Bhopal",
  location: "Bhopal, Madhya Pradesh",
  completionYear: "2026",
  highlights: [],
  coursework: []
};

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education>(emptyEducation);
  const [isEditing, setIsEditing] = useState(false);
  const [highlightsText, setHighlightsText] = useState("");
  const [courseworkText, setCourseworkText] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/education");
      const data = await res.json();
      if (data.success && Array.isArray(data.education)) {
        setEducations(data.education);
      }
    } catch (err) {
      console.error("Failed to load education:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setIsEditing(false);
    setEditingItem({
      ...emptyEducation,
      id: "edu-" + Date.now().toString(36)
    });
    setHighlightsText("");
    setCourseworkText("");
    setModalOpen(true);
  }

  function handleOpenEdit(item: Education) {
    setIsEditing(true);
    setEditingItem(item);
    setHighlightsText(item.highlights ? item.highlights.join("\n") : "");
    setCourseworkText(item.coursework ? item.coursework.join(", ") : "");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Education = {
      ...editingItem,
      highlights: highlightsText
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      coursework: courseworkText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/education", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditing ? "Education updated!" : "Education record added!");
        setModalOpen(false);
        fetchEducation();
      } else {
        alert(data.error || "Failed to save education record");
      }
    } catch (err) {
      console.error("Error saving education:", err);
      alert("Error saving education record");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, degree: string) {
    if (!confirm(`Are you sure you want to delete "${degree}"?`)) return;

    try {
      const res = await fetch(`/api/admin/education?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setEducations((prev) => prev.filter((e) => e.id !== id));
        showFeedback(`Record "${degree}" removed`);
      }
    } catch (err) {
      console.error("Failed to delete education:", err);
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
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Top Filter Tabs in Top Header Highlighted Part */}
      <AdminHeaderPortal>
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar -mb-px" aria-label="Education Filter">
          <button
            className="pb-3.5 pt-1 px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 border-primary text-primary cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>All Qualifications</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-primary/20 text-primary">
              {educations.length}
            </span>
          </button>
        </nav>
      </AdminHeaderPortal>

      {/* Education List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading education records...
        </div>
      ) : educations.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
          <GraduationCap className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
          <p className="text-sm font-semibold text-base-content">No education records found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((item) => (
            <div
              key={item.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-6 hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-base text-base-content">{item.degree}</h3>
                  <span className="text-base-content/40">&bull;</span>
                  <span className="text-sm font-semibold text-primary">{item.field}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-base-100 text-base-content/80 border border-base-300">
                    Graduating {item.completionYear}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-base-content/70">
                  <span className="font-semibold text-base-content">{item.institution}</span>
                  {item.university && (
                    <span className="text-base-content/60">({item.university})</span>
                  )}
                  <span className="flex items-center gap-1 text-base-content/50">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-base-content/70 space-y-1 pt-2">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                {item.coursework && item.coursework.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-semibold text-base-content/50 block mb-1">
                      Key Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] px-2 py-0.5 rounded bg-base-100 text-base-content/80 border border-base-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300 transition-colors"
                  title="Edit Education"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.degree)}
                  className="p-2 rounded-xl bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300 transition-colors"
                  title="Delete Education"
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
                <GraduationCap className="w-4 h-4 text-primary" />
                {isEditing ? "Edit Education" : "Add Education Record"}
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
                    Degree *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.degree}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, degree: e.target.value })
                    }
                    placeholder="e.g. Bachelor of Technology (B.Tech)"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.field}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, field: e.target.value })
                    }
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Institution / College *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.institution}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, institution: e.target.value })
                    }
                    placeholder="e.g. Bansal Institute of Science & Technology"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    University Affiliation
                  </label>
                  <input
                    type="text"
                    value={editingItem.university}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, university: e.target.value })
                    }
                    placeholder="e.g. RGPV Bhopal"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="e.g. Bhopal, Madhya Pradesh"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Completion / Expected Year
                  </label>
                  <input
                    type="text"
                    value={editingItem.completionYear}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, completionYear: e.target.value })
                    }
                    placeholder="e.g. 2026"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Highlights & Achievements (one per line)
                </label>
                <textarea
                  rows={2}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="First Division honors&#10;Lead Student Technical Coordinator"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Coursework (comma separated)
                </label>
                <input
                  type="text"
                  value={courseworkText}
                  onChange={(e) => setCourseworkText(e.target.value)}
                  placeholder="Data Structures, Algorithms, OS, DBMS, Computer Networks"
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
                  {saving ? "Saving..." : isEditing ? "Update Education" : "Add Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
