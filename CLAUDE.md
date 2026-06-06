# FFXIV Beastmaster Bestiary

A web application for tracking captured beasts in Final Fantasy XIV's Beastmaster limited job (Patch 7.56). Faithfully recreates the in-game Master's Bestiary UI.

> **New to this project?** Read `HANDOFF.md` first — it contains the full research history, datamining findings, UI reference details, and decision log from before Claude Code was introduced.

## Package Manager

**Use `bun` exclusively.** Do NOT use npm, pnpm, or yarn.

```bash
bun install           # Install dependencies
bun add <pkg>         # Add a package
bun remove <pkg>      # Remove a package
bun run dev           # Start dev server
bun run build         # Build for production
bun run lint          # Lint
bun run pages:build   # Build for Cloudflare
bun run deploy        # Deploy to Cloudflare Workers
```

## Stack

- **Framework:** Next.js 16.2.7 (App Router) + TypeScript + Turbopack
- **Styling:** Tailwind CSS 4
- **Package Manager:** Bun
- **Deployment:** Cloudflare Workers via `@cloudflare/next-on-pages`
- **Versioning:** Semantic Versioning (current: 0.1.0)

## Project Structure

```
app/                      # Next.js App Router pages and layouts
app/bestiary/             # Bestiary grid page
app/beast/[id]/           # Individual beast detail page
app/map/                  # Zone map page
components/bestiary/      # Master's Bestiary UI components
components/map/           # Zone map components
components/abilities/     # Ability viewer components
components/ui/            # Shared UI primitives
public/data/              # Static beast data JSON (generated from datamining CSVs)
public/images/beasts/     # Beast portrait images (from TexTools extraction)
public/images/maps/       # Zone map images
scripts/                  # Data pipeline scripts (CSV → JSON)
types/                    # TypeScript interfaces
```

## Branching Strategy (Gitflow)

- `main` — production only, tagged releases
- `develop` — integration branch
- `feature/*` — all new work branches off develop
- `hotfix/*` — branches off main for urgent fixes
- `release/*` — release prep branches off develop

**Always branch from `develop` for new features.**

## Pull Request Workflow

All work must go through PRs — never commit directly to `main` or `develop`.

**Feature workflow:**
1. Work on `feature/*` branch
2. PR → `develop` (squash merge)
3. When milestone is complete, PR `develop` → `main` (squash merge)
4. release-please detects conventional commits on `main` and opens a Release PR automatically
5. Merge the Release PR → triggers deploy to Cloudflare Workers

**PR titles must follow Conventional Commits** so release-please can version correctly:
- `feat: description` → minor bump
- `fix: description` → patch bump
- `feat!: description` or `BREAKING CHANGE` in body → major bump

**Hotfix workflow:**
1. Branch `hotfix/*` off `main`
2. PR → `main` (squash merge)
3. PR → `develop` to backport

**Every PR must have:**
- **Assignee:** `dustin-lennon`
- **Label:** matching the type of work (e.g. `enhancement`, `bug`, `infrastructure`)
- **Milestone:** matching the target version (e.g. `v0.1.0`) — use the milestone that corresponds to the feature branch being worked on per the Feature Branch → Issue Mapping table below

When opening a PR with `gh pr create`, always include these flags:
```bash
gh pr create \
  --assignee dustin-lennon \
  --label "enhancement" \
  --milestone "v0.x.0" \
  --title "feat: description" \
  --body "$(cat .github/pull_request_template.md)"
```

The PR body must use `.github/pull_request_template.md` as its base. Fill in the Summary and check the appropriate Type of Change box before submitting. The Closes #N reference must match the issue number for the feature being completed.

