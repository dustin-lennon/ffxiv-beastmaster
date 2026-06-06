// Beast element/classification types (XBMElement.csv - 10 entries)
export type BeastElement =
  | "Fire"
  | "Ice"
  | "Wind"
  | "Earth"
  | "Lightning"
  | "Water"
  | "Unaspected"
  | "Beastskin"
  | "Scale"
  | "Unknown";

// Beast size options (S/M/L from XBMPet boolean columns)
export type BeastSize = "S" | "M" | "L";

// Ability types from XBMBattleDetail
export type AbilityType = "Trick" | "TemperedRelease";

export interface BeastAbility {
  id: number;           // Action.csv ID
  name: string;         // Action.csv name
  description: string;  // ActionTransient.csv description
  type: AbilityType;
  targetType: string;   // XBMActionTarget
  level: number;        // Unlock level
  icon?: string;        // Icon path
}

export interface BeastLocation {
  zone: string;         // TerritoryType.csv name
  mapX: number;         // Converted map coordinate
  mapY: number;         // Converted map coordinate
  territoryId: number;  // TerritoryType ID
}

export interface Beast {
  id: number;           // XBMPet row index (1–50)
  number: number;       // Display number (NO. 33)
  name: string;         // BNpcName.csv
  classification: BeastElement;
  autoAttackElement: BeastElement;
  sizes: BeastSize[];   // Available sizes
  trick: BeastAbility;
  temperedRelease: BeastAbility;
  location: BeastLocation;
  lore: string;         // Natural Habitat description
  bnpcId: number;       // BNpcName ID for cross-reference
  portrait?: string;    // Portrait image path
}

// User tracking state
export interface BeastTrackerState {
  captured: number[];   // Array of Beast IDs the user has captured
  updatedAt: string;    // ISO timestamp
}
