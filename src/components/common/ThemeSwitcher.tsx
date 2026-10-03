"use client";

import React, { useState } from "react";
import { Palette, Moon, Sun, Sparkles, Check } from "lucide-react";
import { useTheme, ThemeName } from "@/hooks/useTheme";

export function ThemeSwitcher() {
  const { theme, isDark, changeTheme, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const baseThemes: { id: "perplexity" | "shadcn" | "ghibli"; name: string; desc: string; dotColor: string }[] = [
    { id: "perplexity", name: "Perplexity", desc: "Cyan/Teal AI Minimalist", dotColor: "#20b8cd" },
    { id: "shadcn", name: "Shadcn", desc: "Zinc Slate Precision", dotColor: "#3b82f6" },
    { id: "ghibli", name: "Ghibli", desc: "Miyazaki Nature & Warmth", dotColor: "#4ade80" }
  ];

  const currentThemeBase = theme.replace("-light", "") as "perplexity" | "shadcn" | "ghibli";

  const handleSelectTheme = (baseId: "perplexity" | "shadcn" | "ghibli") => {
    const newTheme = (isDark ? baseId : `${baseId}-light`) as ThemeName;
    changeTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-base-200 border border-base-300">
        {/* Dropdown Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-all active:scale-95"
          title="Switch Portfolio Theme"
          aria-label="Theme selector"
        >
          <Palette className="w-3.5 h-3.5 text-primary" />
          <span className="capitalize hidden sm:inline">{currentThemeBase}</span>
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              backgroundColor:
                currentThemeBase === "perplexity"
                  ? "#20b8cd"
                  : currentThemeBase === "shadcn"
                  ? "#3b82f6"
                  : "#4ade80"
            }}
          />
        </button>

        {/* Light / Dark Mode Quick Toggle */}
        <button
          onClick={toggleMode}
          className="p-1.5 rounded-lg text-base-content hover:bg-base-300 hover:text-primary transition-all active:scale-90"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle light or dark mode"
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-warning" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
        </button>
      </div>

      {/* Theme Choice Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-base-200 border border-base-300 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-base-300/60 mb-1 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" /> Theme Engine
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">FlyonUI</span>
            </div>

            <div className="flex flex-col gap-1">
              {baseThemes.map((t) => {
                const isActive = currentThemeBase === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTheme(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary font-bold border border-primary/20"
                        : "hover:bg-base-300/80 text-base-content"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full border border-base-100 shadow-sm"
                        style={{ backgroundColor: t.dotColor }}
                      />
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-[10px] text-base-content/60 font-normal">{t.desc}</div>
                      </div>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
