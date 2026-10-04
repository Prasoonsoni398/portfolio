"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle,
  Star,
  RefreshCw,
  X
} from "lucide-react";
import { Project } from "@/types/project";
import { GithubIcon } from "@/components/common/Icons";

const CATEGORIES: Project["category"][] = [
  "Full Stack",
  "Frontend",
  "Backend",
  "Java & Algorithms",
  "Interactive App"
];

const emptyProject: Project = {
  id: "",
  title: "",
  slug: "",
  tagline: "",
  description: "",
  problem: "",
  solution: "",
  features: [],
  technologies: [],
  category: "Full Stack",
  featured: false,
  image: "/images/projects/cravings.svg",
  githubUrl: "",
  liveUrl: "",
  architectureSummary: "",
  metrics: []
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project>(emptyProject);
  const [isEditing, setIsEditing] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [techText, setTechText] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setIsEditing(false);
    setEditingProject({
      ...emptyProject,
      id: "project-" + Date.now().toString(36)
    });
    setFeaturesText("");
    setTechText("React, Next.js, TypeScript");
    setModalOpen(true);
  }

  function handleOpenEdit(project: Project) {
    setIsEditing(true);
    setEditingProject(project);
    setFeaturesText(project.features ? project.features.join("\n") : "");
    setTechText(project.technologies ? project.technologies.join(", ") : "");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Project = {
      ...editingProject,
      slug:
        editingProject.slug ||
        editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      technologies: techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditing ? "Project updated successfully!" : "Project created successfully!");
        setModalOpen(false);
        fetchProjects();
      } else {
        alert(data.error || "Failed to save project");
      }
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleFeatured(project: Project) {
    const updated = { ...project, featured: !project.featured };
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
        );
        showFeedback(
          updated.featured
            ? `Marked "${project.title}" as Featured`
            : `Removed "${project.title}" from Featured`
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showFeedback(`Project "${title}" deleted`);
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-base-300">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            CONTENT MANAGEMENT &bull; {projects.length} PROJECTS
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Projects Portfolio Manager
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Create, edit, showcase, and reorder flagship engineering projects.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-primary text-primary-content shadow-xs"
                : "bg-base-200 text-base-content/70 hover:text-base-content hover:bg-base-300 border border-base-300"
            }`}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-content shadow-xs"
                  : "bg-base-200 text-base-content/70 hover:text-base-content hover:bg-base-300 border border-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-base-content/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full pl-9 pr-3 py-1.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
          <FolderGit2 className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
          <p className="text-sm font-semibold text-base-content">No projects found</p>
          <p className="text-xs text-base-content/60 mt-1">Try adjusting your category or search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col justify-between hover:border-primary/40 transition-all group"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-base-100 text-base-content/80 border border-base-300">
                    {project.category}
                  </span>

                  <button
                    onClick={() => handleToggleFeatured(project)}
                    title={project.featured ? "Featured on Home" : "Click to feature"}
                    className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      project.featured
                        ? "bg-warning/20 text-warning border border-warning/40"
                        : "bg-base-100 text-base-content/50 hover:text-base-content border border-base-300"
                    }`}
                  >
                    <Star
                      className={`w-3 h-3 ${
                        project.featured ? "fill-warning text-warning" : ""
                      }`}
                    />
                    <span>{project.featured ? "Featured" : "Standard"}</span>
                  </button>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-bold text-base text-base-content group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-base-content/70 mt-1 line-clamp-2">
                  {project.tagline || project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-base-100 text-[10px] text-base-content/80 border border-base-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length || 0) > 4 && (
                    <span className="text-[10px] text-base-content/50 px-1 py-0.5">
                      +{(project.technologies?.length || 0) - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-base-300/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content/60 hover:text-base-content transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content/60 hover:text-primary transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="text-[11px] text-base-content/60 hover:text-base-content underline"
                  >
                    View Page
                  </Link>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded-lg bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300 transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-1.5 rounded-lg bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-base-content/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-base-200 border border-base-300 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-5 border-b border-base-300 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-base-content flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-primary" />
                  {isEditing ? `Edit "${editingProject.title}"` : "Create New Flagship Project"}
                </h2>
                <p className="text-xs text-base-content/70 mt-0.5">
                  Changes save immediately to the portfolio storage.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    placeholder="e.g. Cravings"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="e.g. cravings"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as Project["category"]
                      })
                    }
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-base-200">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Featured Project
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-base-100 border border-base-300 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.featured}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="rounded accent-primary"
                    />
                    <span className="text-xs text-base-content/80">Show on homepage showcase</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Tagline / Subtitle *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.tagline}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, tagline: e.target.value })
                  }
                  placeholder="One sentence punchy summary"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="Comprehensive explanation of what the project does..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    The Problem Solved
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.problem}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, problem: e.target.value })
                    }
                    placeholder="What challenge does this resolve?"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    The Solution
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.solution}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, solution: e.target.value })
                    }
                    placeholder="How did your architecture solve it?"
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                  placeholder="React, Next.js, Node.js, TypeScript, Tailwind CSS"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Real-time synchronized cart state&#10;Optimistic UI updates&#10;Dynamic restaurant catalog with instant filters"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-base-300 flex items-center justify-end gap-3">
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
                  {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
