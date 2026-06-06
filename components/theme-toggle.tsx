"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center gap-1 rounded-md border border-light-border bg-gray-100 p-1 dark:border-ffxiv-border dark:bg-ffxiv-dark">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={label}
          className={
            mounted && theme === value
              ? "flex items-center justify-center rounded p-1.5 bg-white text-gray-900 shadow-sm dark:bg-ffxiv-panel dark:text-ffxiv-gold"
              : "flex items-center justify-center rounded p-1.5 text-gray-400 hover:text-gray-700 dark:text-ffxiv-muted dark:hover:text-ffxiv-text"
          }
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
