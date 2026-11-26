# Current Feature

DB User Scoping & Collection Query Fixes

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Scope every data query by an explicit `userId` instead of a hard-coded demo email
- Add a single cached `getCurrentUserId()` helper (demo user now, session user once auth exists)
- Move `DEMO_USER_EMAIL` out of `src/lib/db/collections.ts`
- Stop loading every item row to compute collection item counts and dominant types
- Apply the sidebar's recent-collections limit in the database, not in JS

## Notes

<!-- Any extra notes -->

- From the code-scanner report (High priority findings 1 and 2)
- Item counts via Prisma `_count`; per-type counts via one grouped, parameterized query

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
