import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Providers } from "./providers";
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
      <body className="bg-light-bg text-light-text font-ffxiv min-h-screen dark:bg-ffxiv-dark dark:text-ffxiv-text">
        <Providers>
          <header className="border-b border-light-border bg-light-panel px-6 py-4 dark:border-ffxiv-border dark:bg-ffxiv-panel">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-ffxiv-gold text-xl font-bold tracking-wide">
                ✦ Master&apos;s Bestiary
              </h1>
              <nav className="flex items-center gap-6 text-sm">
                <div className="flex gap-4">
                  <Link href="/" className="text-light-muted hover:text-ffxiv-gold transition-colors dark:text-ffxiv-muted dark:hover:text-ffxiv-gold">Home</Link>
                  <Link href="/bestiary" className="text-light-muted hover:text-ffxiv-gold transition-colors dark:text-ffxiv-muted dark:hover:text-ffxiv-gold">Bestiary</Link>
                  <Link href="/map" className="text-light-muted hover:text-ffxiv-gold transition-colors dark:text-ffxiv-muted dark:hover:text-ffxiv-gold">Map</Link>
                </div>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
