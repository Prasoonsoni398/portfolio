"use client";

import React, { useState } from "react";
import { Download, FileText, Printer, Check, Copy } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";

export function ResumeSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${SITE_CONFIG.resumePath}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SectionWrapper id="resume" altBg>
      <SectionHeading
        badge="Curriculum Vitae"
        title="Professional Resume"
        subtitle="Comprehensive record of verified traineeship, previous content engineering, education, and technical stack."
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-base-100 border border-base-300 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-base-content block">
                Prasoon_Soni_Resume_2026.pdf
              </span>
              <span className="text-xs text-base-content/60">
                Synchronized with verified profile &bull; Updated 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
              title="Copy link to resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={SITE_CONFIG.resumePath}
              download="Prasoon_Soni_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Formatted Clean Resume Sheet */}
        <div className="rounded-3xl border border-base-300 bg-base-100 p-8 sm:p-12 shadow-xl space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-base-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-black text-base-content tracking-tight">
                {SITE_CONFIG.name}
              </h3>
              <p className="text-sm font-semibold text-primary mt-1">
                {SITE_CONFIG.shortTitle} • Trainee @ Raj Digital, Bhopal
              </p>
            </div>
            <div className="text-xs text-base-content/70 sm:text-right space-y-1 font-mono">
              <p>{SITE_CONFIG.email}</p>
              <p>{SITE_CONFIG.location}</p>
              <p>{SITE_CONFIG.githubUrl}</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
              Professional Summary
            </h4>
            <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
              Software developer focused on building responsive, scalable, and user-centric web applications with React, Next.js, TypeScript, and Node.js. Experienced in designing real-time communication systems, dynamic schema builders, and pedagogical algorithm visualizers.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
              Work Experience
            </h4>
            
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-sm font-bold text-base-content">Trainee — Raj Digital</span>
                <span className="text-xs font-mono text-base-content/60">July 2026 – Present | Bhopal, India</span>
              </div>
              <ul className="list-disc list-inside text-xs text-base-content/75 space-y-1">
                <li>Developing responsive and accessible web applications using React.js and Next.js.</li>
                <li>Collaborating in an agile team environment to translate product requirements into modular UI components.</li>
                <li>Integrating backend RESTful APIs with robust error handling and optimistic UI state updates.</li>
              </ul>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-sm font-bold text-base-content">Content Developer (Java &amp; DSA) — Raj Institute of Coding and Robotics</span>
                <span className="text-xs font-mono text-base-content/60">Jan 2025 – June 2026 | Bhopal, India</span>
              </div>
              <ul className="list-disc list-inside text-xs text-base-content/75 space-y-1">
                <li>Created 50+ animated visual solutions for complex Data Structures and Algorithms in Java.</li>
                <li>Formulated step-by-step algorithmic solutions and analyzed time/space computational complexities.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
              Education
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="text-sm font-bold text-base-content">Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering</span>
                <p className="text-xs text-base-content/70">Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal</p>
              </div>
              <span className="text-xs font-mono text-base-content/60">Completed 2026</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2 pt-2 border-t border-base-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
              Technical Skillset
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-base-content/80">
              <p><strong className="text-base-content">Frontend:</strong> React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5/CSS3</p>
              <p><strong className="text-base-content">Backend:</strong> Node.js, Express.js, REST APIs, WebSockets, Socket.io, JWT</p>
              <p><strong className="text-base-content">Databases:</strong> PostgreSQL, MongoDB, MySQL</p>
              <p><strong className="text-base-content">Core &amp; Tools:</strong> Java, Data Structures &amp; Algorithms, Git, GitHub, Postman, VS Code</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
