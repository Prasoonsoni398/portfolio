"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Terminal as TerminalIcon,
  Briefcase
} from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { SITE_CONFIG } from "@/lib/constants";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

interface SkillItem {
  name: string;
  badge: React.ReactNode;
}

const ALL_SKILLS: SkillItem[] = [
  {
    name: "Next.js",
    badge: (
      <span className="w-3.5 h-3.5 rounded-full bg-base-content text-base-100 flex items-center justify-center font-bold text-[8px]">
        N
      </span>
    )
  },
  {
    name: "React 19",
    badge: <span className="text-[11px]">⚛️</span>
  },
  {
    name: "TypeScript",
    badge: (
      <span className="w-3.5 h-3.5 rounded bg-info text-info-content flex items-center justify-center font-bold text-[8px]">
        TS
      </span>
    )
  },
  {
    name: "Tailwind CSS",
    badge: (
      <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z"/>
      </svg>
    )
  },
  {
    name: "Node.js",
    badge: <span className="text-[11px]">🟢</span>
  },
  {
    name: "WebSockets",
    badge: <span className="text-[11px]">⚡</span>
  },
  {
    name: "FlyonUI",
    badge: <span className="text-[11px]">🦋</span>
  },
  {
    name: "PostgreSQL",
    badge: <span className="text-[11px]">🐘</span>
  },
  {
    name: "Express.js",
    badge: <span className="text-[11px]">🚂</span>
  },
  {
    name: "MongoDB",
    badge: <span className="text-[11px]">🍃</span>
  },
  {
    name: "Git & GitHub",
    badge: <GithubIcon className="w-3 h-3" />
  },
  {
    name: "REST APIs",
    badge: <span className="text-[11px]">🔗</span>
  }
];

const STATUS_OPTIONS = [
  { text: "Trainee @ Raj Digital, Bhopal", emoji: "⚡", color: "bg-warning" },
  { text: "Available for Opportunities", emoji: "🟢", color: "bg-success" },
  { text: "Open to Full-Time & Freelance", emoji: "💼", color: "bg-info" },
  { text: "Building Real-Time Web Apps", emoji: "🚀", color: "bg-accent" },
];

