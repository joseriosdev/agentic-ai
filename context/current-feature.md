# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Not Started

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI phase 1 (shadcn setup, /dashboard layout, top bar, placeholders)
- Dashboard UI phase 2 (collapsible sidebar, type links, favorite/recent collections, mobile drawer)
- Dashboard UI phase 3 (main area, stats cards, recent collections, pinned items, recent items)
- Database setup (Neon PostgreSQL + Prisma 7, initial migration, system item types seed)
- Seed sample data (demo user, system item types, 5 collections with 18 items)
- Dashboard collections (real collection data from Neon via Prisma, type-derived card borders and icons, collection stats)
- Dashboard items (real pinned/recent items from Neon via Prisma, type-derived card icons/borders, item stats)
- Stats & sidebar (real item types, collections and user in sidebar from Neon via Prisma, most-used type dots for recent collections, "View all collections" link)
- Pro badge sidebar (subtle shadcn "PRO" badge on the Files and Images sidebar types)
- DB user scoping & collection query fixes (cached `getCurrentUserId()` helper in `src/lib/current-user.ts`, userId-scoped queries, `_count` item counts, DB-side recent-collections limit)
- Auth phase 1 (NextAuth v5 + GitHub OAuth, split edge-safe config with Prisma adapter and JWT sessions, `/dashboard/*` protected via `src/proxy.ts`, `session.user.id` type)
