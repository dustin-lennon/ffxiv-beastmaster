# FFXIV Beastmaster Bestiary

Track your captured beasts for the **Beastmaster** limited job in Final Fantasy XIV (Patch 7.56).

Faithfully recreates the in-game Master's Bestiary UI with beast tracking, map locations, and ability details.

## Development

```bash
bun install       # Install dependencies
bun run dev       # Start local dev server
bun run lint      # Run ESLint
```

## Deployment

```bash
bun run pages:build   # Build for Cloudflare Workers
bun run preview       # Preview locally via Wrangler
bun run deploy        # Deploy to Cloudflare Workers
```

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Cloudflare Workers via `@cloudflare/next-on-pages`

## Data

Beast data is sourced from the [ffxiv-datamining](https://github.com/xivapi/ffxiv-datamining) repository and populated post-Patch 7.56 (September 8, 2026).

## Contributing

This project uses [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/) and [Conventional Commits](https://www.conventionalcommits.org). See `.github/ISSUES.md` for the full feature roadmap.
