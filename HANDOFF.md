# Project Handoff — FFXIV Beastmaster Bestiary

This document captures the full context of decisions made and work completed before
Claude Code was introduced to this project. Read this alongside CLAUDE.md.

---

## Current Status

- **Git:** `develop` branch, all 7 feature branches created
- **GitHub:** Repo created, issues #1–#7 created, milestones v0.1.0–v1.0.0, branch protections on `main` and `develop`
- **Next step:** Begin `feature/1-project-foundation`

---

## How This Project Came About

The owner plays FFXIV on the Brynhildr server (Crystal DC) and runs Eorzea Estates
(eorzeaestates.com), a community housing directory built with Next.js. This project
follows the same pattern — a fan community tool for the new Beastmaster limited job
launching in Patch 7.56 (September 8, 2026).

---

## Datamining Research Summary

Extensive research was done against the ffxiv-datamining repo (Windows PC at
`H:\ffxiv-datamining`) to understand the Beastmaster data structure before the
patch dropped.

### Key Finding: XBM = Beastmaster

The prefix `XBM` in all CSV filenames = Beastmaster. This was confirmed by cross-
referencing with Blue Mage's `AOZ` prefix pattern.

### What We Found

| Table | Status | Notes |
|-------|--------|-------|
| `XBMPet.csv` | Structure only | 51 rows (0–50), 50 capturable beasts confirmed. Names empty until 7.56 |
| `XBMBattleDetail.csv` | **Has data** | 46 beast groups (rows 1.0–45.x), each with ability mappings |
| `XBMBattleDetailAction.csv` | **Has data** | 180 ability IDs referencing Action.csv |
| `XBMElement.csv` | Structure only | 10 element/classification types |
| `XBMContent.csv` | **Has data** | 6 Crucible of the Unbroken stages with score thresholds |
| `XBMContentBattle.csv` | **Has data** | Beast groupings per Crucible stage |
| `XBMPetParamGrow.csv` | Structure only | Beast stat growth, empty until 7.56 |
| `XBMScoreRank.csv` | Structure only | 9 score ranks, empty until 7.56 |

### Action IDs

BST ability Action IDs range from approximately **46866 to 50943**.
All names are currently blank in Action.csv — they cut off at ID ~46864.
The community will populate these within 24–48 hours of 7.56 dropping.

### BNpcName IDs for Known Beasts

These were confirmed from `BNpcName.csv` and will be used to cross-reference
beast data once XBMPet is populated:

| ID | Name |
|----|------|
| 106 | coeurl |
| 353 | goobbue |
| 655 | behemoth |
| 1590 | chimera |
| 9456 | tamed coeurl (companion version) |
| 4821 | tamed goobbue (companion version) |

### Coordinate Conversion

Spawn coordinates from `Level.csv` need conversion before use on maps:
```ts
mapX = ((rawX + offsetX) * sizeFactor / 100) + 1
mapY = ((rawY + offsetY) * sizeFactor / 100) + 1
```
`sizeFactor`, `offsetX`, `offsetY` come from `Map.csv` joined via `TerritoryType.csv`.

---

## UI Reference

A screenshot of the in-game Master's Bestiary UI was captured showing beast #33
(Coeurl). Key UI elements confirmed:

**Left panel:**
- 5×5 beast grid (25 visible, scrollable to 50)
- Each slot: beast portrait or `?` if uncaptured, number label below
- "Beasts Captured X/50" progress counter at bottom
- Filter and sort buttons
- Battlehorn Settings tabs (1 and 2)

**Right panel:**
- `NO. 33 Coeurl` header
- `S` `M` `L` size selector (green = selected)
- `Borrow (Lv. 22)` button
- Classification: `Beastskin`
- Auto-attack: `⚡ Lightning`
- **Tempered Release (Lv. 18):** ability name `Charged Whisker`, `Area of Effect`, description
- **Trick (Lv. 8):** ability name `Blaster`, `Single Target`, description
- **Natural Habitat:** zone name `Outer La Noscea`, lore paragraph

---

## Data Pipeline Plan (feature/2)

When 7.56 drops, run `git pull` on Windows PC at `H:\ffxiv-datamining`, then run
the data pipeline scripts (to be built in `feature/2-beast-data-pipeline`) to
produce JSON files in `/public/data/`:

- `beasts.json` — full beast roster from XBMPet + BNpcName
- `abilities.json` — from XBMBattleDetailAction + Action + ActionTransient
- `locations.json` — from Level + TerritoryType + Map (with coordinate conversion)
- `elements.json` — from XBMElement

A calendar reminder is set for September 8, 2026 to pull the repo and check.

---

## Tech Decisions & Rationale

| Decision | Choice | Reason |
|----------|--------|--------|
| Package manager | Bun | Speed; owner familiar with it |
| Framework | Next.js 16.2.6 | Already used on Eorzea Estates; App Router; Cloudflare compatible |
| Deployment | Cloudflare Workers | Consistent with health-journal project |
| Versioning | Semantic Versioning + release-please | Automated changelog/version bumps on merge to main |
| Branching | Gitflow | 7 features mapped to milestones |
| CI/CD | release-please.yml (deploy on release) + deploy.yml (CI on feature/develop) | Deploy only on tagged releases |

---

## Related Projects on This Machine

- `~/Development/ffxiv-estate-directory` — Eorzea Estates (sister project, same owner)
- `~/Development/health-journal` — Health Journal (reference for Cloudflare Workers patterns)

The health-journal project uses a similar Cloudflare Workers + Next.js setup and
is a good reference for wrangler config patterns.

---

## Patch Timeline

| Patch | Date | BST Relevance |
|-------|------|---------------|
| 7.51 | June 1, 2026 | Checked — no BST data |
| 7.55 | July 28, 2026 | May pre-populate strings — check repo |
| **7.56** | **September 8, 2026** | **Beastmaster launches — full data expected** |

---

## Starting Point for Claude Code

```bash
cd ~/Development/ffxiv-beastmaster
git checkout feature/1-project-foundation
bun install
claude
```

First task: **Issue #1 — Project Foundation**
- Refine the app layout to match FFXIV UI aesthetic (parchment/dark theme)
- Verify TypeScript interfaces in `types/beast.ts` cover all data needs
- Ensure Tailwind config has the full FFXIV color palette
- Confirm placeholder pages render at /bestiary and /map
- Once done: PR to develop, merge, move to feature/2
