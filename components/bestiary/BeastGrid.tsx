"use client";

import type { Beast } from "@/types/beast";

interface BeastGridProps {
  slots: (Beast | null)[];
  captured: number[];
  selected: number | null;
  onSelect: (number: number) => void;
}

export function BeastGrid({ slots, captured, selected, onSelect }: BeastGridProps) {
  const capturedCount = captured.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5">
        {slots.map((beast, i) => {
          const number = i + 1;
          const isCaptured = captured.includes(number);
          const isSelected = selected === number;
          const hasData = beast !== null;

          return (
            <button
              key={number}
              onClick={() => onSelect(number)}
              className={[
                "relative flex flex-col items-center justify-center rounded border",
                "aspect-square transition-all duration-150",
                isSelected
                  ? "border-ffxiv-gold bg-ffxiv-gold/20 shadow-md shadow-ffxiv-gold/30"
                  : isCaptured
                  ? "border-ffxiv-border bg-ffxiv-panel hover:border-ffxiv-gold/60"
                  : "border-ffxiv-border/40 bg-ffxiv-dark/60 hover:border-ffxiv-border",
              ].join(" ")}
            >
              {/* Portrait or placeholder */}
              <div className="flex h-10 w-10 items-center justify-center">
                {hasData && beast.portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={beast.portrait} alt={beast.name} className="h-full w-full object-cover rounded" />
                ) : (
                  <span className={[
                    "text-xl font-bold",
                    isCaptured ? "text-ffxiv-text" : "text-ffxiv-muted/40",
                  ].join(" ")}>
                    {isCaptured ? "?" : "?"}
                  </span>
                )}
              </div>
              {/* Number label */}
              <span className={[
                "text-[10px] font-mono leading-none mt-0.5",
                isSelected ? "text-ffxiv-gold" : "text-ffxiv-muted",
              ].join(" ")}>
                {String(number).padStart(2, "0")}
              </span>
              {/* Captured indicator */}
              {isCaptured && (
                <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-ffxiv-green" />
              )}
            </button>
          );
        })}
      </div>

      {/* Progress counter */}
      <div className="flex items-center justify-between border-t border-ffxiv-border/50 pt-2 text-xs text-ffxiv-muted">
        <span>Beasts Captured</span>
        <span className="font-mono text-ffxiv-gold">
          {capturedCount} <span className="text-ffxiv-muted">/ 50</span>
        </span>
      </div>
    </div>
  );
}
