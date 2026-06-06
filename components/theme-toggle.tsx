"use client";

import { useTheme } from "@/app/theme-provider";
import { useContext } from "react";

export function ThemeToggle() {
  try {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="rounded px-3 py-1.5 text-sm font-medium transition-colors
          bg-gray-200 text-gray-900 hover:bg-gray-300
          dark:bg-ffxiv-panel dark:text-ffxiv-gold dark:hover:bg-ffxiv-border"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    );
  } catch {
    return null;
  }
}
