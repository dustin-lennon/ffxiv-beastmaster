#!/bin/bash
# Run this once from the ffxiv-beastmaster repo root
# Configures GitHub repo settings for a solo developer using Gitflow + release-please

REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
echo "Configuring $REPO..."

# ── Repo general settings ────────────────────────────────────────────────────
gh api -X PATCH /repos/$REPO \
  --field has_issues=true \
  --field has_projects=true \
  --field has_wiki=false \
  --field allow_squash_merge=true \
  --field allow_merge_commit=false \
  --field allow_rebase_merge=false \
  --field squash_merge_commit_title="PR_TITLE" \
  --field squash_merge_commit_message="COMMIT_MESSAGES" \
  --field delete_branch_on_merge=true \
  --field allow_auto_merge=true
echo "✓ Repo general settings applied"

# ── Branch protection: main ───────────────────────────────────────────────────
gh api -X PUT /repos/$REPO/branches/main/protection \
  --input - << 'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint-and-typecheck"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "required_linear_history": true
}
EOF
echo "✓ main branch protection applied"

# ── Branch protection: develop ────────────────────────────────────────────────
gh api -X PUT /repos/$REPO/branches/develop/protection \
  --input - << 'EOF'
{
  "required_status_checks": {
    "strict": false,
    "contexts": ["lint-and-typecheck"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": false
}
EOF
echo "✓ develop branch protection applied"

# ── Labels ────────────────────────────────────────────────────────────────────
for label in "help wanted" "good first issue" "wontfix" "invalid" "question" "duplicate"; do
  gh label delete "$label" --yes 2>/dev/null || true
done

gh label create "enhancement"    --color "0075ca" --description "New feature or improvement"    2>/dev/null || gh label edit "enhancement"    --color "0075ca" --description "New feature or improvement"
gh label create "bug"            --color "d73a4a" --description "Something is broken"            2>/dev/null || gh label edit "bug"            --color "d73a4a" --description "Something is broken"
gh label create "infrastructure" --color "e4e669" --description "CI/CD, deployment, tooling"     2>/dev/null || gh label edit "infrastructure" --color "e4e669" --description "CI/CD, deployment, tooling"
gh label create "data-pipeline"  --color "d4edda" --description "CSV parsing and data scripts"   2>/dev/null || gh label edit "data-pipeline"  --color "d4edda" --description "CSV parsing and data scripts"
gh label create "ui"             --color "c5def5" --description "UI components and styling"      2>/dev/null || gh label edit "ui"             --color "c5def5" --description "UI components and styling"
gh label create "blocked"        --color "e99695" --description "Blocked on external dependency" 2>/dev/null || gh label edit "blocked"        --color "e99695" --description "Blocked on external dependency"
gh label create "documentation"  --color "0052cc" --description "Documentation updates"          2>/dev/null || gh label edit "documentation"  --color "0052cc" --description "Documentation updates"
gh label create "release-please" --color "ededed" --description "Managed by release-please"      2>/dev/null || gh label edit "release-please" --color "ededed" --description "Managed by release-please"
echo "✓ Labels created"

# ── Milestones ────────────────────────────────────────────────────────────────
create_milestone_if_missing() {
  local title=$1
  local desc=$2
  local exists
  exists=$(gh api /repos/$REPO/milestones --jq ".[] | select(.title == \"$title\") | .title" 2>/dev/null)
  if [ -z "$exists" ]; then
    gh api -X POST /repos/$REPO/milestones --input - << EOF
{"title":"$title","description":"$desc"}
EOF
    echo "  created milestone: $title"
  else
    echo "  skipped milestone (exists): $title"
  fi
}

create_milestone_if_missing "v0.1.0" "Project foundation"
create_milestone_if_missing "v0.2.0" "Beast data pipeline"
create_milestone_if_missing "v0.3.0" "Bestiary UI + tracker"
create_milestone_if_missing "v0.4.0" "Map locations + ability viewer"
create_milestone_if_missing "v1.0.0" "Production deployment"
echo "✓ Milestones done"

# ── Issues ────────────────────────────────────────────────────────────────────
create_issue_if_missing() {
  local title=$1
  shift
  local exists
  exists=$(gh issue list --search "\"$title\" in:title" --json title --jq ".[] | select(.title == \"$title\") | .title" 2>/dev/null)
  if [ -z "$exists" ]; then
    gh issue create --title "$title" "$@"
    echo "  created: $title"
  else
    echo "  skipped issue (exists): $title"
  fi
}

create_issue_if_missing "feat: project foundation — layout, types, theme" \
  --body "## Summary
Set up foundational project structure including routing, layout, shared components, and data type definitions.

## Branch
\`feature/1-project-foundation\`

## Acceptance Criteria
- [ ] App layout with header/nav matching FFXIV UI aesthetic
- [ ] TypeScript interfaces for Beast, Ability, Location, Element
- [ ] Tailwind theme configured with FFXIV color palette
- [ ] Placeholder pages for /bestiary, /beast/[id], /map
- [ ] README documented" \
  --label "enhancement" \
  --milestone "v0.1.0"
echo "✓ Issue #1 created"

create_issue_if_missing "feat: beast data pipeline — CSV to JSON" \
  --body "## Summary
Parse Beastmaster game data from ffxiv-datamining CSVs into structured JSON for the app.

## Branch
\`feature/2-beast-data-pipeline\`

## Acceptance Criteria
- [ ] Script to parse XBMPet.csv → beasts.json
- [ ] Script to parse XBMBattleDetail.csv → beast abilities
- [ ] Script to parse BNpcName.csv → beast names
- [ ] Script to cross-reference Level.csv + TerritoryType.csv → spawn locations
- [ ] Data stored in /public/data as static JSON

## Notes
Data strings are empty until patch 7.56 drops (September 8, 2026). Scripts should be built and tested against placeholder data first." \
  --label "enhancement,data-pipeline" \
  --milestone "v0.2.0"
echo "✓ Issue #2 created"

create_issue_if_missing "feat: Master's Bestiary UI component" \
  --body "## Summary
Recreate the in-game Master's Bestiary UI as a web component, faithful to the screenshot reference.

## Branch
\`feature/3-bestiary-ui\`

## Acceptance Criteria
- [ ] 5×5 beast grid with number labels
- [ ] Beast portrait or ? placeholder if uncaptured
- [ ] Beast detail panel (name, classification, element, size selector S/M/L)
- [ ] Trick ability card with description and targeting info
- [ ] Tempered Release ability card with description and targeting info
- [ ] Natural Habitat section with zone name and lore text
- [ ] Responsive layout

## Reference
See the UI screenshot — NO. 33 Coeurl example." \
  --label "enhancement,ui" \
  --milestone "v0.3.0"
echo "✓ Issue #3 created"

create_issue_if_missing "feat: beast tracker — caught/uncaught state" \
  --body "## Summary
Allow users to track which beasts they have captured.

## Branch
\`feature/4-beast-tracker\`

## Acceptance Criteria
- [ ] Toggle captured state per beast
- [ ] Progress counter (X/50) displayed
- [ ] Persistence via localStorage
- [ ] Filter: All / Captured / Uncaptured
- [ ] Visual distinction between captured and uncaptured slots" \
  --label "enhancement,ui" \
  --milestone "v0.3.0"
echo "✓ Issue #4 created"

create_issue_if_missing "feat: map locations — beast spawn pins on zone maps" \
  --body "## Summary
Display beast spawn locations on interactive FFXIV zone maps.

## Branch
\`feature/5-map-locations\`

## Acceptance Criteria
- [ ] Zone map images rendered correctly
- [ ] Beast spawn pins using converted coordinate data
- [ ] Click pin → shows beast detail
- [ ] Filter map by zone
- [ ] Captured beasts visually distinct on map

## Notes
Coordinate conversion: mapX = ((rawX + offsetX) * sizeFactor / 100) + 1" \
  --label "enhancement,ui" \
  --milestone "v0.4.0"
echo "✓ Issue #5 created"

create_issue_if_missing "feat: ability viewer — full ability details per beast" \
  --body "## Summary
Display full ability details for each beast including icons, descriptions, and targeting info.

## Branch
\`feature/6-ability-viewer\`

## Acceptance Criteria
- [ ] Ability icons from game assets (extracted via TexTools on Windows)
- [ ] Full descriptions from ActionTransient.csv
- [ ] Trick vs Tempered Release clearly distinguished
- [ ] Element and targeting type badges
- [ ] Searchable ability list across all beasts" \
  --label "enhancement,ui,data-pipeline" \
  --milestone "v0.4.0"
echo "✓ Issue #6 created"

create_issue_if_missing "feat: Cloudflare Workers production deployment" \
  --body "## Summary
Configure and verify full deployment pipeline to Cloudflare Workers via GitHub Actions.

## Branch
\`feature/7-cloudflare-deployment\`

## Acceptance Criteria
- [ ] wrangler.toml fully configured
- [ ] release-please CI/CD deploying on release tag
- [ ] CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID set in GitHub secrets
- [ ] Production deployment verified
- [ ] Custom domain configured" \
  --label "infrastructure" \
  --milestone "v1.0.0"
echo "✓ Issue #7 created"

echo ""
echo "✅ All GitHub settings configured for $REPO"
echo ""
echo "Next steps:"
echo "  gh secret set CLOUDFLARE_API_TOKEN"
echo "  gh secret set CLOUDFLARE_ACCOUNT_ID"
