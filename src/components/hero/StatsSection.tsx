import React from "react";
import { Briefcase, Code, Sparkles, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "../layout/Container";

export function StatsSection() {
  const statIcons = [Briefcase, Code, Sparkles, GraduationCap];

  return (
    <div className="border-y border-base-300 bg-base-200/50 backdrop-blur-sm py-10">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {SITE_CONFIG.stats.map((stat, idx) => {
            const IconComponent = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.label}
                className="flex flex-col justify-between gap-3 p-5 rounded-2xl bg-base-100 border-2 border-base-300 hover:border-primary transition-all duration-200 shadow-xs hover:shadow-md group"
              >
                <div className="flex items-center gap-2 text-primary">
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-base-content/75 uppercase tracking-wider font-mono truncate">
                    {stat.label}
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-xs text-base-content/70 mt-0.5">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
