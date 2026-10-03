"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Terminal, Check, Sparkles, Copy, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"terminal" | "livePreview">("terminal");
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init-1",
      command: "welcome",
      output: (
        <div className="space-y-1.5 text-xs text-base-content/90">
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
    scrollToBottom();
  }, [history]);

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
          <div className="text-xs space-y-1">
            <p><span className="text-primary font-bold">Prasoon Soni</span> — {SITE_CONFIG.shortTitle}</p>
            <p className="text-base-content/75">{SITE_CONFIG.bio}</p>
            <p className="text-success font-medium">Status: Actively building &amp; open to technical opportunities</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="text-xs space-y-2">
            <div className="p-2 rounded bg-base-300/40 border border-base-300">
              <span className="font-bold text-primary">1. Cravings</span> — Food discovery &amp; cart state management (React / Next.js)
            </div>
            <div className="p-2 rounded bg-base-300/40 border border-base-300">
              <span className="font-bold text-primary">2. Real-Time Communication App</span> — Sub-100ms WebSocket chat platform (Socket.io / Node.js)
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
            <div><span className="text-accent font-semibold">Frontend:</span> React, Next.js, TS, Tailwind</div>
            <div><span className="text-accent font-semibold">Backend:</span> Node.js, Express, REST APIs</div>
            <div><span className="text-accent font-semibold">Databases:</span> PostgreSQL, MongoDB</div>
            <div><span className="text-accent font-semibold">Core:</span> Java, DSA Algorithms, Git</div>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="text-xs space-y-1">
            <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline">{SITE_CONFIG.email}</a></p>
            <p>GitHub: <a href={SITE_CONFIG.githubUrl} target="_blank" className="text-primary underline">{SITE_CONFIG.githubUrl}</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resultNode = (
          <div className="text-xs text-error">
            Command not recognized: <span className="font-mono">{cmd}</span>. Type <span className="text-primary font-bold">help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
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
    <div className="rounded-2xl border border-base-300 bg-base-200/80 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col h-[420px] transition-all">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-base-300/70 border-b border-base-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-error inline-block" />
            <span className="w-3 h-3 rounded-full bg-warning inline-block" />
            <span className="w-3 h-3 rounded-full bg-success inline-block" />
          </div>
          <span className="text-xs font-mono font-medium text-base-content/70 ml-2 hidden sm:inline">
            prasoon@devbox:~/portfolio
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-base-100 p-0.5 rounded-lg border border-base-300">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
              activeTab === "terminal"
                ? "bg-primary text-primary-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>
          <button
            onClick={() => setActiveTab("livePreview")}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
              activeTab === "livePreview"
                ? "bg-primary text-primary-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Interactive Preview</span>
          </button>
        </div>
      </div>

      {/* Terminal Tab Body */}
      {activeTab === "terminal" ? (
        <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden font-mono bg-base-100/50">
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

          {/* Quick chip actions */}
          <div className="pt-2 border-t border-base-300/50 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-base-content/50 uppercase font-bold tracking-wider mr-1">Quick:</span>
            {["whoami", "projects", "skills", "contact", "clear"].map((q) => (
              <button
                key={q}
                onClick={() => handleCommand(q)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-base-200 hover:bg-primary hover:text-primary-content text-base-content/80 border border-base-300 transition-colors"
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
              className="text-xs px-2 py-1 rounded bg-primary text-primary-content font-bold hover:opacity-90"
            >
              Run
            </button>
          </form>
        </div>
      ) : (
        /* Live Preview Tab */
        <div className="p-6 flex-1 flex flex-col justify-center items-center text-center bg-base-100/60 space-y-3.5">
          <div className="relative">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary shadow-lg mx-auto">
              <Image
                src="/images/profile/prasoon.jpg"
                alt="Prasoon Soni"
                fill
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-base-100 shadow" title="Online / Active" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-base-content">Prasoon Soni&apos;s Live Engineering Stack</h4>
            <p className="text-xs text-base-content/70 max-w-sm">
              Currently engineering client features as Trainee @ Raj Digital, Bhopal with Next.js, TypeScript &amp; FlyonUI semantic tokens.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-content hover:opacity-90 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Email Copied!" : "Copy Work Email"}</span>
            </button>
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-base-200 hover:bg-base-300 text-base-content border border-base-300"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>GitHub Repos</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
