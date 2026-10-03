"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, ArrowRight, Eye } from "lucide-react";
import { GithubIcon } from "../common/Icons";
import { Project } from "@/types/project";
import { Badge } from "../common/Badge";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-base-300 bg-base-200/50 hover:bg-base-200/90 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
      {/* Media Container with Quick View Overlay */}
      <div className="relative w-full h-52 sm:h-56 bg-base-300 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(project)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-base-100/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="px-4 py-2 rounded-xl bg-base-100 text-base-content text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-primary hover:text-primary-content transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Architecture</span>
          </button>
        </div>

        <div className="absolute top-3 left-3">
          <Badge variant="primary">{project.category}</Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetails(project)}
              className="font-extrabold text-xl text-base-content group-hover:text-primary transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-xs text-primary font-mono font-medium">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-base-100 text-base-content/75 border border-base-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-base-300 text-base-content/60">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-base-300/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
                  title="View GitHub Repository"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-base-100 hover:bg-base-300 text-base-content border border-base-300 transition-colors"
                  title="View Live Demo"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
