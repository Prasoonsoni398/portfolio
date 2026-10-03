import React from "react";
import { Briefcase, Code, Sparkles, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "../layout/Container";

export function StatsSection() {
  const statIcons = [Briefcase, Code, Sparkles, GraduationCap];

  return (
    <div className="border-y border-base-300/60 bg-base-200/50 backdrop-blur-sm py-10">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SITE_CONFIG.stats.map((stat, idx) => {
            const IconComponent = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.label}
                className="flex flex-col gap-1 p-4 rounded-xl bg-base-100/50 border border-base-300/50 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-primary mb-1">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-base-content/70">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
