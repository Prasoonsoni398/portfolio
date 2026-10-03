import React from "react";
import { educations } from "@/mockdata/education";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { GraduationCap, CheckCircle } from "lucide-react";

export function EducationSection() {
  return (
    <SectionWrapper id="education" altBg>
      <SectionHeading
        badge="Academic Foundation"
        title="Education"
        subtitle="Formal computational science and software engineering curriculum."
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8 shadow-sm hover:border-primary/40 transition-colors space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary mt-1">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    {edu.field}
                  </p>
                  <p className="text-xs text-base-content/70 mt-1">
                    {edu.university} • {edu.location}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-mono font-bold text-base-content/80 self-start">
                Graduated: {edu.completionYear}
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {edu.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-base-content/80"
                  >
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coursework Pills */}
            <div className="pt-4 border-t border-base-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-mono">
                Core Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-base-200 text-base-content/80 border border-base-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
