"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Mail,
  Send,
  Trash2,
  CheckCircle,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Inquiry, InquiryStatus } from "@/types/inquiry";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectInquiry(inquiry: Inquiry) {
    setSelectedInquiry(inquiry);
    setNotesInput(inquiry.notes || "");
  }

  async function handleStatusChange(id: string, newStatus: InquiryStatus) {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showFeedback(`Status updated to ${newStatus.replace("_", " ")}`);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  async function handleSaveNotes() {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedInquiry.id, notes: notesInput })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === selectedInquiry.id ? { ...item, notes: notesInput } : item
          )
        );
        setSelectedInquiry((prev) => (prev ? { ...prev, notes: notesInput } : null));
        showFeedback("Notes saved successfully");
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        showFeedback("Inquiry deleted");
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }

  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    in_review: inquiries.filter((i) => i.status === "in_review").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    archived: inquiries.filter((i) => i.status === "archived").length
  };

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
            <Inbox className="w-3.5 h-3.5" />
            CRM LEAD MANAGEMENT &bull; {statusCounts.new} NEW INQUIRIES
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Lead Inbox & Client Inquiries
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Review incoming project opportunities, messages, and track client communications.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-xs font-semibold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["all", "new", "in_review", "contacted", "archived"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? "bg-primary text-primary-content shadow-xs"
                  : "bg-base-200 text-base-content/70 hover:text-base-content hover:bg-base-300 border border-base-300"
              }`}
            >
              {status === "all" ? "All Leads" : status.replace("_", " ")}
              <span className="ml-1.5 text-[10px] opacity-80 font-mono">
                ({statusCounts[status]})
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-base-content/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, email, topic..."
            className="w-full pl-9 pr-3 py-1.5 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Two Column Layout: List on Left, Detail Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads List */}
        <div className={`${selectedInquiry ? "lg:col-span-7" : "lg:col-span-12"} space-y-3`}>
          {loading ? (
            <div className="p-12 text-center text-xs text-base-content/50">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
              Loading inquiries...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-base-300 rounded-2xl bg-base-200">
              <Inbox className="w-8 h-8 text-base-content/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-base-content">No inquiries found</p>
              <p className="text-xs text-base-content/60 mt-1">
                {search ? "No matches for your search filter." : "Your inbox is clear."}
              </p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => {
              const isSelected = selectedInquiry?.id === inquiry.id;
              return (
                <div
                  key={inquiry.id}
                  onClick={() => handleSelectInquiry(inquiry)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-primary/10 border-primary shadow-xs"
                      : "bg-base-200 hover:bg-base-300/60 border-base-300"
                  }`}
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
                        {inquiry.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-base-content/90 line-clamp-1">
                        {inquiry.subject}
                      </p>
                      <p className="text-xs text-base-content/70 mt-1 line-clamp-2">
                        {inquiry.message}
                      </p>
                      {inquiry.notes && (
                        <div className="mt-2 text-[11px] text-warning bg-warning/10 px-2.5 py-1 rounded-lg border border-warning/20 line-clamp-1">
                          📝 {inquiry.notes}
                        </div>
                      )}
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
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Inquiry Inspector Drawer */}
        {selectedInquiry && (
          <div className="lg:col-span-5 bg-base-200 border border-base-300 rounded-2xl p-6 sticky top-20 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-base-300">
              <div>
                <span className="text-[10px] font-mono uppercase text-primary font-semibold">Lead Inspector</span>
                <h3 className="text-lg font-bold text-base-content mt-0.5">{selectedInquiry.name}</h3>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-xs text-base-content/70 hover:text-primary flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3 h-3" /> {selectedInquiry.email}
                </a>
              </div>

              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                title="Delete Inquiry"
                className="p-2 rounded-xl text-base-content/60 hover:text-error hover:bg-error/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status Pipeline Buttons */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/70 mb-2">
                Pipeline Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["new", "in_review", "contacted", "archived"] as InquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedInquiry.status === st
                        ? "bg-primary text-primary-content border-primary shadow-xs"
                        : "bg-base-100 text-base-content/70 hover:text-base-content border-base-300"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Details */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/70 mb-1">
                Subject
              </label>
              <div className="p-2.5 rounded-xl bg-base-100 border border-base-300 text-xs font-semibold text-base-content">
                {selectedInquiry.subject}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/70 mb-1">
                Full Inquiry Message
              </label>
              <div className="p-3.5 rounded-xl bg-base-100 border border-base-300 text-xs text-base-content/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Email Reply Action */}
            <div>
              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                  `Re: ${selectedInquiry.subject}`
                )}&body=${encodeURIComponent(
                  `Hi ${selectedInquiry.name},\n\nThank you for reaching out via my portfolio. `
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleStatusChange(selectedInquiry.id, "contacted")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Email Reply & Mark Contacted</span>
              </a>
            </div>

            {/* Internal Notes / Memos */}
            <div className="pt-2 border-t border-base-300">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/70 mb-1">
                Internal CRM Notes
              </label>
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Private notes (e.g. rate discussion, project scope, meeting date)..."
                rows={3}
                className="w-full p-2.5 bg-base-100 border border-base-300 rounded-xl text-xs text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-3 py-1.5 rounded-lg bg-base-300 hover:bg-base-300/80 text-xs text-base-content font-semibold transition-colors"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
