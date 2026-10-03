import React from "react";
import { cn } from "@/utils/cn";
import { layoutStyles } from "@/styles/layout";

export interface ContainerProps {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}

export function Container({ children, wide = false, className }: ContainerProps) {
  return (
    <div className={cn(wide ? layoutStyles.wideContainer : layoutStyles.container, className)}>
      {children}
    </div>
  );
}
