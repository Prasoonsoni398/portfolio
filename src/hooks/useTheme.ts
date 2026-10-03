"use client";

import { useEffect, useState } from "react";

export type ThemeName =
  | "ghibli-light"
  | "ghibli"
  | "perplexity"
  | "shadcn"
  | "perplexity-light"
  | "shadcn-light";

const VALID_THEMES: ThemeName[] = [
  "ghibli-light",
  "ghibli",
  "perplexity",
  "shadcn",
  "perplexity-light",
  "shadcn-light",
];

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>("ghibli-light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme") as ThemeName;
      if (saved && VALID_THEMES.includes(saved)) {
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        setTheme("ghibli-light");
        document.documentElement.setAttribute("data-theme", "ghibli-light");
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const changeTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch {
      // ignore
    }
  };

  const isDark = !theme.endsWith("-light");

  const toggleMode = () => {
    let nextTheme: ThemeName;
    if (isDark) {
      if (theme === "perplexity") nextTheme = "perplexity-light";
      else if (theme === "shadcn") nextTheme = "shadcn-light";
      else nextTheme = "ghibli-light";
    } else {
      if (theme === "perplexity-light") nextTheme = "perplexity";
      else if (theme === "shadcn-light") nextTheme = "shadcn";
      else nextTheme = "ghibli";
    }
    changeTheme(nextTheme);
  };

  return {
    theme,
    isDark,
    changeTheme,
    toggleMode,
    mounted
  };
}
