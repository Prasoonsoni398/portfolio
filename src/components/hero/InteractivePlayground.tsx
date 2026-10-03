"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Terminal,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  Code2
} from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { SITE_CONFIG } from "@/lib/constants";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function InteractivePlayground() {
  // Default to the rich interactive preview as shown in reference image
  const [activeTab, setActiveTab] = useState<"livePreview" | "terminal">("livePreview");
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init-1",
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs text-base-content/90">
          <p className="text-primary font-bold">🚀 Prasoon Soni — Developer Environment v2.6.0</p>
          <p className="text-base-content/70">Type commands below or click quick tags to explore verified capabilities.</p>
        </div>
      )
    },
    {
      id: "init-2",
      command: "whoami",
      output: (
        <div className="text-xs space-y-1">
          <p><span className="text-secondary font-semibold">Role:</span> {SITE_CONFIG.role}</p>
          <p><span className="text-secondary font-semibold">Specialization:</span> React, Next.js, TypeScript, Node.js &amp; WebSockets</p>
          <p><span className="text-secondary font-semibold">Location:</span> {SITE_CONFIG.location}</p>
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
          <div className="text-xs space-y-1 text-base-content/80">
            <p><span className="text-primary font-mono">whoami</span> — Display professional developer overview</p>
            <p><span className="text-primary font-mono">projects</span> — List flagship engineering projects</p>
            <p><span className="text-primary font-mono">skills</span> — Inspect core technical proficiency</p>
            <p><span className="text-primary font-mono">contact</span> — Get direct communication links</p>
            <p><span className="text-primary font-mono">clear</span> — Clear terminal output</p>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="text-xs space-y-1 text-base-content/85">
            <p><span className="font-semibold text-primary">{SITE_CONFIG.name}</span> — {SITE_CONFIG.title}</p>
            <p className="text-base-content/75">{SITE_CONFIG.bio}</p>
            <p className="text-success font-medium">Status: Actively building &amp; open to technical opportunities</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="text-xs space-y-2">
            <div className="p-2 rounded bg-base-300/40 border border-base-300">
              <span className="font-bold text-primary">1. Real-Time Communication App</span> — Sub-100ms WebSocket chat platform (Socket.io / Node.js)
            </div>
            <div className="p-2 rounded bg-base-300/40 border border-base-300">
              <span className="font-bold text-primary">2. Cravings</span> — Food delivery &amp; cart state management (React / Next.js)
            </div>
            <div className="p-2 rounded bg-base-300/40 border border-base-300">
              <span className="font-bold text-primary">3. Form Builder</span> — Dynamic drag-and-drop form schema builder
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="text-xs grid grid-cols-2 gap-2 text-base-content/85">
            <div><span className="text-accent font-semibold">Frontend:</span> React, Next.js, TS, Tailwind, FlyonUI</div>
            <div><span className="text-accent font-semibold">Backend:</span> Node.js, Express, Socket.io, REST APIs</div>
            <div><span className="text-accent font-semibold">Databases:</span> PostgreSQL, MongoDB</div>
            <div><span className="text-accent font-semibold">Core:</span> Java, DSA Algorithms, Git</div>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="text-xs space-y-1">
            <p><span className="text-secondary font-semibold">Email:</span> {SITE_CONFIG.email}</p>
            <p><span className="text-secondary font-semibold">GitHub:</span> {SITE_CONFIG.githubUrl}</p>
            <p><span className="text-secondary font-semibold">LinkedIn:</span> {SITE_CONFIG.linkedinUrl}</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resultNode = (
          <p className="text-xs text-error">
            Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="font-bold underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> to see available commands.
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

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
      
      {/* Terminal Title Bar */}
      <div className="px-4 sm:px-5 py-3.5 bg-base-200/90 border-b border-base-300 flex items-center justify-between gap-2">
        {/* Left Mac Window Dots + Path */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-xs" />
          </div>
          <span className="text-xs sm:text-[13px] font-mono font-medium text-base-content/75 ml-2 truncate">
            prasoon@devbox:~/portfolio
          </span>
        </div>

        {/* Right Tab Switcher: Terminal & Interactive Preview */}
        <div className="flex items-center gap-1 bg-base-100/90 p-1 rounded-xl border border-base-300/80 shadow-xs shrink-0">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "terminal"
                ? "bg-[#1e4620] dark:bg-primary text-white dark:text-primary-content shadow-xs"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200/60"
            }`}
          >
            <span className="font-mono text-xs font-bold">&gt;_</span>
            <span>Terminal</span>
          </button>
          
          <button
            onClick={() => setActiveTab("livePreview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "livePreview"
                ? "bg-[#1e4620] dark:bg-primary text-white dark:text-primary-content shadow-xs"
                : "text-base-content/70 hover:text-base-content hover:bg-base-200/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-inherit" />
            <span>Interactive Preview</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE PREVIEW (Exact Design from Reference Image) */}
      {activeTab === "livePreview" ? (
        <div className="p-5 sm:p-7 bg-base-100/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-center">
            
            {/* Left Photo Column with Layered Frame */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[240px] sm:max-w-[270px]">
                {/* Decorative Layered Background Plate (Matching Reference Image) */}
                <div className="absolute -top-2.5 -left-2.5 w-24 h-24 rounded-2xl bg-primary/15 -z-0 pointer-events-none" />
                <div className="absolute -bottom-2 -left-2 w-28 h-28 rounded-3xl bg-secondary/10 -z-0 pointer-events-none" />

                {/* Main Photo Card Frame */}
                <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-base-200/90 border border-base-300 shadow-xl overflow-hidden z-10">
                  <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-base-300">
                    <Image
                      src="/images/profile/prasoon.jpg"
                      alt="Prasoon Soni"
                      fill
                      className="object-cover object-top"
                      priority
                    />

                    {/* Bottom Translucent "Available for Opportunities" Pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1 px-2.5 rounded-full bg-base-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                      <span className="truncate">Available for Opportunities</span>
                    </div>
                  </div>

                  {/* Circular Status Accent Marker at Bottom Right */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#16a34a] border-2 border-base-100 shadow-md flex items-center justify-center" />
                </div>
              </div>
            </div>

            {/* Right Information & Stack Column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              
              {/* Header Doodles & Subtitle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  {/* Decorative Slashes Accent */}
                  <div className="flex items-center gap-1 text-primary">
                    <span className="w-2.5 h-0.5 bg-primary rounded-full rotate-[-45deg] inline-block" />
                    <span className="w-3.5 h-0.5 bg-primary rounded-full rotate-[-45deg] inline-block" />
                  </div>
                  {/* Code Icon Bracket */}
                  <div className="text-base-content/40 font-mono text-sm font-bold flex items-center gap-0.5">
                    <Code2 className="w-4 h-4 text-base-content/40" />
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold tracking-widest text-base-content/60 uppercase block">
                  HELLO, I&apos;M
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight mt-0.5 leading-tight">
                  Prasoon Soni&apos;s
                </h3>

                <h4 className="text-lg sm:text-xl font-bold text-primary tracking-tight mt-0.5">
                  Live Engineering Stack
                </h4>
                
                {/* Subtle Accent Underline */}
                <div className="w-10 h-0.5 bg-primary rounded-full mt-1.5" />
              </div>

              {/* Bio Paragraph */}
              <p className="text-xs sm:text-sm text-base-content/75 leading-relaxed">
                Currently engineering client features as Trainee @ Raj Digital, Bhopal with Next.js, TypeScript &amp; FlyonUI semantic tokens.
              </p>

              {/* Tech Stack Pills Matching Image Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Next.js Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-base-200/90 border border-base-300 shadow-xs text-xs font-semibold text-base-content">
                  <span className="w-4 h-4 rounded-md bg-black text-white flex items-center justify-center font-bold text-[9px]">
                    N
                  </span>
                  <span>Next.js</span>
                </div>

                {/* TypeScript Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-base-200/90 border border-base-300 shadow-xs text-xs font-semibold text-base-content">
                  <span className="w-4 h-4 rounded-md bg-[#2563eb] text-white flex items-center justify-center font-bold text-[9px]">
                    TS
                  </span>
                  <span>TypeScript</span>
                </div>

                {/* Tailwind CSS Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-base-200/90 border border-base-300 shadow-xs text-xs font-semibold text-base-content">
                  <svg className="w-3.5 h-3.5 text-[#06b6d4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C9.337,13.382,7.976,12,6.001,12z"/>
                  </svg>
                  <span>Tailwind CSS</span>
                </div>

                {/* FlyonUI Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-base-200/90 border border-base-300 shadow-xs text-xs font-semibold text-base-content">
                  <span className="w-4 h-4 rounded-md bg-[#8b5cf6]/20 text-[#8b5cf6] flex items-center justify-center font-bold text-[10px]">
                    🦋
                  </span>
                  <span>FlyonUI</span>
                </div>
              </div>

              {/* Bottom CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {/* Copy Work Email (Green Button) */}
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#1e4620] hover:bg-[#163818] dark:bg-primary dark:hover:opacity-90 text-white dark:text-primary-content shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Email Copied!" : "Copy Work Email"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {/* GitHub Repos (Neutral Card Button) */}
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 shadow-xs transition-all duration-200 active:scale-95"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repos</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-base-content/60" />
                </a>
              </div>

            </div>

          </div>
        </div>
      ) : (
        /* TAB 2: INTERACTIVE COMMAND-LINE TERMINAL */
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between overflow-hidden font-mono bg-base-100/60 h-[380px]">
          {/* Output log */}
          <div className="overflow-y-auto space-y-3.5 pr-2 flex-1">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <span className="text-primary font-bold">&gt;</span>
                  <span className="text-base-content font-semibold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick command buttons */}
          <div className="pt-2 border-t border-base-300/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-base-content/50 uppercase font-bold tracking-wider mr-1">Quick:</span>
            {["whoami", "projects", "skills", "contact", "clear"].map((q) => (
              <button
                key={q}
                onClick={() => handleCommand(q)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content text-base-content/80 border border-base-300 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Interactive input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="mt-2 flex items-center gap-2 bg-base-200/90 px-3 py-1.5 rounded-xl border border-base-300"
          >
            <span className="text-primary font-bold text-sm">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'projects', 'skills')..."
              className="w-full bg-transparent text-xs text-base-content focus:outline-none placeholder:text-base-content/40 font-mono"
            />
            <button
              type="submit"
              className="text-xs px-2.5 py-1 rounded-lg bg-primary text-primary-content font-bold hover:opacity-90 cursor-pointer"
            >
              Run
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
