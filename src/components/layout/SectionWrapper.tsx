import React from "react";
import { cn } from "@/utils/cn";
import { Container } from "./Container";

export interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  altBg?: boolean;
  wide?: boolean;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  altBg = false,
  wide = false,
  className
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 relative overflow-hidden transition-colors scroll-mt-20 sm:scroll-mt-24",
        altBg ? "bg-base-200/40 border-y border-base-300/40" : "bg-base-100",
        className
      )}
    >
      <Container wide={wide}>{children}</Container>
    </section>
  );
}
