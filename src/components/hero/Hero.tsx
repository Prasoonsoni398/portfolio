import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "../layout/Container";
import { InteractivePlayground } from "./InteractivePlayground";
import { Badge } from "../common/Badge";
import { ProfileSettings } from "@/types/profile";

interface HeroProps {
  profile?: ProfileSettings | null;
}

export function Hero({ profile }: HeroProps) {
  const name = profile?.name || SITE_CONFIG.name;
  const title = profile?.heroTagline || profile?.title || SITE_CONFIG.title;
  const greeting = profile?.heroGreeting || "Hello World, my name is";
  const description = profile?.heroDescription || profile?.bio || SITE_CONFIG.bio;
  const statusText = profile?.heroStatusText || "Available for Opportunities";
  const isAvailable = profile?.availableForHire ?? true;
  const primaryCtaText = profile?.heroPrimaryCtaText || "View My Work";
  const primaryCtaLink = profile?.heroPrimaryCtaLink || "#projects";
  const secondaryCtaText = profile?.heroSecondaryCtaText || "Download Resume";
  const resumePath = profile?.resumePath || SITE_CONFIG.resumePath;
  const githubUrl = profile?.githubUrl || SITE_CONFIG.githubUrl;
  const githubUsername = profile?.githubUsername || SITE_CONFIG.githubUsername;
  const linkedinUrl = profile?.linkedinUrl || SITE_CONFIG.linkedinUrl;

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background ambient aura using FlyonUI semantic primary color */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Bio, CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6 text-left">
            {/* Profile Intro Badge with photo */}
            {isAvailable && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                  </span>
                  <Badge variant="success">{statusText}</Badge>
                </div>
              </div>
            )}

            {/* Main Greeting and Name */}
            <div className="space-y-2">
              <span className="text-sm sm:text-base font-mono font-medium text-primary">
                {greeting}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-[1.1]">
                {name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-content/80">
                {title}
              </h2>
            </div>

            {/* Description matching customizable profile */}
            <p className="text-base sm:text-lg text-base-content/75 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-primary-content hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-base-200 text-base-content hover:bg-base-300 border border-base-300 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>{secondaryCtaText}</span>
              </a>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-base-content hover:bg-base-200/80 transition-all"
              >
                <Mail className="w-4 h-4 text-secondary" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Links & Verified Profile */}
            <div className="pt-4 border-t border-base-300/60 flex items-center gap-4 text-sm text-base-content/60">
              <span className="font-mono text-xs uppercase tracking-wider">Connect:</span>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono text-xs">@{githubUsername}</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="font-mono text-xs">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal / Playground */}
          <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] xl:max-w-[500px]">
              <InteractivePlayground />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
