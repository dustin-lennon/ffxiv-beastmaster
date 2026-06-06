import Link from "next/link";

const SECTIONS = [
  { href: "/bestiary", label: "Bestiary", desc: "Track your captured beasts. 50 total — available Patch 7.56." },
  { href: "/guides",   label: "Guides",   desc: "How to play Beastmaster, rotation tips, and strategies." },
  { href: "/gear",     label: "Gear",     desc: "Recommended gear sets and BiS lists by content tier." },
  { href: "/videos",   label: "Videos",   desc: "Video guides from the community and content creators." },
  { href: "/map",      label: "Map",      desc: "Beast spawn locations across Eorzea." },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl font-bold text-ffxiv-gold">Tamer&apos;s Compendium</h2>
        <p className="text-ffxiv-muted max-w-lg text-sm leading-relaxed">
          The community hub for Final Fantasy XIV&apos;s Beastmaster limited job.
          Bestiary tracker, guides, gear, and more — all in one place.
        </p>
        <p className="text-xs text-ffxiv-muted/60 border border-ffxiv-border/30 rounded px-3 py-1">
          Beastmaster launches Patch 7.56 — September 8, 2026
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
        {SECTIONS.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="rounded border border-ffxiv-border bg-ffxiv-panel p-5 flex flex-col gap-2
              hover:border-ffxiv-gold/60 hover:bg-ffxiv-panel/80 transition-colors group"
          >
            <span className="text-ffxiv-gold font-bold group-hover:opacity-90">{label}</span>
            <span className="text-xs text-ffxiv-muted leading-relaxed">{desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
