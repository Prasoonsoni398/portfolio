"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckCircle,
  RefreshCw,
  X,
  Search,
  Pencil
} from "lucide-react";
import { SkillGroup, SkillItem } from "@/types/skill";
import { AdminHeaderPortal } from "@/components/admin/AdminHeaderPortal";
import { Dropdown } from "@/components/common/Dropdown";

export default function AdminSkillsPage() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Modal for adding/editing a skill
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSkillName, setOriginalSkillName] = useState("");
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

  function handleOpenAddSkill(category?: string) {
    setIsEditing(false);
    setOriginalSkillName("");
    const cat = category || (selectedCategory !== "all" ? selectedCategory : skillGroups[0]?.category || "Frontend");
    setTargetCategory(cat);
    setNewSkillName("");
    setNewSkillLevel("Advanced");
    setNewSkillDesc("");
    setNewSkillApplied("");
    setModalOpen(true);
  }

  function handleOpenEditSkill(category: string, skill: SkillItem) {
    setIsEditing(true);
    setOriginalSkillName(skill.name);
    setTargetCategory(category);
    setNewSkillName(skill.name);
    setNewSkillLevel(skill.level);
    setNewSkillDesc(skill.description);
    setNewSkillApplied(skill.appliedIn ? skill.appliedIn.join(", ") : "");
    setModalOpen(true);
  }

  function handleSaveSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const skillPayload: SkillItem = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      description: newSkillDesc.trim(),
      appliedIn: newSkillApplied
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    };

    let updated: SkillGroup[];

    if (isEditing) {
      updated = skillGroups.map((group) => {
        if (group.category === targetCategory) {
          const exists = group.skills.some((s) => s.name === originalSkillName);
          if (exists) {
            return {
              ...group,
              skills: group.skills.map((s) => (s.name === originalSkillName ? skillPayload : s))
            };
          } else {
            // Skill moved to this category
            return {
              ...group,
              skills: [...group.skills, skillPayload]
            };
          }
        } else {
          // Remove from old category if category was changed
          return {
            ...group,
            skills: group.skills.filter((s) => s.name !== originalSkillName)
          };
        }
      });
    } else {
      updated = skillGroups.map((group) => {
        if (group.category === targetCategory) {
          return {
            ...group,
            skills: [...group.skills, skillPayload]
          };
        }
        return group;
      });
    }

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

  // Flatten skills with category info for unified single-section rendering
  const allSkills = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({ ...skill, category: group.category }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch =
      !search ||
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-base-200 border border-primary/40 text-primary text-xs font-semibold shadow-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          {feedback}
        </div>
      )}

      {/* Top Filter Tabs in Top Header Highlighted Part */}
      <AdminHeaderPortal>
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto overflow-y-hidden no-scrollbar h-full" aria-label="Skill Categories">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`h-full px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
              selectedCategory === "all"
                ? "border-primary text-primary"
                : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
            }`}
          >
            <span>All Skills</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-base-200 text-base-content/80 font-mono">
              {totalSkillsCount}
            </span>
          </button>

          {skillGroups.map((group) => {
            const isSelected = selectedCategory === group.category;
            return (
              <button
                key={group.category}
                onClick={() => setSelectedCategory(group.category)}
                className={`h-full px-2.5 sm:px-3 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap border-b-2 cursor-pointer ${
                  isSelected
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
                }`}
              >
                <span>{group.category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? "bg-primary/20 text-primary" : "bg-base-200 text-base-content/80"
                }`}>
                  {group.skills.length}
                </span>
              </button>
            );
          })}
        </nav>
      </AdminHeaderPortal>

      {/* Single Toolbar Row: Search on Left, Actions on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="w-3.5 h-3.5 text-base-content/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skill name or description..."
            className="w-full pl-9 pr-3 py-2 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <button
            onClick={() => handleOpenAddSkill(selectedCategory === "all" ? "Frontend" : selectedCategory)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
          <button
            onClick={fetchSkills}
            className="inline-flex items-center justify-center p-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Reload Skills"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Skills Single Section Grid (No Wrapper Box) */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading skills...
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
          <p className="text-sm font-semibold text-base-content">No skills found</p>
          <p className="text-xs text-base-content/60 mt-1">Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={`${skill.category}-${skill.name}`}
              className="p-3.5 rounded-xl bg-base-200 border border-base-300 hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="font-bold text-xs text-base-content truncate" title={skill.name}>
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span
                    className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        skill.level === "Advanced"
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : skill.level === "Proficient"
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : "bg-base-300 text-base-content/70 border border-base-300"
                      }`}
                    >
                      {skill.level}
                    </span>
                    <button
                      onClick={() => handleOpenEditSkill(skill.category, skill)}
                      className="opacity-0 group-hover:opacity-100 text-base-content/40 hover:text-primary p-0.5 rounded transition-all cursor-pointer"
                      title="Edit Skill"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.category, skill.name)}
                      className="opacity-0 group-hover:opacity-100 text-base-content/40 hover:text-error p-0.5 rounded transition-all cursor-pointer"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {selectedCategory === "all" && (
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-base-100 text-base-content/70 border border-base-300 mb-2">
                    {skill.category}
                  </span>
                )}

                <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed">{skill.description}</p>

                {skill.appliedIn && skill.appliedIn.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {skill.appliedIn.map((app) => (
                      <span
                        key={app}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-base-100 text-base-content/70 border border-base-300"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-base-300">
              <h3 className="font-bold text-sm text-base-content">
                {isEditing ? `Edit Skill: ${originalSkillName}` : `Add Skill to "${targetCategory}"`}
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
                <Dropdown
                  label="Category *"
                  value={targetCategory}
                  onChange={(val) => setTargetCategory(val)}
                  options={skillGroups.map((g) => ({
                    value: g.category,
                    label: g.category
                  }))}
                />
              </div>

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
                <Dropdown
                  label="Proficiency Level *"
                  value={newSkillLevel}
                  onChange={(val) => setNewSkillLevel(val as "Proficient" | "Advanced" | "Intermediate")}
                  options={[
                    { value: "Advanced", label: "Advanced" },
                    { value: "Proficient", label: "Proficient" },
                    { value: "Intermediate", label: "Intermediate" }
                  ]}
                />
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
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
