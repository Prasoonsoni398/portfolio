"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  RefreshCw,
  X
} from "lucide-react";
import { Service } from "@/types/service";

const emptyService: Service = {
  id: "",
  title: "",
  shortDescription: "",
  detailedDescription: "",
  iconName: "Layout",
  deliverables: [],
  techStack: []
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service>(emptyService);
  const [isEditing, setIsEditing] = useState(false);
  const [deliverablesText, setDeliverablesText] = useState("");
  const [techText, setTechText] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setIsEditing(false);
    setEditingItem({
      ...emptyService,
      id: "srv-" + Date.now().toString(36)
    });
    setDeliverablesText("");
    setTechText("");
    setModalOpen(true);
  }

  function handleOpenEdit(item: Service) {
    setIsEditing(true);
    setEditingItem(item);
    setDeliverablesText(item.deliverables ? item.deliverables.join("\n") : "");
    setTechText(item.techStack ? item.techStack.join(", ") : "");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Service = {
      ...editingItem,
      deliverables: deliverablesText
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
      techStack: techText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    };

    try {
      const res = await fetch("/api/admin/services", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(isEditing ? "Service updated!" : "Service created!");
        setModalOpen(false);
        fetchServices();
      } else {
        alert(data.error || "Failed to save service");
      }
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Error saving service");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        showFeedback(`Service "${title}" deleted`);
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
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
            <Sparkles className="w-3.5 h-3.5" />
            OFFERINGS &bull; {services.length} SERVICES
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Freelance & Engineering Services
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage your service cards, deliverables, scopes, and consulting value propositions.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-base-content/50">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
          Loading services...
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
          <Sparkles className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
          <p className="text-sm font-semibold text-base-content">No services defined</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-base-200 border border-base-300 rounded-2xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-base-100 hover:bg-base-300 text-base-content/80 hover:text-base-content border border-base-300 transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg bg-base-100 hover:bg-error/20 text-base-content/60 hover:text-error border border-base-300 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base text-base-content">{item.title}</h3>
                <p className="text-xs text-base-content/80 font-medium">{item.shortDescription}</p>
                <p className="text-xs text-base-content/70 leading-relaxed line-clamp-3">
                  {item.detailedDescription}
                </p>

                {item.deliverables && item.deliverables.length > 0 && (
                  <div className="pt-2 border-t border-base-300/50">
                    <span className="text-[10px] uppercase font-semibold text-base-content/50 block mb-1">
                      Deliverables:
                    </span>
                    <ul className="text-xs text-base-content/80 space-y-1">
                      {item.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-success shrink-0" />
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.techStack && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.techStack.map((t) => (
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
                <Sparkles className="w-4 h-4 text-primary" />
                {isEditing ? "Edit Service" : "Add Service"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-base-content/60 hover:text-base-content"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Modern Web Application Development"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.shortDescription}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, shortDescription: e.target.value })
                  }
                  placeholder="Concise one-line summary"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.detailedDescription}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, detailedDescription: e.target.value })
                  }
                  placeholder="Comprehensive description of process and value..."
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Key Deliverables (one per line)
                </label>
                <textarea
                  rows={3}
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  placeholder="Responsive Next.js frontend&#10;REST API endpoints&#10;Lighthouse 95+ score"
                  className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                  placeholder="React, Next.js, Node.js, TypeScript"
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
                  {saving ? "Saving..." : isEditing ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