export function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"livePreview" | "terminal">("livePreview");
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [showCodeView, setShowCodeView] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init-1",
      command: "welcome",
      output: (
        <div className="space-y-1 text-[13px] text-base-content/90">
          <p className="text-primary font-bold">🚀 Prasoon Soni — Developer Environment v2.6.0</p>
          <p className="text-base-content/70">Type commands below or click quick tags to explore verified capabilities.</p>
        </div>
      )
    },
    {
      id: "init-2",
      command: "whoami",
      output: (
        <div className="text-[13px] space-y-1">
          <p><span className="text-secondary font-semibold">Role:</span> {SITE_CONFIG.role}</p>
          <p><span className="text-secondary font-semibold">Specialization:</span> React, Next.js, TypeScript, Node.js &amp; WebSockets</p>
          <p><span className="text-secondary font-semibold">Location:</span> {SITE_CONFIG.location}</p>
        </div>
      )
    }
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (activeTab === "terminal") {
      scrollToBottom();
    }
  }, [history, activeTab]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let resultNode: React.ReactNode;

    switch (cleanCmd) {
      case "help":
        resultNode = (
          <div className="text-[13px] space-y-1 text-base-content/80">
            <p><span className="text-primary font-mono font-semibold">whoami</span> — Developer overview &amp; Trainee info</p>
            <p><span className="text-primary font-mono font-semibold">projects</span> — Flagship engineering projects</p>
            <p><span className="text-primary font-mono font-semibold">skills</span> — Technical proficiency &amp; stack</p>
            <p><span className="text-primary font-mono font-semibold">contact</span> — Direct communication links</p>
            <p><span className="text-primary font-mono font-semibold">clear</span> — Clear terminal output</p>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="text-[13px] space-y-1 text-base-content/85">
            <p><span className="font-semibold text-primary">{SITE_CONFIG.name}</span> — {SITE_CONFIG.title}</p>
            <p className="text-base-content/75">{SITE_CONFIG.bio}</p>
            <p className="text-warning font-medium">Experience: Trainee @ Raj Digital, Bhopal</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="text-[13px] space-y-1.5">
            <div className="p-2 rounded-lg bg-base-200 border border-base-300">
              <span className="font-bold text-primary">1. Real-Time Communication App</span> — Sub-100ms WebSocket chat
            </div>
            <div className="p-2 rounded-lg bg-base-200 border border-base-300">
              <span className="font-bold text-primary">2. Cravings</span> — Food delivery platform (React/Next.js)
            </div>
            <div className="p-2 rounded-lg bg-base-200 border border-base-300">
              <span className="font-bold text-primary">3. Form Builder</span> — Dynamic drag-and-drop form creator
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="text-[13px] space-y-1 text-base-content/80">
            <p><span className="text-secondary font-semibold">Core:</span> Next.js, React 19, TypeScript, Tailwind CSS</p>
            <p><span className="text-secondary font-semibold">Backend &amp; DB:</span> Node.js, Express, WebSockets, PostgreSQL, MongoDB</p>
            <p><span className="text-secondary font-semibold">UI &amp; Tools:</span> FlyonUI, Git, GitHub, REST APIs</p>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="text-[13px] space-y-1">
            <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline">{SITE_CONFIG.email}</a></p>
            <p>LinkedIn: <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">prasoon-soni</a></p>
            <p>GitHub: <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Prasoonsoni398</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resultNode = (
          <p className="text-[13px] text-error">
            Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="font-bold underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cmd,
        output: resultNode
      }
    ]);
    setInputVal("");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStatus = STATUS_OPTIONS[statusIndex];

  return (
    <div className="relative w-full rounded-3xl border border-base-300 bg-base-100 shadow-xl overflow-hidden flex flex-col h-[500px]">
      
      {/* Decorative ambient background rings in bottom-left */}
      <div className="absolute -bottom-14 -left-14 w-48 h-48 rounded-full border border-base-300/40 pointer-events-none -z-0" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-base-300/30 pointer-events-none -z-0" />
      
      {/* Decorative lines in top-right */}
      <div className="absolute top-3.5 right-6 hidden sm:flex flex-col gap-1 opacity-20 pointer-events-none z-0">
        <span className="w-14 h-0.5 bg-base-content rounded-full" />
        <span className="w-10 h-0.5 bg-base-content rounded-full" />
        <span className="w-6 h-0.5 bg-base-content rounded-full" />
      </div>

      {/* Terminal Title Bar */}
      <div className="h-12 px-4 bg-base-200/80 border-b border-base-300 flex items-center justify-between gap-2 shrink-0 select-none z-10">
        {/* Left Mac Window Dots + Path */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-error inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-warning inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-success inline-block shadow-2xs" />
          </div>
          <span className="text-[13px] font-mono font-medium text-base-content/70 ml-2 truncate">
            prasoon@devbox:~/portfolio
          </span>
        </div>

        {/* Right Tab Switcher with sliding spring motion */}
        <div className="flex items-center gap-1 bg-base-100 p-1 rounded-xl border border-base-300 shadow-2xs shrink-0">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "terminal" ? "text-primary-content font-bold" : "text-base-content/70 hover:text-base-content"
            }`}
          >
            {activeTab === "terminal" && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-primary rounded-lg shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("livePreview")}
            className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "livePreview" ? "text-primary-content font-bold" : "text-base-content/70 hover:text-base-content"
            }`}
          >
            {activeTab === "livePreview" && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-primary rounded-lg shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-warning" />
              <span>Interactive Preview</span>
            </span>
          </button>
        </div>
      </div>

      {/* LOCKED BODY CONTAINER: Fills remaining space, never shifts height */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col z-10">
        <AnimatePresence mode="wait">
          {activeTab === "livePreview" ? (
            /* TAB 1: INTERACTIVE PREVIEW WITH 3 CLEAN PARTS */
            <motion.div
              key="livePreview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="h-full w-full p-4 sm:p-5 flex flex-col justify-between"
            >
              {/* TOP ROW: FIRST PART (IMAGE) & SECOND PART (DETAILS) */}
              <div className="grid grid-cols-12 gap-3.5 items-center">
                
                {/* 1. FIRST PART: IMAGE ONLY (Items centered with balanced size) */}
                <div className="col-span-5 flex items-center justify-center">
                  <div className="relative w-full max-w-[165px] sm:max-w-[172px]">
                    {/* Decorative Backdrop Card */}
                    <div className="absolute -top-2.5 -left-2.5 w-36 sm:w-38 h-46 sm:h-50 rounded-3xl bg-primary/15 border border-primary/25 pointer-events-none" />

                    {/* Thin Outline Ring */}
                    <div className="absolute -inset-1.5 rounded-[26px] border border-base-300/80 pointer-events-none" />

                    {/* Main Photo Card */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="relative rounded-2xl p-1 bg-base-200 border border-base-300 shadow-md overflow-hidden z-10"
                    >
                      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-base-300">
                        <Image
                          src="/images/profile/prasoon.jpg"
                          alt="Prasoon Soni"
                          fill
                          className="object-cover object-top"
                          priority
                        />

                        {/* Interactive Status Pill on Photo */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setStatusIndex((prev) => (prev + 1) % STATUS_OPTIONS.length)}
                          title="Click to cycle status"
                          className="absolute bottom-1.5 left-1 right-1 py-0.5 px-1.5 rounded-full bg-base-300/90 hover:bg-base-300 backdrop-blur-md border border-base-content/15 flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-semibold text-base-content shadow-lg transition-colors cursor-pointer"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.color} animate-pulse shrink-0`} />
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={statusIndex}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -3 }}
                              transition={{ duration: 0.15 }}
                              className="truncate"
                            >
                              {currentStatus.text}
                            </motion.span>
                          </AnimatePresence>
                        </motion.button>
                      </div>

                      {/* Circular Status Marker on Photo Corner */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        whileTap={{ scale: 0.88 }}
                        onClick={() => setStatusIndex((prev) => (prev + 1) % STATUS_OPTIONS.length)}
                        title="Click to cycle status"
                        className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-success text-success-content border-2 border-base-100 shadow-md flex items-center justify-center z-20 cursor-pointer"
                      >
                        <span className="text-[10px]">{currentStatus.emoji}</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* 2. SECOND PART: DETAILS & TRAINEE INFO */}
                <div className="col-span-7 flex flex-col justify-center space-y-2">
                  
                  {/* Header Doodles & Titles */}
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-0.5 bg-primary rounded-full rotate-[-45deg] inline-block" />
                        <span className="w-4.5 h-0.5 bg-primary rounded-full rotate-[-45deg] inline-block" />
                      </div>
                      
                      {/* Interactive Code View Toggle */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowCodeView(!showCodeView)}
                        title={showCodeView ? "Switch to Profile View" : "Peek Config Code"}
                        className={`h-6 px-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono font-bold shrink-0 ${
                          showCodeView
                            ? "bg-primary text-primary-content border-primary shadow-xs"
                            : "bg-base-200 hover:bg-base-300 text-base-content/80 border-base-300"
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="inline-block w-8 text-center">{showCodeView ? "Card" : "</>"}</span>
                      </motion.button>
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-widest text-base-content/60 uppercase block">
                      HELLO, I&apos;M
                    </span>

                    <h3 className="text-xl sm:text-[22px] font-black text-base-content tracking-tight leading-none mt-0.5">
                      Prasoon Soni
                    </h3>

                    <h4 className="text-sm sm:text-base font-bold text-primary tracking-tight mt-0.5">
                      Frontend &amp; Full-Stack Engineer
                    </h4>
                    
                    <div className="w-10 h-0.5 bg-primary rounded-full mt-1" />
                  </div>

                  {/* Concise Trainee Experience or Code View with Fixed Locked Height */}
                  <div className="relative h-[126px] w-full">
                    <AnimatePresence mode="wait">
                      {showCodeView ? (
                        <motion.div
                          key="codeSnippet"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.14 }}
                          className="absolute inset-0 w-full h-full p-2.5 rounded-xl bg-base-200 text-base-content font-mono text-[10px] border border-base-300 shadow-inner flex flex-col justify-center"
                        >
                          <div className="text-primary font-bold flex items-center gap-1 mb-1 text-[11px]">
                            <span>⚡</span> trainee.config.ts
                          </div>
                          <pre className="text-base-content/90 overflow-x-auto leading-[1.35] text-[10px]">
                            <code>
                              <span className="text-secondary font-bold">const</span> <span className="text-primary font-semibold">dev</span> = &#123;{"\n"}
                              {"  "}name: <span className="text-success">&quot;Prasoon Soni&quot;</span>,{"\n"}
                              {"  "}role: <span className="text-warning">&quot;Trainee Developer&quot;</span>,{"\n"}
                              {"  "}company: <span className="text-warning">&quot;Raj Digital, Bhopal&quot;</span>,{"\n"}
                              {"  "}openToWork: <span className="text-info font-bold">true</span>{"\n"}
                              &#125;;
                            </code>
                          </pre>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="traineeProfile"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.14 }}
                          className="absolute inset-0 w-full h-full p-2.5 rounded-xl bg-base-200/80 border border-base-300 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                              <Briefcase className="w-3.5 h-3.5 text-secondary shrink-0" />
                              <span className="truncate">Trainee @ Raj Digital, Bhopal</span>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-success/15 text-success font-semibold border border-success/20 shrink-0">
                              Active
                            </span>
                          </div>

                          <p className="text-[11px] text-base-content/80 leading-relaxed">
                            Currently engineering scalable client features as Trainee Software Engineer at Raj Digital, Bhopal. Developing responsive Next.js interfaces, sub-100ms real-time WebSockets, and clean production code.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>

              {/* 3. THIRD / BOTTOM PART: ALL SKILL BADGES SPANNING FULL WIDTH */}
              <div className="pt-2 border-t border-base-300/80">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {ALL_SKILLS.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-base-200 border border-base-300 text-[10px] sm:text-[11px] font-medium text-base-content/85 shadow-2xs cursor-default"
                    >
                      {skill.badge}
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Action Buttons (Motion tactile feedback) */}
              <div className="flex items-center gap-2 pt-2 border-t border-base-300 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold bg-primary hover:bg-primary/90 text-primary-content shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Work Email"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 shadow-xs transition-colors whitespace-nowrap"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repos</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-base-content/60" />
                </motion.a>
              </div>

            </motion.div>
          ) : (
            /* TAB 2: INTERACTIVE COMMAND-LINE TERMINAL WITH MOTION */
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-mono bg-base-100 text-base-content"
            >
              {/* Output log: text-[13px] */}
              <div ref={terminalContainerRef} className="overflow-y-auto space-y-3 pr-1 flex-1 text-[13px]">
                {history.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-[13px] text-base-content/70">
                      <span className="text-primary font-bold">&gt;</span>
                      <span className="text-base-content font-semibold">{item.command}</span>
                    </div>
                    <div className="pl-4 text-[13px]">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Quick command buttons: text-[11px] */}
              <div className="pt-2 border-t border-base-300 flex flex-wrap items-center gap-1 shrink-0">
                <span className="text-[11px] text-base-content/50 uppercase font-bold tracking-wider mr-1">Quick:</span>
                {["whoami", "projects", "skills", "contact", "clear"].map((q) => (
                  <motion.button
                    key={q}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleCommand(q)}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content text-base-content/80 border border-base-300 transition-colors cursor-pointer"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>

              {/* Interactive input bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(inputVal);
                }}
                className="mt-2 flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-xl border border-base-300 shrink-0"
              >
                <span className="text-primary font-bold text-[15px]">$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type command ('help', 'projects', 'skills')..."
                  className="w-full bg-transparent text-[13px] text-base-content focus:outline-none placeholder:text-base-content/40 font-mono"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="text-[13px] px-3 py-1 rounded-lg bg-primary text-primary-content font-bold hover:opacity-90 cursor-pointer"
                >
                  Run
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
