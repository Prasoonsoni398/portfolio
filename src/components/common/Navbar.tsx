"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTION_IDS = ["hero", "about", "skills", "projects", "experience", "education", "services", "contact"];

const NAV_LINKS = [
  { label: "Home", href: "/#hero", id: "hero" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Contact", href: "/#contact", id: "contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const activeSection = useScrollSpy(SECTION_IDS, 120);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll when navigating to hash anchors on page load / route change
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const element = document.getElementById(hashId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { label: string; href: string; id: string }
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", link.href);
      }
    }
  };

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/85 backdrop-blur-md border-b border-base-300/80 shadow-md py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="lg:px-4 px-6 max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, { label: "Home", href: "/#hero", id: "hero" })}
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/40 shadow-sm group-hover:scale-105 transition-transform bg-base-200 shrink-0">
            <Image
              src="/images/profile/prasoon.jpg"
              alt="Prasoon Soni"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-base-content group-hover:text-primary transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] text-base-content/60 font-mono tracking-wider uppercase">
              Trainee @ Raj Digital
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-base-200/70 p-1.5 rounded-full border border-base-300/70 backdrop-blur-sm">
          {NAV_LINKS.map((link) => {
            const isActive = isHome ? (activeSection ? activeSection === link.id : link.id === "hero") : false;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content/75 hover:text-base-content hover:bg-base-300/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Switcher + Resume Button */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeSwitcher />

          <a
            href={SITE_CONFIG.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-base-200 text-base-content hover:bg-base-300 border border-base-300 transition-all hover:scale-102 active:scale-95 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-base-content/60" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-base-200 text-base-content border border-base-300 hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-base-300 bg-base-100/95 backdrop-blur-xl px-6 py-5 mt-2 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = isHome ? (activeSection ? activeSection === link.id : link.id === "hero") : false;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-base-200"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-content" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-base-300 flex items-center justify-between">
            <a
              href={SITE_CONFIG.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-content shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
