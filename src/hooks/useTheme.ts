"use client";

import { useEffect, useState } from "react";

export type ThemeName =
  | "perplexity"
  | "shadcn"
  | "ghibli"
  | "perplexity-light"
  | "shadcn-light"
  | "ghibli-light";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>("perplexity");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as ThemeName;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("portfolio-theme", theme);
    }
  }, [theme, mounted]);

  const changeTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
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
