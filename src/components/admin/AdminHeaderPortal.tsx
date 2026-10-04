"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AdminHeaderPortalProps {
  children: React.ReactNode;
}

export function AdminHeaderPortal({ children }: AdminHeaderPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById("admin-header-tabs-portal"));
  }, []);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}
