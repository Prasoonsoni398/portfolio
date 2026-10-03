"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Simple Minimalist One-Line Footer matching reference */}
      <footer className="border-t border-base-300/70 bg-base-100 py-6 sm:py-7 text-xs text-base-content/70 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center font-medium">
          <span>&copy; 2026 {SITE_CONFIG.name}. All rights reserved.</span>
          <span className="hidden sm:inline text-base-content/40">•</span>
          <span className="inline-flex items-center gap-1.5">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by Prasoon
          </span>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showFloatingBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-content shadow-xl hover:shadow-primary/30 hover:scale-110 active:scale-95 transition-all duration-300 border border-primary/20 flex items-center justify-center cursor-pointer animate-in fade-in zoom-in-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </>
  );
}
