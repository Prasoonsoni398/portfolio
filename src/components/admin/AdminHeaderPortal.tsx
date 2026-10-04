"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AdminHeaderPortalProps {
  children: React.ReactNode;
}

export function AdminHeaderPortal({ children }: AdminHeaderPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(() => {
    if (typeof document !== "undefined") {
      return document.getElementById("admin-header-tabs-portal");
    }
    return null;
  });

  useEffect(() => {
    if (!container) {
      const el = document.getElementById("admin-header-tabs-portal");
      if (el) setContainer(el);
    }
  }, [container]);

  if (!container) return null;

  return createPortal(children, container);
}
