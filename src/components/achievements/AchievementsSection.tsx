import React from "react";
import { achievements } from "@/mockdata/achievements";
import { SectionHeading } from "../common/SectionHeading";
import { SectionWrapper } from "../layout/SectionWrapper";
import { Trophy, ExternalLink } from "lucide-react";

export function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" altBg>
      <SectionHeading
        badge="Key Milestones"
        title="Achievements &amp; Impact"
        subtitle="Tangible outcomes across educational content creation, real-time development, and academia."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-base-300 bg-base-100 p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-primary/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-secondary/10 text-secondary">
                  <Trophy className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-base-content/60">
                  {item.date}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-base-content">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-base-content/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-base-300 flex items-center justify-between">
              {item.metrics && (
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded bg-primary/10">
                  {item.metrics}
                </span>
              )}
              {item.linkUrl && (
                <a
                  href={item.linkUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-base-content hover:text-primary transition-colors ml-auto"
                >
                  <span>{item.linkText || "Learn more"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