Follows [Semantic Versioning](https://semver.org):
- `MAJOR` — breaking changes
- `MINOR` — new features (`feat:`)
- `PATCH` — bug fixes (`fix:`)

**Do NOT manually bump versions or edit CHANGELOG.md.** Both are managed automatically by [release-please](https://github.com/googleapis/release-please) on merge to `main`. It reads conventional commit messages and generates a release PR automatically.

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org):
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance, deps
- `docs:` — documentation
- `style:` — formatting
- `refactor:` — code restructure
- `test:` — tests

## Available Skills

The following skills are installed and should be used when relevant:

### From ~/Development/claude-skills/skills/skills/
| Skill | Use When |
|-------|----------|
| `frontend-design` | Building any UI component — read SKILL.md first |
| `web-artifacts-builder` | Complex multi-component React artifacts |
| `docx` | Generating Word documents |
| `xlsx` | Generating spreadsheets |

### From ~/Development/claude-skills/agent-skills/skills/
| Skill | Use When |
|-------|----------|
| `react-best-practices` | Writing any React component |
| `web-design-guidelines` | Styling and layout decisions |
| `deploy-to-vercel` | Reference for deployment patterns (adapt for Cloudflare) |
| `react-view-transitions` | Page transitions and animations |

### From ~/Development/claude-skills/bencium-marketplace/
| Skill | Use When |
|-------|----------|
| `bencium-innovative-ux-designer` | Designing new UI patterns |
| `bencium-controlled-ux-designer` | Refining existing UI components |
| `design-audit` | Reviewing UI for consistency |

### From ~/Development/claude-skills/ui-ux-pro-max-skill/
- Full UI/UX skill — use for any significant design work on the Bestiary UI

## MCP Servers

The following MCP tools are available in Claude Code (from settings.local.json):
- `mcp__scheduled-tasks__*` — scheduled task management
- `mcp__Claude_in_Chrome__*` — browser automation for testing

**Recommended additional MCPs to configure for this project:**
- **GitHub MCP** — for creating issues, PRs, and managing the repo directly from Claude Code
- **Cloudflare MCP** — already connected in claude.ai; configure in Claude Code for deployment management

To add an MCP to Claude Code, run:
```bash
claude mcp add <name> <command>
```

## Key Data Sources

Game data is extracted from the [ffxiv-datamining](https://github.com/xivapi/ffxiv-datamining) repo (Windows PC at `H:\ffxiv-datamining`).

### Critical XBM Tables (Beastmaster-specific)
| File | Contents |
|------|----------|
| `XBMPet.csv` | 50 beast slots (rows 1–50); names populate post-7.56 |
| `XBMBattleDetail.csv` | Beast ability mappings; 46 groups covering all beasts |
| `XBMBattleDetailAction.csv` | 180 ability IDs cross-referencing Action.csv |
| `XBMElement.csv` | Beast element/classification types (10 entries) |
| `XBMContent.csv` | Crucible of the Unbroken stages (6 stages) |
| `XBMPetParamGrow.csv` | Beast stat growth data |

### Cross-reference Tables
| File | Purpose |
|------|---------|
| `BNpcName.csv` | Monster names by ID |
| `Action.csv` | Ability names (BST range: ~46866–50943) |
| `ActionTransient.csv` | Ability descriptions |
| `Level.csv` | Spawn coordinates (X/Y + TerritoryType ID) |
| `TerritoryType.csv` | Zone ID → zone name |
| `Map.csv` | Map scale factors for coordinate conversion |

### Coordinate Conversion
```ts
mapX = ((rawX + offsetX) * sizeFactor / 100) + 1
mapY = ((rawY + offsetY) * sizeFactor / 100) + 1
// sizeFactor, offsetX, offsetY come from Map.csv
```

## Beast Data Status

- **XBM table structure:** confirmed present in repo
- **Names/strings:** empty until community extracts post-7.56 (September 8, 2026)
- **Known confirmed beasts:** Coeurl (#33), Goobbue, Behemoth, Chimera
- **Total beasts:** 50

## UI Reference

The Master's Bestiary UI (screenshot in project knowledge) has:
- **Left panel:** 5×5 beast grid, filter/sort controls, "Beasts Captured X/50"
- **Right panel:** Beast name/number, S/M/L size selector, Classification, Auto-attack element, Trick ability card, Tempered Release ability card, Natural Habitat + lore text

## Deployment

```bash
bun run pages:build      # Build for Cloudflare
bun run preview          # Local Cloudflare preview via Wrangler
bun run deploy           # Deploy to Cloudflare Workers
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in GitHub secrets for CI/CD.

## Feature Branch → Issue Mapping

| Branch | Issue | Milestone | Notes |
|--------|-------|-----------|-------|
| `feature/1-project-foundation` | #1 | v0.1.0 | ✅ Done |
| `feature/2-beast-data-pipeline` | #2 | v0.2.0 | Blocked until Sept 8, 2026 |
| `feature/3-bestiary-ui` | #3 | v0.3.0 | In progress |
| `feature/8-database` | #13 | v0.2.5 | ⚠️ Must complete before feature/4, 9, 10, 11 |
| `feature/4-beast-tracker` | #4 | v0.3.0 | Requires feature/8-database |
| `feature/5-map-locations` | #5 | v0.4.0 | |
| `feature/6-ability-viewer` | #6 | v0.4.0 | |
| `feature/7-cloudflare-deployment` | #7 | v1.0.0 | |
| `feature/9-guides` | #14 | v0.5.0 | Requires feature/8-database |
| `feature/10-gear` | #15 | v0.5.0 | Requires feature/8-database |
| `feature/11-videos` | #16 | v0.5.0 | Requires feature/8-database |

## Database

**Stack:** Cloudflare D1 (SQLite, edge-native) + Drizzle ORM

D1 chosen over Neon/Postgres because app deploys to Cloudflare Workers — no external DB dependency, zero cold-start latency. Same Drizzle ORM patterns as health-journal, only adapter differs (`drizzle-orm/d1`).

Schema lives in `src/db/schema.ts`. After any schema change:
```bash
bun run db:push    # applies to D1
bun run db:studio  # Drizzle Studio UI
```

Tables:
- `beast_captures` — user's captured beast IDs (beast_number, captured_at)
- `user_settings` — key/value store for preferences
