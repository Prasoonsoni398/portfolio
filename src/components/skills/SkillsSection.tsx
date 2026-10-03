"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { skillGroups } from "@/mockdata/skills";
import { SkillCategory, SkillItem } from "@/types/skill";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import {
  Play,
  Pause,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Database,
  Wrench,
  Code2,
  FolderGit2,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

interface SkillCardData {
  id: string;
  name: string;
  role: string;
  initials: string;
  stars: number;
  category: string;
  quote: string;
  appliedIn: string;
  badgeColor: "primary" | "secondary" | "accent" | "success" | "warning";
}

interface ActiveSkillModalData {
  name: string;
  category: string;
  roleOrLevel: string;
  initials: string;
  description: string;
  appliedIn: string[];
  badgeColor: "primary" | "secondary" | "accent" | "success" | "warning";
}

const row1Skills: SkillCardData[] = [
  {
    id: "react",
    name: "React.js",
    role: "Component Architecture",
    initials: "RJ",
    stars: 5,
    category: "Frontend",
    quote: "Building highly modular component systems, custom hooks for optimistic UI state synchronization, and virtualized feeds with zero frame drops.",
    appliedIn: "Cravings • Real-Time Chat",
    badgeColor: "primary"
  },
  {
    id: "nextjs",
    name: "Next.js",
    role: "Full-Stack & Server Components",
    initials: "NJ",
    stars: 5,
    category: "Frontend",
    quote: "Leveraging App Router, Server Components, static generation, dynamic SEO metadata, and server-side route handlers to build production web apps.",
    appliedIn: "Portfolio • Cravings",
    badgeColor: "secondary"
  },
  {
    id: "typescript",
    name: "TypeScript",
    role: "Type Systems & Schemas",
    initials: "TS",
    stars: 5,
    category: "Languages",
    quote: "Enforcing strict compile-time safety, custom generics, discriminated unions, and dynamic JSON schema compilation pipelines.",
    appliedIn: "Form Builder • All Apps",
    badgeColor: "accent"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS & FlyonUI",
    role: "Semantic Design Systems",
    initials: "TW",
    stars: 5,
    category: "Styling",
    quote: "Crafting accessible, pixel-crisp interfaces using semantic color tokens, responsive mobile-first layouts, and seamless multi-theme switching.",
    appliedIn: "Design Tokens • All Projects",
    badgeColor: "success"
  },
  {
    id: "html5-css3",
    name: "HTML5 & Modern CSS",
    role: "Semantic Markup & WCAG",
    initials: "H5",
    stars: 5,
    category: "Frontend",
    quote: "Implementing semantic HTML5 structure adhering to WCAG 2.1 AA accessibility standards, responsive CSS grid models, and micro-animations.",
    appliedIn: "Core Web Experiences",
    badgeColor: "warning"
  },
  {
    id: "vite",
    name: "Vite & Tooling",
    role: "Modern Build Engineering",
    initials: "VT",
    stars: 5,
    category: "Tools",
    quote: "Configuring high-speed Hot Module Replacement, optimized ES module bundlers, and instant developer build feedback environments.",
    appliedIn: "Single Page Applications",
    badgeColor: "primary"
  },
  {
    id: "figma",
    name: "Figma to Code",
    role: "UI/UX Engineering",
    initials: "FG",
    stars: 5,
    category: "Design",
    quote: "Translating high-fidelity Figma design tokens into clean, modular, and maintainable production React components with exact visual precision.",
    appliedIn: "Interactive UI Systems",
    badgeColor: "secondary"
  }
];

const row2Skills: SkillCardData[] = [
  {
    id: "java-dsa",
    name: "Java & Data Structures",
    role: "Algorithmic Engineering",
    initials: "JD",
    stars: 5,
    category: "Algorithms",
    quote: "Authored 50+ animated visual solutions for complex algorithms at Raj Institute, with deep mastery in trees, graphs, DP, and Big-O efficiency.",
    appliedIn: "Raj Institute Content",
    badgeColor: "warning"
  },
  {
    id: "nodejs-express",
    name: "Node.js & Express",
    role: "Backend & REST APIs",
    initials: "NE",
    stars: 5,
    category: "Backend",
    quote: "Designing non-blocking event-driven servers, robust REST API contracts, modular middleware error pipelines, and secure JWT authentication.",
    appliedIn: "Chat Backend • APIs",
    badgeColor: "success"
  },
  {
    id: "websockets",
    name: "WebSockets & Socket.io",
    role: "Real-Time Systems",
    initials: "WS",
    stars: 5,
    category: "Real-Time",
    quote: "Architecting bidirectional event gateways delivering sub-100ms message delivery, user presence heartbeats, and resilient auto-reconnections.",
    appliedIn: "Real-Time Communication App",
    badgeColor: "primary"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    role: "Relational Schemas & ACID",
    initials: "PG",
    stars: 5,
    category: "Databases",
    quote: "Structuring normalized relational schemas, foreign key constraints, indexed queries, and atomic ballot transactions for election workflows.",
    appliedIn: "Voting Management System",
    badgeColor: "secondary"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: "Document Store & Aggregation",
    initials: "MG",
    stars: 5,
    category: "Databases",
    quote: "Modeling flexible document schemas, indexed message stores, and aggregation queries for high-throughput collaborative applications.",
    appliedIn: "Chat Message Store",
    badgeColor: "accent"
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    role: "Version Control Hygiene",
    initials: "GT",
    stars: 5,
    category: "DevOps & Tools",
    quote: "Maintaining disciplined branch workflows, semantic commit hygiene, pull request code reviews, and open-source project collaboration.",
    appliedIn: "Daily Workflow • Repos",
    badgeColor: "primary"
  },
  {
    id: "postman",
    name: "Postman & API Testing",
    role: "Contract Verification",
    initials: "PM",
    stars: 5,
    category: "Testing",
    quote: "Building automated endpoint test collections, environment configurations, and simulating concurrent network request payloads.",
    appliedIn: "Backend Verification",
    badgeColor: "secondary"
  }
];

type SkillWithCategory = SkillItem & {
  category: SkillCategory;
  badgeColor: "primary" | "secondary" | "accent" | "success" | "warning";
  stars: number;
};

export function SkillsSection() {
  const [viewMode, setViewMode] = useState<"carousel" | "coverflow">("carousel");
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [coverflowIndex, setCoverflowIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeModalSkill, setActiveModalSkill] = useState<ActiveSkillModalData | null>(null);

  // Flattened skills with metadata for 3D Coverflow
  const allSkills: SkillWithCategory[] = useMemo(() => {
    const palette: ("primary" | "secondary" | "accent" | "success" | "warning")[] = [
      "primary",
      "secondary",
      "accent",
      "success",
      "warning"
    ];
    let colorIdx = 0;

    return skillGroups.flatMap((g) =>
      g.skills.map((s) => {
        const color = palette[colorIdx % palette.length];
        colorIdx++;
        return {
          ...s,
          category: g.category,
          badgeColor: color,
          stars: 5
        };
      })
    );
  }, []);

  const categories: (SkillCategory | "All")[] = [
    "All",
    "Frontend",
    "Backend",
    "Databases",
    "Programming",
    "Tools & Practices"
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Layers className="w-3.5 h-3.5" />,
    Backend: <Cpu className="w-3.5 h-3.5" />,
    Databases: <Database className="w-3.5 h-3.5" />,
    Programming: <Code2 className="w-3.5 h-3.5" />,
    "Tools & Practices": <Wrench className="w-3.5 h-3.5" />
  };

  const filteredCoverflowSkills = useMemo(() => {
    if (selectedCategory === "All") return allSkills;
    return allSkills.filter((s) => s.category === selectedCategory);
  }, [allSkills, selectedCategory]);

  const handleNextCoverflow = useCallback(() => {
    setCoverflowIndex((prev) => (prev + 1) % filteredCoverflowSkills.length);
  }, [filteredCoverflowSkills.length]);

  const handlePrevCoverflow = useCallback(() => {
    setCoverflowIndex((prev) => (prev - 1 + filteredCoverflowSkills.length) % filteredCoverflowSkills.length);
  }, [filteredCoverflowSkills.length]);

  // Auto-play for 3D Coverflow
  useEffect(() => {
    if (viewMode !== "coverflow" || !isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNextCoverflow();
    }, 3800);
    return () => clearInterval(interval);
  }, [viewMode, isAutoPlaying, handleNextCoverflow]);

  // Keyboard navigation for Coverflow
  useEffect(() => {
    if (viewMode !== "coverflow") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevCoverflow();
      if (e.key === "ArrowRight") handleNextCoverflow();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, handlePrevCoverflow, handleNextCoverflow]);

  // Open inspection modal from Marquee card
  const handleOpenFromMarquee = useCallback((skill: SkillCardData) => {
    setActiveModalSkill({
      name: skill.name,
      category: skill.category,
      roleOrLevel: skill.role,
      initials: skill.initials,
      description: skill.quote,
      appliedIn: skill.appliedIn.split(" • "),
      badgeColor: skill.badgeColor
    });
  }, []);

  // Open inspection modal from Coverflow card
  const handleOpenFromCoverflow = useCallback((skill: SkillWithCategory) => {
    setActiveModalSkill({
      name: skill.name,
      category: skill.category,
      roleOrLevel: `${skill.level} Proficiency`,
      initials: skill.name.slice(0, 2).toUpperCase(),
      description: skill.description,
      appliedIn: skill.appliedIn,
      badgeColor: skill.badgeColor
    });
  }, []);

  // Duplicate arrays for continuous infinite marquee loop
  const row1Doubled = useMemo(() => [...row1Skills, ...row1Skills], []);
  const row2Doubled = useMemo(() => [...row2Skills, ...row2Skills], []);

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        badge="Interactive Technical Stack"
        title="Skills &amp; Engineering Disciplines"
        subtitle="Explore verified capabilities across two interactive modes: continuous dual-stream marquee or dynamic 3D animated Coverflow."
      />

      {/* View Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Segmented Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-base-200 border border-base-300 self-start sm:self-auto shadow-sm">
          <button
            onClick={() => setViewMode("carousel")}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
              viewMode === "carousel"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Dual Carousel View</span>
          </button>
          <button
            onClick={() => {
              setViewMode("coverflow");
              setCoverflowIndex(0);
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
              viewMode === "coverflow"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Animated Coverflow</span>
          </button>
        </div>

        {/* Dynamic Controls based on Active View Mode */}
        {viewMode === "carousel" ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-base-content/60">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Hover to tilt cards • Click Inspect for details
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors shadow-sm"
              title={isPaused ? "Resume continuous movement" : "Pause continuous movement"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-success" /> : <Pause className="w-3.5 h-3.5 text-warning" />}
              <span>{isPaused ? "Play Stream" : "Pause Stream"}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors shadow-sm"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-warning" /> : <Play className="w-3.5 h-3.5 text-success" />}
              <span>{isAutoPlaying ? "Auto-Rotate" : "Paused"}</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevCoverflow}
                className="p-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
                title="Previous skill (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextCoverflow}
                className="p-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
                title="Next skill (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODE 1: DUAL CAROUSEL VIEW (Existing continuous stream matching reference image) */}
      {viewMode === "carousel" && (
        <div className="relative w-full overflow-hidden">
          {/* Left and Right Edge Masking Gradients / Vignette */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-base-100 via-base-100/60 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-base-100 via-base-100/60 to-transparent z-20" />

          <div
            className="space-y-6 py-2 overflow-hidden"
            style={{
              perspective: "1200px",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}
          >
            {/* ROW 1: Moves Left */}
            <div
              className="animate-marquee-left flex gap-6"
              style={{
                animationPlayState: isPaused ? "paused" : undefined
              }}
            >
              {row1Doubled.map((skill, index) => (
                <MarqueeSkillCard
                  key={`row1-${skill.id}-${index}`}
                  skill={skill}
                  onOpenDetails={handleOpenFromMarquee}
                />
              ))}
            </div>

            {/* ROW 2: Moves Right */}
            <div
              className="animate-marquee-right flex gap-6"
              style={{
                animationPlayState: isPaused ? "paused" : undefined
              }}
            >
              {row2Doubled.map((skill, index) => (
                <MarqueeSkillCard
                  key={`row2-${skill.id}-${index}`}
                  skill={skill}
                  onOpenDetails={handleOpenFromMarquee}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: 3D ANIMATED COVERFLOW VIEW (Dynamic 3D Perspective Stage) */}
      {viewMode === "coverflow" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCoverflowIndex(0);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "bg-base-200 text-base-content/75 hover:bg-base-300 border border-base-300"
                    }`}
                  >
                    {cat !== "All" && categoryIcons[cat]}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono text-base-content/60">
              {String(coverflowIndex + 1).padStart(2, "0")} / {String(filteredCoverflowSkills.length).padStart(2, "0")}
            </span>
          </div>

          {/* 3D Perspective Stage Container */}
          <div className="relative w-full h-[270px] sm:h-[290px] flex items-center justify-center overflow-hidden py-2">
            {/* Left and Right Edge Masking Gradients / Vignette */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-base-100 via-base-100/60 to-transparent z-40" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-base-100 via-base-100/60 to-transparent z-40" />

            {/* Ambient center stage spotlight */}
            <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[90px] pointer-events-none" />

            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
              }}
            >
              {filteredCoverflowSkills.map((skill, idx) => {
                // Calculate distance from center index
                const len = filteredCoverflowSkills.length;
                let offset = idx - coverflowIndex;
                if (offset > len / 2) offset -= len;
                if (offset < -len / 2) offset += len;

                // Render only visible window (-3 to +3 items) for 60fps performance
                if (Math.abs(offset) > 3) return null;

                const isCenter = offset === 0;
                // Non-linear spread: center card is unobstructed; side cards stack with clean spacing
                const translateX = isCenter
                  ? 0
                  : Math.sign(offset) * (210 + (Math.abs(offset) - 1) * 115);
                const translateZ = isCenter ? 60 : -Math.abs(offset) * 105;
                const rotateY = isCenter ? 0 : offset > 0 ? -42 : 42;
                const scale = isCenter ? 1.03 : Math.max(0.74, 1 - Math.abs(offset) * 0.12);
                const zIndex = 30 - Math.abs(offset);

                return (
                  <div
                    key={`${skill.name}-${idx}`}
                    onClick={() => {
                      if (isCenter) {
                        handleOpenFromCoverflow(skill);
                      } else {
                        setCoverflowIndex(idx);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease"
                    }}
                    className={`absolute w-[300px] sm:w-[350px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border bg-base-100 shadow-xl cursor-pointer select-none transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                      isCenter
                        ? "border-primary ring-2 ring-primary/40 shadow-primary/20 shadow-2xl"
                        : "border-base-300 hover:border-primary/40 shadow-md"
                    }`}
                  >
                    {/* Subtle dimming shade for background cards to enhance center focus */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-base-200/40 pointer-events-none z-10" />
                    )}

                    {/* Top Tag & Level */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-base-300 relative z-20">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold text-xs font-mono shadow-xs shrink-0">
                          {skill.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-extrabold text-xs sm:text-sm text-base-content block leading-tight">
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-base-content/60 font-mono">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {/* Right top indicator: live pulse on active card, clean tag on side cards */}
                      {isCenter ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                            {skill.level}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-base-200 text-base-content/60 border border-base-300 shrink-0">
                          {skill.level}
                        </span>
                      )}
                    </div>

                    {/* Middle Quote & Description - Clean 2 lines */}
                    <div className="py-2.5 relative z-20">
                      <p className="text-xs text-base-content/85 leading-relaxed font-sans line-clamp-2">
                        &ldquo;{skill.description}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Production Projects & Actions */}
                    <div className="pt-2.5 border-t border-base-300 flex items-center justify-between gap-2 relative z-20">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <FolderGit2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <div className="flex items-center gap-1 truncate">
                          {skill.appliedIn.slice(0, 2).map((app, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-base-200 text-base-content/80 border border-base-300 truncate"
                            >
                              {app}
                            </span>
                          ))}
                          {skill.appliedIn.length > 2 && (
                            <span className="text-[10px] font-mono text-base-content/50">
                              +{skill.appliedIn.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right bottom action: prominent Inspect button for center card, subtle hint on side cards */}
                      {isCenter ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenFromCoverflow(skill);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-content text-[11px] font-semibold shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 shrink-0 group/btn"
                          title={`Inspect ${skill.name} architecture details`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-base-content/40 shrink-0">
                          Click to view
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thumbnail Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {filteredCoverflowSkills.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => setCoverflowIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === coverflowIndex ? "w-7 bg-primary" : "w-2 bg-base-300 hover:bg-base-content/40"
                }`}
                title={`Jump to ${s.name}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Interactive Skill Detail Inspection Modal */}
      {activeModalSkill && (
        <SkillDetailModal
          skill={activeModalSkill}
          onClose={() => setActiveModalSkill(null)}
        />
      )}
    </SectionWrapper>
  );
}

// Interactive 3D Tilt Marquee Card with Polished Interactive Right Action
function MarqueeSkillCard({
  skill,
  onOpenDetails
}: {
  skill: SkillCardData;
  onOpenDetails: (skill: SkillCardData) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
    glareOpacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
      glareOpacity: 0
    });
  };

  const badgeClasses = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content"
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(skill)}
      style={{
        transform: style.transform,
        transition: "transform 0.15s ease-out, border-color 0.2s ease"
      }}
      className="relative w-[340px] sm:w-[380px] shrink-0 rounded-3xl border border-base-300 bg-base-200/50 hover:bg-base-200/90 hover:border-primary/50 p-6 flex flex-col justify-between gap-5 overflow-hidden shadow-md backdrop-blur-sm select-none cursor-pointer transition-colors group"
    >
      {/* Specular glare reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, var(--primary), transparent 60%)`,
          opacity: style.glareOpacity
        }}
      />

      {/* Main Technical Description */}
      <p className="text-xs sm:text-sm text-base-content/85 leading-relaxed relative z-10 font-sans">
        &ldquo;{skill.quote}&rdquo;
      </p>

      {/* Bottom Profile / Skill Stamp with Interactive Right Action */}
      <div className="flex items-center justify-between pt-3 border-t border-base-300/80 relative z-10">
        <div className="flex items-center gap-3">
          {/* Circular Initials Avatar matching screenshot */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs font-mono shadow-sm shrink-0 ${
              badgeClasses[skill.badgeColor]
            }`}
          >
            {skill.initials}
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-base-content group-hover:text-primary transition-colors">
              {skill.name}
            </span>
            <span className="text-[11px] text-base-content/60 font-medium">
              {skill.role}
            </span>
          </div>
        </div>

        {/* Visually refined, interactive Right Part */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(skill);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-content border border-primary/25 hover:border-primary shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 group/btn shrink-0"
          title={`Inspect ${skill.name} architecture & project links`}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary group-hover/btn:text-primary-content transition-colors" />
          <span>Inspect</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-primary group-hover/btn:text-primary-content transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

// Interactive Skill Architecture Modal with Direct Case Study Navigation
function SkillDetailModal({
  skill,
  onClose
}: {
  skill: ActiveSkillModalData;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const badgeClasses = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content"
  };

  // Map appliedIn project keywords to real portfolio routes
  const getProjectRoute = (appText: string) => {
    const lower = appText.toLowerCase();
    if (lower.includes("craving")) {
      return {
        title: "Cravings",
        type: "MERN Food Delivery Platform",
        href: "/projects/cravings",
        highlight: "Debounced instant search & optimistic cart state sync"
      };
    }
    if (lower.includes("chat") || lower.includes("real-time") || lower.includes("socket")) {
      return {
        title: "Real-Time Communication App",
        type: "WebSocket Collaboration Engine",
        href: "/projects/real-time-communication-app",
        highlight: "Bidirectional WebSocket gateway with sub-100ms message delivery"
      };
    }
    if (lower.includes("form")) {
      return {
        title: "Dynamic Form Builder",
        type: "Schema Compilation & AST",
        href: "/projects/form-builder",
        highlight: "Complex validation rules & dynamic JSON schema compilation"
      };
    }
    if (lower.includes("voting")) {
      return {
        title: "Online Voting Management System",
        type: "ACID Relational Election Platform",
        href: "/projects/voting-management-system",
        highlight: "Atomic ballot transactions and tamper-resistant audit trails"
      };
    }
    if (lower.includes("raj")) {
      return {
        title: "Raj Institute Educational Systems",
        type: "Algorithmic Courseware & Visuals",
        href: "/about",
        highlight: "50+ animated visual solutions for complex algorithms and trees"
      };
    }
    return {
      title: "Production Portfolio Architecture",
      type: "Modern Engineering Stack",
      href: "/projects",
      highlight: `Applied across production workflows: ${appText}`
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-base-content/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm font-mono shadow-md shrink-0 ${
                badgeClasses[skill.badgeColor]
              }`}
            >
              {skill.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-base-content">
                  {skill.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-base-content/60 font-medium">
                {skill.roleOrLevel}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-base-200 hover:bg-base-300 text-base-content/70 hover:text-base-content transition-colors"
            title="Close dialog (Escape)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Technical Architecture Quote */}
        <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
            <ShieldCheck className="w-4 h-4" />
            <span>Architecture &amp; Implementation</span>
          </div>
          <p className="text-xs sm:text-sm text-base-content/90 leading-relaxed font-sans">
            &ldquo;{skill.description}&rdquo;
          </p>
        </div>

        {/* Applied In Production Projects */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-base-content/70 font-semibold">
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span>Verified Production Project Links:</span>
          </div>

          <div className="grid gap-2.5">
            {skill.appliedIn.map((appItem, idx) => {
              const projectInfo = getProjectRoute(appItem);
              return (
                <Link
                  key={idx}
                  href={projectInfo.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200/40 hover:bg-base-200 border border-base-300 hover:border-primary/50 transition-all duration-200 group/proj"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-base-content group-hover/proj:text-primary transition-colors">
                        {projectInfo.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-base-300 text-base-content/70">
                        {projectInfo.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-base-content/65 line-clamp-1">
                      {projectInfo.highlight}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-primary shrink-0 group-hover/proj:translate-x-1 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Verification Standards Checklist */}
        <div className="pt-2 border-t border-base-300 grid grid-cols-2 gap-2 text-[11px] font-mono text-base-content/70">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            <span>Production Tested</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            <span>WCAG 2.1 AA Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            <span>Strict Type Checked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            <span>Sub-100ms Response</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/projects"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-base-content/70 hover:text-primary transition-colors"
          >
            <span>Explore All Projects</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

