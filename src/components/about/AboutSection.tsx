import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";

export function AboutSection() {
  const philosophies = [
    {
      title: "Clean, Typed Architecture",
      desc: "Writing modular, strongly typed TypeScript components that are easy to test, maintain, and scale."
    },
    {
      title: "User-Centered Performance",
      desc: "Optimizing bundle sizes, eliminating unnecessary re-renders, and designing silky-smooth responsive layouts."
    },
    {
      title: "Algorithmic Problem Solving",
      desc: "Applying deep DSA principles cultivated through authoring animated educational content in Java."
    }
  ];

  return (
    <SectionWrapper id="about" altBg>
      <SectionHeading
        badge="About Me"
        title="Engineering Interactive & Scalable Web Solutions"
        subtitle="A software developer focused on frontend architectures, reactive real-time systems, and pragmatic full-stack development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Visual Card / Profile Snapshot */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary shadow-lg shrink-0">
                <Image
                  src="/images/profile/prasoon.jpg"
                  alt="Prasoon Soni"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-base-content">{SITE_CONFIG.name}</h3>
                <p className="text-xs text-primary font-mono font-medium">Trainee @ Raj Digital</p>
                <p className="text-xs text-base-content/60">{SITE_CONFIG.location}</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-base-300 text-xs text-base-content/80">
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Current Status:</span>
                <span className="font-semibold text-success">Active Traineeship (Raj Digital)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Started:</span>
                <span className="font-mono">1 July 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Education:</span>
                <span className="font-semibold">B.Tech (CSE, Graduated 2026)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Affiliation:</span>
                <span className="font-semibold">RGPV Bhopal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative / Focus */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="prose prose-invert max-w-none text-base text-base-content/80 leading-relaxed space-y-4">
            <p>
              I am a passionate software engineer specializing in modern JavaScript technologies, React, Next.js, and scalable backend workflows. My professional focus centers on turning complex product specifications into intuitive, high-performance web applications.
            </p>
            <p>
              Currently, I work as a <strong className="text-base-content font-bold">Trainee at Raj Digital, Bhopal</strong> (since 1 July 2026), where I build responsive web features, integrate RESTful APIs, and contribute to production frontends.
            </p>
            <p>
              Prior to my traineeship, I served as a <strong className="text-base-content font-bold">Content Developer for Java &amp; DSA</strong> at Raj Institute of Coding and Robotics, where I produced animated step-by-step visual solutions for complex algorithms and data structures.
            </p>
          </div>

          {/* Philosophy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {philosophies.map((p) => (
              <div
                key={p.title}
                className="p-3.5 rounded-xl bg-base-100/70 border border-base-300 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-primary text-xs font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{p.title}</span>
                </div>
                <p className="text-[11px] text-base-content/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>Read complete professional background</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
