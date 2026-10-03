import React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "success";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary/15 text-primary border-primary/25",
    secondary: "bg-secondary/15 text-secondary border-secondary/25",
    accent: "bg-accent/15 text-accent border-accent/25",
    neutral: "bg-base-300/80 text-base-content/80 border-base-300",
    success: "bg-success/15 text-success border-success/25"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
