"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Code2,
  Folder,
  Briefcase,
  Settings,
  MessageSquare,
  MapPin,
  ArrowRight,
  ArrowUp,
  Mail
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "../layout/Container";

export function Footer() {
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-base-300 bg-base-200/50 py-6 sm:py-8 text-base-content/80 relative overflow-hidden transition-colors">
      {/* Subtle organic bottom background decor */}
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <Container>
        {/* Main 3-Column Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-5 items-start">
          
          {/* COLUMN 1: Brand & Biography (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="flex items-center gap-3">
              {/* Compact Rounded Square Avatar with PS */}
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-black font-mono text-sm shadow-xs shrink-0">
                PS
              </div>
              <div>
                <h3 className="text-lg font-black text-base-content tracking-tight leading-snug">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs font-semibold text-primary">
                  Frontend / Full-Stack Developer
                </p>
              </div>
            </div>

            <p className="text-xs text-base-content/75 leading-relaxed max-w-sm">
              Currently working as a Trainee at Raj Digital, Bhopal. Dedicated to building high-performance, accessible, and elegant web solutions.
            </p>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-base-100 hover:bg-base-300 text-base-content border border-base-300/80 flex items-center justify-center transition-colors shadow-xs"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-base-100 hover:bg-base-300 text-base-content border border-base-300/80 flex items-center justify-center transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="w-8 h-8 rounded-full bg-base-100 hover:bg-base-300 text-base-content border border-base-300/80 flex items-center justify-center transition-colors shadow-xs"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Quick Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-base-content/90 font-mono">
                Quick Navigation
              </h4>
              <div className="w-5 h-0.5 bg-primary rounded-full mt-1" />
            </div>

            {/* 2-Column Links Grid with Crisp Icons */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 text-xs">
              {/* Left Sub-column */}
              <div className="space-y-2">
                <Link
                  href="/#hero"
                  onClick={(e) => handleNavClick(e, "/#hero", "hero")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <Home className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/#about"
                  onClick={(e) => handleNavClick(e, "/#about", "about")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <User className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>About Me</span>
                </Link>
                <Link
                  href="/#skills"
                  onClick={(e) => handleNavClick(e, "/#skills", "skills")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <Code2 className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Technical Skills</span>
                </Link>
                <Link
                  href="/#projects"
                  onClick={(e) => handleNavClick(e, "/#projects", "projects")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <Folder className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Featured Projects</span>
                </Link>
              </div>

              {/* Right Sub-column */}
              <div className="space-y-2">
                <Link
                  href="/#experience"
                  onClick={(e) => handleNavClick(e, "/#experience", "experience")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <Briefcase className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Work Experience</span>
                </Link>
                <Link
                  href="/#services"
                  onClick={(e) => handleNavClick(e, "/#services", "services")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <Settings className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Engineering Services</span>
                </Link>
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                  className="flex items-center gap-2 text-base-content/80 hover:text-primary transition-colors group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-base-content/60 group-hover:text-primary transition-colors shrink-0" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Compact Professional Profile Card (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-base-300 bg-base-100/90 p-4 sm:p-4.5 shadow-xs space-y-2.5">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-base-content/90 font-mono">
                Professional Profile
              </h4>
              <div className="w-5 h-0.5 bg-primary rounded-full mt-1" />
            </div>

            {/* Profile Items */}
            <div className="space-y-2 pt-0.5">
              {/* Location */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-base-content/60 font-mono leading-tight">
                    Location
                  </span>
                  <span className="text-xs font-semibold text-base-content leading-tight">
                    {SITE_CONFIG.location}
                  </span>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <GithubIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-base-content/60 font-mono leading-tight">
                    GitHub
                  </span>
                  <a
                    href={SITE_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-base-content hover:text-primary transition-colors leading-tight"
                  >
                    @{SITE_CONFIG.githubUsername}
                  </a>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-base-content/60 font-mono leading-tight">
                    Role
                  </span>
                  <span className="text-xs font-semibold text-base-content leading-tight">
                    Trainee at Raj Digital
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button: View Verified Resume */}
            <div className="pt-1">
              <a
                href={SITE_CONFIG.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-full bg-primary text-primary-content hover:opacity-95 transition-opacity font-bold text-xs flex items-center justify-between shadow-xs active:scale-98 group"
              >
                <span>View Verified Resume</span>
                <div className="w-5 h-5 rounded-full bg-primary-content text-primary flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Dot + Copyright & Back to top button */}
        <div className="pt-4 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-base-content/70">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span>
              &copy; 2026 {SITE_CONFIG.name}. Built with Next.js, TypeScript &amp; FlyonUI semantic design system.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors group cursor-pointer"
            title="Back to top"
          >
            <span className="font-semibold text-[11px] text-base-content group-hover:text-primary transition-colors">
              Back to top
            </span>
            <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-colors">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </Container>
    </footer>
  );
}
