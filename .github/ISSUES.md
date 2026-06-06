# GitHub Issues to Create

Create these on GitHub after pushing the repo. Each maps to a local feature branch.

---

## Issue #1 — Project Foundation
**Branch:** `feature/1-project-foundation`
**Label:** `enhancement`
**Milestone:** `v0.1.0`

Set up foundational project structure including routing, layout, shared components, and data type definitions.

### Acceptance Criteria
- [ ] App layout with header/nav matching FFXIV UI aesthetic
- [ ] TypeScript interfaces for Beast, Ability, Location, Element
- [ ] Tailwind theme configured with FFXIV color palette
- [ ] Placeholder pages for /bestiary, /beast/[id], /map
- [ ] README documented

---

## Issue #2 — Beast Data Pipeline
**Branch:** `feature/2-beast-data-pipeline`
**Label:** `enhancement`
**Milestone:** `v0.2.0`

Parse Beastmaster game data from ffxiv-datamining CSVs into structured JSON.

### Acceptance Criteria
- [ ] Script to parse XBMPet.csv → beasts.json
- [ ] Script to parse XBMBattleDetail.csv → beast abilities
- [ ] Script to parse BNpcName.csv → beast names
- [ ] Script to cross-reference Level.csv + TerritoryType.csv → spawn locations
- [ ] Data stored in /public/data as static JSON

---

## Issue #3 — Master's Bestiary UI
**Branch:** `feature/3-bestiary-ui`
**Label:** `enhancement`
**Milestone:** `v0.3.0`

Recreate the in-game Master's Bestiary UI as a web component.

### Acceptance Criteria
- [ ] 5×5 beast grid with number labels
- [ ] Beast portrait or ? placeholder if uncaptured
- [ ] Beast detail panel (name, classification, element, size selector S/M/L)
- [ ] Trick ability card with description and targeting info
- [ ] Tempered Release ability card with description and targeting info
- [ ] Natural Habitat section with zone name and lore text
- [ ] Responsive layout

---

## Issue #4 — Beast Tracker
**Branch:** `feature/4-beast-tracker`
**Label:** `enhancement`
**Milestone:** `v0.3.0`

Allow users to track which beasts they have captured.

### Acceptance Criteria
- [ ] Toggle captured state per beast
- [ ] Progress counter (X/50) displayed
- [ ] Persistence via localStorage
- [ ] Filter: All / Captured / Uncaptured
- [ ] Visual distinction between captured and uncaptured slots

---

## Issue #5 — Map Locations
**Branch:** `feature/5-map-locations`
**Label:** `enhancement`
**Milestone:** `v0.4.0`

Display beast spawn locations on interactive FFXIV zone maps.

### Acceptance Criteria
- [ ] Zone map images rendered correctly
- [ ] Beast spawn pins using converted coordinate data
- [ ] Click pin → shows beast detail
- [ ] Filter map by zone
- [ ] Captured beasts visually distinct on map

---

## Issue #6 — Ability Viewer
**Branch:** `feature/6-ability-viewer`
**Label:** `enhancement`
**Milestone:** `v0.4.0`

Display full ability details for each beast.

### Acceptance Criteria
- [ ] Ability icons from game assets
- [ ] Full descriptions from ActionTransient
- [ ] Trick vs Tempered Release clearly distinguished
- [ ] Element and targeting type badges
- [ ] Searchable ability list across all beasts

---

## Issue #7 — Cloudflare Workers Deployment
**Branch:** `feature/7-cloudflare-deployment`
**Label:** `infrastructure`
**Milestone:** `v1.0.0`

Configure full deployment pipeline to Cloudflare Workers.

### Acceptance Criteria
- [ ] wrangler.toml fully configured
- [ ] GitHub Actions CI/CD deploying on push to main
- [ ] Environment variables documented in README
- [ ] Production deployment verified
- [ ] Custom domain configured
