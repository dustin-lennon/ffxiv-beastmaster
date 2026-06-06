import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFXIV Beastmaster Bestiary",
  description: "Track your captured beasts in Final Fantasy XIV's Beastmaster limited job.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ffxiv-dark text-ffxiv-text font-ffxiv min-h-screen">
        <header className="border-b border-ffxiv-border bg-ffxiv-panel px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-ffxiv-gold text-xl font-bold tracking-wide">
              ✦ Master&apos;s Bestiary
            </h1>
            <nav className="flex gap-6 text-sm text-ffxiv-muted">
              <a href="/bestiary" className="hover:text-ffxiv-gold transition-colors">Bestiary</a>
              <a href="/map" className="hover:text-ffxiv-gold transition-colors">Map</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
