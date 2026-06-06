# Tamer's Compendium

The community hub for Final Fantasy XIV's **Beastmaster** limited job (Patch 7.56).

Bestiary tracker, guides, gear lists, video embeds, and beast spawn maps — all in one place.

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

- Next.js 16.2.7 (App Router) + TypeScript + Turbopack
- Tailwind CSS 4
- Cloudflare Workers via `@cloudflare/next-on-pages`
- Cloudflare D1 (SQLite) + Drizzle ORM

## Data

Beast data sourced from [ffxiv-datamining](https://github.com/xivapi/ffxiv-datamining). Populates post-Patch 7.56 (September 8, 2026).

## Contributing

Uses [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/) and [Conventional Commits](https://www.conventionalcommits.org).
