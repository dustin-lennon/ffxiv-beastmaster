import type { Beast } from "@/types/beast";

// Mock data based on confirmed datamining findings.
// Real data populates in feature/2 after Patch 7.56 (Sept 8, 2026).
export const MOCK_BEASTS: Beast[] = [
  {
    id: 33,
    number: 33,
    name: "Coeurl",
    classification: "Beastskin",
    autoAttackElement: "Lightning",
    sizes: ["S", "M", "L"],
    trick: {
      id: 46900,
      name: "Blaster",
      description: "Delivers an attack to target.",
      type: "Trick",
      targetType: "Single Target",
      level: 8,
    },
    temperedRelease: {
      id: 46901,
      name: "Charged Whisker",
      description: "Delivers an area attack, dealing lightning damage to all nearby enemies.",
      type: "TemperedRelease",
      targetType: "Area of Effect",
      level: 18,
    },
    location: {
      zone: "Outer La Noscea",
      mapX: 21.4,
      mapY: 17.8,
      territoryId: 155,
    },
    lore: "These sleek, feline predators are found prowling the rocky crags of Outer La Noscea. Their long, whip-like whiskers are capable of discharging powerful bolts of lightning, making them fearsome hunters.",
    bnpcId: 106,
  },
];

// Generate 49 placeholder beasts to fill the 5x5 grid (50 total)
export const ALL_BEAST_SLOTS: (Beast | null)[] = Array.from({ length: 50 }, (_, i) => {
  const number = i + 1;
  const known = MOCK_BEASTS.find((b) => b.number === number);
  return known ?? null;
});
