import type { Beast, BeastSize } from "@/types/beast";
import { AbilityCard } from "./AbilityCard";

const ELEMENT_COLORS: Record<string, string> = {
  Fire:        "text-orange-400",
  Ice:         "text-cyan-300",
  Wind:        "text-green-400",
  Earth:       "text-amber-600",
  Lightning:   "text-yellow-300",
  Water:       "text-blue-400",
  Unaspected:  "text-gray-300",
  Beastskin:   "text-amber-400",
  Scale:       "text-teal-400",
  Unknown:     "text-ffxiv-muted",
};

const ELEMENT_SYMBOLS: Record<string, string> = {
  Fire:       "🔥",
  Ice:        "❄️",
  Wind:       "🌀",
  Earth:      "🌍",
  Lightning:  "⚡",
  Water:      "💧",
  Unaspected: "◇",
  Beastskin:  "🐾",
  Scale:      "🐉",
  Unknown:    "?",
};

interface BeastDetailProps {
  beast: Beast | null;
  slotNumber: number | null;
  captured: number[];
  onToggleCapture: (number: number) => void;
}

export function BeastDetail({ beast, slotNumber, captured, onToggleCapture }: BeastDetailProps) {
  if (!slotNumber) {
    return (
      <div className="flex h-full items-center justify-center text-ffxiv-muted text-sm">
        Select a beast from the grid
      </div>
    );
  }

  const isCaptured = captured.includes(slotNumber);

  if (!beast) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-ffxiv-border pb-3">
          <div>
            <p className="text-xs text-ffxiv-muted font-mono">NO. {String(slotNumber).padStart(2, "0")}</p>
            <h2 className="text-xl font-bold text-ffxiv-muted">???</h2>
          </div>
          <button
            onClick={() => onToggleCapture(slotNumber)}
            className="rounded border border-ffxiv-border px-3 py-1.5 text-xs text-ffxiv-muted hover:border-ffxiv-gold hover:text-ffxiv-gold transition-colors"
          >
            {isCaptured ? "Uncapture" : "Mark Captured"}
          </button>
        </div>
        <p className="text-sm text-ffxiv-muted italic">
          Beast data unavailable until Patch 7.56 (September 8, 2026).
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-ffxiv-border pb-3">
        <div>
          <p className="text-xs text-ffxiv-muted font-mono tracking-widest">
            NO. {String(beast.number).padStart(2, "0")}
          </p>
          <h2 className="text-2xl font-bold text-ffxiv-text">{beast.name}</h2>
        </div>
        <button
          onClick={() => onToggleCapture(slotNumber)}
          className={[
            "rounded border px-3 py-1.5 text-xs font-medium transition-colors",
            isCaptured
              ? "border-ffxiv-green/60 text-ffxiv-green hover:border-red-400 hover:text-red-400"
              : "border-ffxiv-gold/60 text-ffxiv-gold hover:bg-ffxiv-gold/10",
          ].join(" ")}
        >
          {isCaptured ? "✓ Captured" : "Mark Captured"}
        </button>
      </div>

      {/* Size selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ffxiv-muted w-20">Size</span>
        <div className="flex gap-1">
          {(["S", "M", "L"] as BeastSize[]).map((size) => {
            const available = beast.sizes.includes(size);
            return (
              <span
                key={size}
                className={[
                  "rounded px-2.5 py-1 text-xs font-bold border",
                  available
                    ? "border-ffxiv-green/60 bg-ffxiv-green/20 text-ffxiv-green"
                    : "border-ffxiv-border/30 text-ffxiv-muted/30",
                ].join(" ")}
              >
                {size}
              </span>
            );
          })}
        </div>
      </div>

      {/* Classification */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ffxiv-muted w-20">Classification</span>
        <span className={`text-sm font-medium ${ELEMENT_COLORS[beast.classification]}`}>
          {ELEMENT_SYMBOLS[beast.classification]} {beast.classification}
        </span>
      </div>

      {/* Auto-attack */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ffxiv-muted w-20">Auto-attack</span>
        <span className={`text-sm font-medium ${ELEMENT_COLORS[beast.autoAttackElement]}`}>
          {ELEMENT_SYMBOLS[beast.autoAttackElement]} {beast.autoAttackElement}
        </span>
      </div>

      {/* Ability cards */}
      <AbilityCard ability={beast.temperedRelease} />
      <AbilityCard ability={beast.trick} />

      {/* Natural Habitat */}
      <div className="rounded border border-ffxiv-border/50 bg-ffxiv-dark/40 p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-ffxiv-gold uppercase tracking-wider">
          Natural Habitat
        </p>
        <p className="text-sm text-ffxiv-text font-medium">{beast.location.zone}</p>
        <p className="text-xs text-ffxiv-muted leading-relaxed">{beast.lore}</p>
      </div>
    </div>
  );
}
