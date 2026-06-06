import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FFXIV dark theme colors
        "ffxiv-gold": "#c8a84b",
        "ffxiv-dark": "#1a1a2e",
        "ffxiv-panel": "#2a2a3e",
        "ffxiv-border": "#4a4a6a",
        "ffxiv-text": "#e8e0cc",
        "ffxiv-muted": "#8a8a9a",
        "ffxiv-green": "#4caf50",
        "ffxiv-blue": "#5b9bd5",
        "ffxiv-red": "#c0392b",
        // Light theme colors
        "light-bg": "#f5f5f5",
        "light-panel": "#ffffff",
        "light-border": "#d0d0d0",
        "light-text": "#333333",
        "light-muted": "#666666",
      },
      fontFamily: {
        ffxiv: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
