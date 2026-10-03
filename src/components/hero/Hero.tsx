import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "../layout/Container";
import { InteractivePlayground } from "./InteractivePlayground";
import { Badge } from "../common/Badge";

export function Hero() {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background ambient aura using FlyonUI semantic primary color */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Bio, CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Profile Intro Badge with photo */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-base-200/80 border border-base-300 backdrop-blur-sm shadow-sm hover:border-primary/50 transition-colors">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/50 shadow shrink-0">
                  <Image
                    src="/images/profile/prasoon.jpg"
                    alt="Prasoon Soni"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-base-content">Prasoon Soni</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success font-semibold border border-success/20">
                    Trainee @ Raj Digital
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                </span>
                <Badge variant="success">Available for Opportunities</Badge>
              </div>
            </div>

            {/* Main Greeting and Name */}
            <div className="space-y-2">
              <span className="text-sm sm:text-base font-mono font-medium text-primary">
                Hello World, my name is
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-base-content leading-[1.1]">
                {SITE_CONFIG.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-content/80">
                {SITE_CONFIG.title}
              </h2>
            </div>

            {/* Description matching PRD */}
            <p className="text-base sm:text-lg text-base-content/75 max-w-xl leading-relaxed">
              I build responsive, scalable, and user-focused web applications using modern JavaScript and TypeScript technologies. Currently engineering client features as a <span className="text-primary font-semibold">Trainee at Raj Digital, Bhopal</span>.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-primary-content hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={SITE_CONFIG.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-base-200 text-base-content hover:bg-base-300 border border-base-300 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>Download Resume</span>
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
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono text-xs">@{SITE_CONFIG.githubUsername}</span>
              </a>
              <a
                href={SITE_CONFIG.linkedinUrl}
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
          <div className="lg:col-span-5 w-full">
            <InteractivePlayground />
          </div>
        </div>
      </Container>
    </section>
  );
}
