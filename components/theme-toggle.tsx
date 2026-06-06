/* global document, localStorage */
"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded px-3 py-1.5 text-sm font-medium transition-colors
        bg-gray-200 text-gray-900 hover:bg-gray-300
        dark:bg-ffxiv-panel dark:text-ffxiv-gold dark:hover:bg-ffxiv-border"
      aria-label="Toggle theme"
    >
      🌗
    </button>
  );
}
