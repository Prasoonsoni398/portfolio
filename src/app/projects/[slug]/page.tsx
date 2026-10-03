import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle, Cpu, AlertTriangle } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { projects } from "@/mockdata/projects";
import { constructMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/common/Badge";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return constructMetadata({ title: "Project Not Found" });

  return constructMetadata({
    title: `${project.title} | Case Study`,
    description: project.description
  });
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{project.category}</Badge>
            {project.featured && <Badge variant="secondary">Featured Project</Badge>}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-base-content tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-primary font-mono font-medium">
            {project.tagline}
          </p>

          <p className="text-sm sm:text-base text-base-content/80 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-content hover:opacity-90 transition-colors shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Interactive Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Large Media Preview */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-base-300 bg-base-200 mb-12 shadow-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Problem & Solution */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-warning flex items-center gap-1.5 font-mono">
                  <AlertTriangle className="w-4 h-4" /> The Problem
                </span>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-base-200/50 border border-base-300 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-success flex items-center gap-1.5 font-mono">
                  <CheckCircle className="w-4 h-4" /> The Solution
                </span>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture breakdown */}
            {project.architectureComponents && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span>Technical Architecture</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.architectureComponents.map((comp) => (
                    <div key={comp.name} className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-1.5">
                      <span className="font-bold text-sm text-primary block">{comp.name}</span>
                      <p className="text-xs text-base-content/70">{comp.description}</p>
                      <span className="text-[10px] font-mono text-base-content/50 block pt-1">{comp.tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-base-content">
                Implemented Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 p-3 rounded-xl bg-base-100 border border-base-300 text-xs sm:text-sm text-base-content/80">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Tech Specs & Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {project.metrics && (
              <div className="p-6 rounded-2xl bg-base-200/60 border border-base-300 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                  Performance Metrics
                </h4>
                <div className="space-y-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-xs text-base-content/70">{m.label}</span>
                      <span className="text-sm font-black text-primary font-mono">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-base-200/60 border border-base-300 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-base-100 text-base-content border border-base-300 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
