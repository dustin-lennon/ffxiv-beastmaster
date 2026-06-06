import type { BeastAbility } from "@/types/beast";

const TYPE_LABELS: Record<string, string> = {
  Trick: "Trick",
  TemperedRelease: "Tempered Release",
};

interface AbilityCardProps {
  ability: BeastAbility;
}

export function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <div className="rounded border border-ffxiv-border/50 bg-ffxiv-dark/40 p-3 flex flex-col gap-1.5">
      {/* Type + level header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-ffxiv-gold uppercase tracking-wider">
          {TYPE_LABELS[ability.type]} (Lv. {ability.level})
        </span>
        <span className="text-[10px] text-ffxiv-muted border border-ffxiv-border/40 rounded px-1.5 py-0.5">
          {ability.targetType}
        </span>
      </div>
      {/* Ability name */}
      <p className="text-sm font-bold text-ffxiv-text">{ability.name}</p>
      {/* Description */}
      <p className="text-xs text-ffxiv-muted leading-relaxed">{ability.description}</p>
    </div>
  );
}
