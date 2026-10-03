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
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme") as ThemeName;
      if (saved) return saved;
    }
    return "perplexity";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

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
    toggleMode
  };
}
