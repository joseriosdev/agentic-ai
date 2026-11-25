# Current Feature

Seed Sample Data

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Rewrite `prisma/seed.ts` to populate the database with sample data for development and demos
- Create a demo user (`demo@devstash.io`, "Demo User", password hashed with bcryptjs at 12 rounds, `isPro: false`, `emailVerified` set to now)
- Seed the 7 system item types (snippet, prompt, command, note, file, image, link)
- Seed 5 collections with items for the demo user:
  - **React Patterns** — 3 TypeScript snippets (custom hooks, component patterns, utility functions)
  - **AI Workflows** — 3 prompts (code review, documentation generation, refactoring assistance)
  - **DevOps** — 1 snippet (Docker/CI config), 1 command (deployment), 2 links (real docs URLs)
  - **Terminal Commands** — 4 commands (git, docker, process management, package managers)
  - **Design Resources** — 4 links (CSS/Tailwind, component libraries, design systems, icon libraries; real URLs)
- Seed must be safe to re-run (no duplicate data)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/seed-spec.md
- Schema: @prisma/schema.prisma
- Run with `npx prisma db seed`; verify with `npx tsx scripts/test-db.ts`
- Re-running the seed resets the demo user's collections and items; other users' data is untouched

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI phase 1 (shadcn setup, /dashboard layout, top bar, placeholders)
- Dashboard UI phase 2 (collapsible sidebar, type links, favorite/recent collections, mobile drawer)
- Dashboard UI phase 3 (main area, stats cards, recent collections, pinned items, recent items)
- Database setup (Neon PostgreSQL + Prisma 7, initial migration, system item types seed)
- Seed sample data (demo user, system item types, 5 collections with 18 items)
