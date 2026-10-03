"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactSection() {
  const { formData, errors, status, handleChange, handleSubmit, resetForm } = useContactForm();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        badge="Get in Touch"
        title="Contact &amp; Collaboration"
        subtitle="Have an opportunity, technical question, or project inquiry? Send a direct message below."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-base-300 bg-base-200/50 space-y-4">
            <h3 className="text-xl font-bold text-base-content">
              Direct Communication
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
              I am responsive over email and GitHub. Feel free to reach out for frontend development, full-stack engineering opportunities, or technical inquiries.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-base-100 border border-base-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-base-content/60 block">Email Address</span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-xs sm:text-sm font-semibold text-base-content hover:text-primary transition-colors">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-base-200 hover:bg-base-300 text-base-content/70 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-100 border border-base-300">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-base-content/60 block">Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-base-content">
                    {SITE_CONFIG.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-100 border border-base-300">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-base-content/60 block">GitHub Profile</span>
                  <a
                    href={SITE_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-primary hover:underline"
                  >
                    github.com/{SITE_CONFIG.githubUsername}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8 shadow-xl">
            {status.success ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-base-content">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-base-content/70 max-w-md mx-auto">
                    Thank you for reaching out. I have received your submission and will respond promptly.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-base-content/80 font-mono">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-2.5 rounded-xl bg-base-200 border text-xs sm:text-sm text-base-content focus:outline-none transition-colors ${
                        errors.name ? "border-error focus:border-error" : "border-base-300 focus:border-primary"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-error flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-base-content/80 font-mono">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-base-200 border text-xs sm:text-sm text-base-content focus:outline-none transition-colors ${
                        errors.email ? "border-error focus:border-error" : "border-base-300 focus:border-primary"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-error flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-base-content/80 font-mono">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Engineering Opportunity / Project Discussion"
                    className={`w-full px-4 py-2.5 rounded-xl bg-base-200 border text-xs sm:text-sm text-base-content focus:outline-none transition-colors ${
                      errors.subject ? "border-error focus:border-error" : "border-base-300 focus:border-primary"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-error flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="block text-xs font-semibold text-base-content/80 font-mono">
                      Message *
                    </label>
                    <span className="text-[10px] text-base-content/50 font-mono">Min 20 characters</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share project details, requirements, or meeting proposals..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-base-200 border text-xs sm:text-sm text-base-content focus:outline-none transition-colors resize-none ${
                      errors.message ? "border-error focus:border-error" : "border-base-300 focus:border-primary"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-error flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {status.error && (
                  <div className="p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold bg-primary text-primary-content hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {status.submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-content border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
