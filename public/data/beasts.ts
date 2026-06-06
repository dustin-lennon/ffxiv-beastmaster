// Placeholder beast data — replaced by parsed CSV data post-7.56
// Structure mirrors the Beast interface in types/beast.ts

import type { Beast } from "@/types/beast";

export const BEASTS_PLACEHOLDER: Partial<Beast>[] = [
  {
    id: 33,
    number: 33,
    name: "Coeurl",
    classification: "Beastskin",
    autoAttackElement: "Lightning",
    sizes: ["S", "M", "L"],
    location: { zone: "Outer La Noscea", mapX: 0, mapY: 0, territoryId: 0 },
    lore: "These predatory quadrupeds, unrivaled in their savagery, trace their origins to regions of the Near East. Coeurls subdue their prey by unleashing electrical shocks from the two whip-like appendages that frame their fang-lined jaws, making them highly valued beasts of war—especially amongst pirates.",
  },
];

export const TOTAL_BEASTS = 50;
