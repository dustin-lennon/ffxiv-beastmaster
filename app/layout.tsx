import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFXIV Beastmaster Bestiary",
  description: "Track your captured beasts in Final Fantasy XIV's Beastmaster limited job.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ffxiv-dark text-ffxiv-text font-ffxiv min-h-screen dark:bg-ffxiv-dark dark:text-ffxiv-text light:bg-light-bg light:text-light-text">
        <ThemeProvider>
          <header className="border-b border-ffxiv-border bg-ffxiv-panel px-6 py-4 dark:border-ffxiv-border dark:bg-ffxiv-panel light:border-light-border light:bg-light-panel">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-ffxiv-gold text-xl font-bold tracking-wide dark:text-ffxiv-gold light:text-ffxiv-gold">
                ✦ Master&apos;s Bestiary
              </h1>
              <nav className="flex items-center gap-6 text-sm">
                <div className="flex gap-4">
                  <a href="/bestiary" className="text-ffxiv-muted hover:text-ffxiv-gold transition-colors dark:text-ffxiv-muted dark:hover:text-ffxiv-gold light:text-light-muted light:hover:text-ffxiv-gold">Bestiary</a>
                  <a href="/map" className="text-ffxiv-muted hover:text-ffxiv-gold transition-colors dark:text-ffxiv-muted dark:hover:text-ffxiv-gold light:text-light-muted light:hover:text-ffxiv-gold">Map</a>
                </div>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
