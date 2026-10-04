"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Cpu,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Lock,
  Workflow,
  Eye,
  Activity,
  Flame
} from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { projects as defaultProjects } from "@/mockdata/projects";
import { Project } from "@/types/project";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Badge } from "../common/Badge";

export function ProjectsSection({ projects: propProjects }: { projects?: Project[] } = {}) {
  const projects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailTab, setDetailTab] = useState<"overview" | "architecture" | "features">("overview");
  const [showXRay, setShowXRay] = useState(false);
  const [activeMetricIndex, setActiveMetricIndex] = useState<number | null>(null);

  // 3D Tilt State for the Interactive Mockup
  const previewRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0
  });

  const project = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setActiveMetricIndex(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setActiveMetricIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse Move for 3D Tilt Effect on Preview
  const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = previewRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyle({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.18
    });
  };

  const handlePreviewMouseLeave = () => {
    setTiltStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0
    });
  };

  return (
    <SectionWrapper id="projects" altBg className="py-12 md:py-16">
      <SectionHeading
        badge="Engineering Portfolio"
        title="Featured Flagship Projects"
        subtitle="Explore one verified full-stack architecture at a time with interactive live mockups and technical specifications."
      />

      {/* Top Project Selector Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-base-300/80">
        <div className="flex flex-wrap items-center gap-2">
          {projects.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setActiveMetricIndex(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md scale-102"
                    : "bg-base-100 text-base-content/75 hover:bg-base-200 border border-base-300"
                }`}
              >
                <span className="font-mono opacity-70">0{idx + 1}.</span>
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-base-content/60 mr-2">
            0{currentIndex + 1} / 0{projects.length}
          </span>
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-xl bg-base-100 hover:bg-base-200 text-base-content border border-base-300 transition-colors active:scale-90 shadow-xs"
            title="Previous project (Left arrow)"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-xl bg-base-100 hover:bg-base-200 text-base-content border border-base-300 transition-colors active:scale-90 shadow-xs"
            title="Next project (Right arrow)"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container: Compact, Sleek Height with Full Interactivity */}
      <div className="rounded-3xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT SIDE: Interactive Project Visual Mockup & Actions */}
          <div className="lg:col-span-6 p-5 sm:p-6 bg-base-200/40 border-b lg:border-b-0 lg:border-r border-base-300 flex flex-col justify-between gap-4">
            <div className="space-y-3.5">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{project.category}</Badge>
                  {project.featured && <Badge variant="secondary">Featured Architecture</Badge>}
                </div>
                <span className="text-[11px] font-mono text-base-content/50">
                  Project #{currentIndex + 1}
                </span>
              </div>

              {/* Interactive 3D Tilt Browser Mockup Frame */}
              <div
                ref={previewRef}
                onMouseMove={handlePreviewMouseMove}
                onMouseLeave={handlePreviewMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltStyle.rotateX.toFixed(2)}deg) rotateY(${tiltStyle.rotateY.toFixed(2)}deg) scale3d(1, 1, 1)`,
                  transition: "transform 0.15s ease-out, box-shadow 0.2s ease"
                }}
                className="relative rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-lg group cursor-pointer"
              >
                {/* Specular Glare Reflection following cursor */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
                  style={{
                    background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, var(--primary), transparent 60%)`,
                    opacity: tiltStyle.glareOpacity
                  }}
                />

                {/* Browser top chrome with Interactive X-Ray Toggle */}
                <div className="px-3 py-2 bg-base-200 border-b border-base-300 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-warning/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-success/70 inline-block" />
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-base-100 border border-base-300/80 text-[10px] font-mono text-base-content/60">
                    <Lock className="w-2.5 h-2.5 text-success" />
                    <span>https://{project.slug}.dev</span>
                  </div>

                  {/* Interactive Architecture X-Ray Switch */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowXRay(!showXRay);
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all ${
                      showXRay
                        ? "bg-primary text-primary-content shadow-xs"
                        : "bg-base-100 text-base-content/70 hover:text-base-content border border-base-300"
                    }`}
                    title="Toggle Architecture X-Ray Overlay"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{showXRay ? "Normal" : "X-Ray"}</span>
                  </button>
                </div>

                {/* Visual Image Container - Compact Height */}
                <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-base-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      showXRay ? "filter blur-xs brightness-75 scale-102" : "group-hover:scale-102"
                    }`}
                    priority
                  />

                  {/* Architecture X-Ray Dynamic Overlay */}
                  {showXRay && (
                    <div className="absolute inset-0 bg-base-300/85 backdrop-blur-xs p-4 flex flex-col justify-between z-10 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-primary">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 animate-pulse" /> Live Telemetry
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px]">
                          Active Node
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded-lg bg-base-100/90 border border-base-300">
                          <span className="text-base-content/60 block text-[9px]">Data Pipeline</span>
                          <span className="text-primary font-bold">{project.architectureComponents?.[0]?.name || "REST Gateway"}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-base-100/90 border border-base-300">
                          <span className="text-base-content/60 block text-[9px]">State Storage</span>
                          <span className="text-secondary font-bold">{project.architectureComponents?.[1]?.name || "Indexed DB"}</span>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-base-content/75 flex items-center justify-between border-t border-base-300 pt-1.5">
                        <span>Status: <strong className="text-success">Verified Production</strong></span>
                        <span>Click X-Ray to exit</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-base-content tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-primary font-mono font-medium mt-0.5">
                  {project.tagline}
                </p>
              </div>

              {/* Verified Metrics Chips - Compact & Clickable */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  {project.metrics.map((m, idx) => {
                    const isSelected = activeMetricIndex === idx;
                    return (
                      <div
                        key={m.label}
                        onClick={() => setActiveMetricIndex(isSelected ? null : idx)}
                        className={`p-2 rounded-xl text-center cursor-pointer transition-all duration-200 border ${
                          isSelected
                            ? "bg-primary/10 border-primary ring-1 ring-primary/40 shadow-xs"
                            : "bg-base-100 border-base-300 hover:border-primary/50 hover:bg-base-200/60"
                        }`}
                        title="Click to highlight metric"
                      >
                        <span className="block text-[9px] text-base-content/60 font-mono uppercase tracking-wider">{m.label}</span>
                        <span className="block text-xs sm:text-sm font-extrabold text-primary mt-0.5">{m.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Action Links on Left */}
            <div className="pt-3 border-t border-base-300 flex flex-wrap items-center gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-colors shadow-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Demo</span>
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline ml-auto"
              >
                <span>Full Case Study</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Compact, High-Density Technical Specifications */}
          <div className="lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between gap-4 bg-base-100">
            <div className="space-y-4">
              {/* Detail Navigation Tabs */}
              <div className="flex items-center gap-1.5 border-b border-base-300 pb-2.5">
                {[
                  { id: "overview", label: "Overview & Impact", icon: <Sparkles className="w-3.5 h-3.5" /> },
                  { id: "architecture", label: "Architecture & Data", icon: <Cpu className="w-3.5 h-3.5" /> },
                  { id: "features", label: "Features & Stack", icon: <Layers className="w-3.5 h-3.5" /> }
                ].map((tab) => {
                  const isSelected = detailTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDetailTab(tab.id as typeof detailTab)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-primary text-primary-content shadow-sm"
                          : "text-base-content/70 hover:bg-base-200"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Overview, Problem & Solution (Side-by-Side 2-Column to cut height) */}
              {detailTab === "overview" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono">
                      Project Summary
                    </h4>
                    <p className="text-xs sm:text-[13px] text-base-content/85 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* 2-Column Grid for Challenge & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                    <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300 space-y-1 hover:border-warning/40 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-warning flex items-center gap-1 font-mono">
                        <AlertTriangle className="w-3 h-3" /> The Challenge
                      </span>
                      <p className="text-[11px] sm:text-xs text-base-content/80 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300 space-y-1 hover:border-success/40 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-success flex items-center gap-1 font-mono">
                        <CheckCircle className="w-3 h-3" /> Architectural Solution
                      </span>
                      <p className="text-[11px] sm:text-xs text-base-content/80 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {project.challenges && (
                    <div className="p-2.5 rounded-xl bg-base-200/40 border border-base-300 flex items-start gap-2 text-xs">
                      <Flame className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div className="text-[11px] text-base-content/80 leading-relaxed">
                        <strong className="text-base-content font-mono font-bold block text-[10px] uppercase">
                          Key Production Bottleneck Resolved:
                        </strong>
                        {project.challenges[0]}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Architecture & Data Pipeline */}
              {detailTab === "architecture" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5 text-primary" /> System Architecture Flow
                    </h4>
                    <p className="text-xs text-base-content/75 leading-relaxed">
                      {project.architectureSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.architectureComponents?.map((comp) => (
                      <div key={comp.name} className="p-2.5 rounded-xl bg-base-200/60 border border-base-300 space-y-0.5 hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-primary">{comp.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-base-100 text-base-content/70 border border-base-300">
                            {comp.tech}
                          </span>
                        </div>
                        <p className="text-[10px] text-base-content/70 leading-relaxed line-clamp-2">{comp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Features & Tech Stack */}
              {detailTab === "features" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1.5">
                      Key Capabilities &amp; Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-1.5 p-2 rounded-xl bg-base-200/40 border border-base-300/60 text-[11px] text-base-content/80">
                          <CheckCircle className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-base-content/60 font-mono mb-1.5">
                      Technologies &amp; Libraries
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-lg bg-base-200 hover:bg-base-300 text-base-content border border-base-300 text-[11px] font-mono transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Project Thumbnail Strip & Navigation Dots */}
            <div className="pt-3 border-t border-base-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveMetricIndex(null);
                    }}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      idx === currentIndex
                        ? "w-7 bg-primary"
                        : "w-2 bg-base-300 hover:bg-base-content/40"
                    }`}
                    title={`Switch to ${p.title}`}
                    aria-label={`Jump to project ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors shadow-xs"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors shadow-xs"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
