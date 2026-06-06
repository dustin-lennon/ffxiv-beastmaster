"use client";

import { useState } from "react";
import { BeastGrid } from "@/components/bestiary/BeastGrid";
import { BeastDetail } from "@/components/bestiary/BeastDetail";
import { ALL_BEAST_SLOTS, MOCK_BEASTS } from "@/lib/mock-beasts";

export default function BestiaryPage() {
  const [selected, setSelected] = useState<number | null>(33); // default to Coeurl
  const [captured, setCaptured] = useState<number[]>([]);

  const selectedBeast = selected
    ? MOCK_BEASTS.find((b) => b.number === selected) ?? null
    : null;

  const toggleCapture = (number: number) => {
    setCaptured((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-ffxiv-gold tracking-wide">
        ✦ Master&apos;s Bestiary
      </h2>
      <div className="flex gap-6 items-start">
        {/* Left: grid */}
        <div className="w-64 shrink-0 rounded border border-ffxiv-border bg-ffxiv-panel p-3">
          <BeastGrid
            slots={ALL_BEAST_SLOTS}
            captured={captured}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        {/* Right: detail */}
        <div className="flex-1 rounded border border-ffxiv-border bg-ffxiv-panel p-4 min-h-96">
          <BeastDetail
            beast={selectedBeast}
            slotNumber={selected}
            captured={captured}
            onToggleCapture={toggleCapture}
          />
        </div>
      </div>
    </div>
  );
}
