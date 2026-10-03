import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/utils/cn";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-10 md:mb-14",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && <Badge variant="primary">{badge}</Badge>}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-base-content">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-base-content/70 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
