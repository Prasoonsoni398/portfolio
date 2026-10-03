"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, CheckCircle, Cpu, AlertTriangle } from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { Project } from "@/types/project";
import { Badge } from "../common/Badge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-base-100/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-base-100 border border-base-300 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header Bar */}
        <div className="sticky top-0 bg-base-100/95 backdrop-blur-sm px-6 py-4 border-b border-base-300 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <Badge variant="primary">{project.category}</Badge>
            <h3 className="text-lg sm:text-xl font-extrabold text-base-content tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200 border border-base-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Project Preview Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Quick Metrics Bar */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-base-200 border border-base-300 text-center">
                  <span className="block text-xs text-base-content/60 font-mono uppercase">{m.label}</span>
                  <span className="block text-base sm:text-lg font-black text-primary">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-warning flex items-center gap-1.5 font-mono">
                <AlertTriangle className="w-3.5 h-3.5" /> Problem Statement
              </span>
              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-success flex items-center gap-1.5 font-mono">
                <CheckCircle className="w-3.5 h-3.5" /> Engineering Solution
              </span>
              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Components */}
          {project.architectureComponents && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/80 flex items-center gap-2 font-mono">
                <Cpu className="w-4 h-4 text-primary" /> Architecture &amp; System Flow
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.architectureComponents.map((comp) => (
                  <div key={comp.name} className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-1">
                    <span className="text-xs font-bold text-primary block">{comp.name}</span>
                    <p className="text-[11px] text-base-content/70">{comp.description}</p>
                    <span className="text-[10px] font-mono text-base-content/50 block pt-1">{comp.tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-base-content/80 font-mono">
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-base-content/80">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Challenges */}
          {project.challenges && (
            <div className="p-5 rounded-2xl bg-base-200/30 border border-base-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/80 font-mono">
                Development Challenges Overcome
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-base-content/70 leading-relaxed">
                {project.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-base-200 text-base-content border border-base-300 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-base-100/95 backdrop-blur-sm px-6 py-4 border-t border-base-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-content hover:opacity-90 transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-200 text-base-content hover:bg-base-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
