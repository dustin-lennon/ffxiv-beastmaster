export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h2 className="text-3xl text-ffxiv-gold font-bold">Master&apos;s Bestiary</h2>
      <p className="text-ffxiv-muted max-w-md">
        Track your captured beasts for the Beastmaster limited job. 
        Available in Patch 7.56 — September 8, 2026.
      </p>
      <a
        href="/bestiary"
        className="px-6 py-3 bg-ffxiv-gold text-ffxiv-dark font-bold rounded hover:opacity-90 transition-opacity"
      >
        Open Bestiary
      </a>
    </div>
  );
}
