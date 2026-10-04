"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Plus,
  Trash2,
  CheckCircle,
  RefreshCw,
  X
} from "lucide-react";
import { SkillGroup, SkillItem } from "@/types/skill";

export default function AdminSkillsPage() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal for adding a skill
  const [modalOpen, setModalOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<string>("");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"Proficient" | "Advanced" | "Intermediate">("Advanced");
  const [newSkillDesc, setNewSkillDesc] = useState("");
  const [newSkillApplied, setNewSkillApplied] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success && Array.isArray(data.skills)) {
        setSkillGroups(data.skills);
      }
    } catch (err) {
      console.error("Failed to load skills:", err);
    } finally {
      setLoading(false);
    }
  }

  async function persistSkills(updated: SkillGroup[]) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setSkillGroups(updated);
        showFeedback("Skills updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update skills:", err);
      alert("Error saving skills");
    } finally {
      setSaving(false);
    }
  }

  function handleOpenAddSkill(category: string) {
    setTargetCategory(category);
    setNewSkillName("");
    setNewSkillLevel("Advanced");
    setNewSkillDesc("");
    setNewSkillApplied("");
    setModalOpen(true);
  }

  function handleSaveSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillItem = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      description: newSkillDesc.trim(),
      appliedIn: newSkillApplied
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    };

    const updated = skillGroups.map((group) => {
      if (group.category === targetCategory) {
        return {
          ...group,
          skills: [...group.skills, newSkill]
        };
      }
      return group;
    });

    persistSkills(updated);
    setModalOpen(false);
  }

  function handleDeleteSkill(categoryName: string, skillName: string) {
    if (!confirm(`Delete skill "${skillName}" from ${categoryName}?`)) return;

    const updated = skillGroups.map((group) => {
      if (group.category === categoryName) {
        return {
          ...group,
          skills: group.skills.filter((s) => s.name !== skillName)
        };
      }
      return group;
    });

    persistSkills(updated);
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }

  const totalSkillsCount = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

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
            <Wrench className="w-3.5 h-3.5" />
            TECH STACK &bull; {totalSkillsCount} SKILLS ACROSS {skillGroups.length} CATEGORIES
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Skills & Competencies Manager
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Configure your technical proficiencies, frameworks, tools, and project associations.
          </p>
        </div>

        <button
          onClick={fetchSkills}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-semibold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Reload</span>
        </button>
      </div>

      {/* Skills Groups List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading skills...
        </div>
      ) : (
        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-4"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-base-300/50">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-base-content">{group.category}</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {group.skills.length} skills
                    </span>
                  </div>
                  <p className="text-xs text-base-content/70 mt-0.5">{group.description}</p>
                </div>

                <button
                  onClick={() => handleOpenAddSkill(group.category)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              {/* Skills Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-base-100 border border-base-300 hover:border-primary/40 transition-colors flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-xs text-base-content">{skill.name}</span>
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            skill.level === "Advanced"
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : skill.level === "Proficient"
                              ? "bg-secondary/15 text-secondary border border-secondary/30"
                              : "bg-base-300 text-base-content/70 border border-base-300"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-base-content/70 line-clamp-2">{skill.description}</p>

                      {skill.appliedIn && skill.appliedIn.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {skill.appliedIn.map((app) => (
                            <span
                              key={app}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-base-200 text-base-content/70 border border-base-300"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-base-300/50 flex justify-end">
                      <button
                        onClick={() => handleDeleteSkill(group.category, skill.name)}
                        className="text-base-content/40 hover:text-error p-1 rounded transition-colors"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300">
              <h3 className="font-bold text-sm text-base-content">
                Add Skill to &quot;{targetCategory}&quot;
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-base-content/60 hover:text-base-content"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Next.js, Docker, PostgreSQL"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Proficiency Level *
                </label>
                <select
                  value={newSkillLevel}
                  onChange={(e) =>
                    setNewSkillLevel(
                      e.target.value as "Proficient" | "Advanced" | "Intermediate"
                    )
                  }
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                >
                  <option value="Advanced" className="bg-base-200">
                    Advanced
                  </option>
                  <option value="Proficient" className="bg-base-200">
                    Proficient
                  </option>
                  <option value="Intermediate" className="bg-base-200">
                    Intermediate
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Description / Focus
                </label>
                <textarea
                  rows={2}
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  placeholder="Key concepts or capabilities mastered..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-base-content/70 mb-1">
                  Applied In (comma separated)
                </label>
                <input
                  type="text"
                  value={newSkillApplied}
                  onChange={(e) => setNewSkillApplied(e.target.value)}
                  placeholder="Cravings, Real-Time Chat, Freelance"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-base-300 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-base-content/70 hover:text-base-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-xs font-semibold shadow-xs"
                >
                  {saving ? "Saving..." : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
