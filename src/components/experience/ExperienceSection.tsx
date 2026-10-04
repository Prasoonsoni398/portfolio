"use client";

import React, { useState } from "react";
import { experiences as defaultExperiences } from "@/mockdata/experience";
import { Experience } from "@/types/experience";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Badge } from "../common/Badge";
import { Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export function ExperienceSection({ experiences: propExperiences }: { experiences?: Experience[] } = {}) {
  const experiences = propExperiences && propExperiences.length > 0 ? propExperiences : defaultExperiences;
  const [expandedId, setExpandedId] = useState<string>(experiences[0]?.id || "");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <SectionWrapper id="experience">
      <SectionHeading
        badge="Career History"
        title="Professional Experience"
        subtitle="Chronological engineering milestones and educational content development."
      />

      <div className="relative border-l-2 border-base-300 ml-4 md:ml-32 space-y-10">
        {experiences.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  exp.isCurrent
                    ? "bg-primary border-primary shadow-md shadow-primary/30"
                    : "bg-base-100 border-base-content/40"
                }`}
              />

              {/* Date Column on Desktop */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28">
                <span className="text-xs font-mono font-bold text-base-content/80 block">
                  {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                </span>
                <span className="text-[11px] font-mono text-base-content/50 block">
                  {formatDate(exp.startDate)}
                </span>
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl border border-base-300 bg-base-200/50 hover:bg-base-200 transition-colors p-6 shadow-sm">
                <div
                  className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-base-content">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <Badge variant="success">Current Role</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/70">
                      <span className="font-semibold text-primary">{exp.organization}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </span>
                      <span className="flex items-center gap-1 md:hidden">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(exp.startDate)} — {exp.endDate}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    className="p-1.5 rounded-lg bg-base-100 hover:bg-base-300 text-base-content/70 transition-colors self-end sm:self-center"
                    aria-label="Toggle details"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-base-content/80 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t border-base-300 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-base-content/80">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exp.achievements.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-base-100/70 border border-base-300">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-mono mb-1.5">
                          Key Impact &amp; Contributions
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-xs text-base-content/80">
                              • {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono mb-2">
                        Technologies &amp; Tools Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-base-100 text-base-content/80 border border-base-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
