# Current Feature

Stats & Sidebar

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Display main area stats from database data (no `src/lib/mock-data.ts`), keeping the current design/layout
- Display system item types in the sidebar with their icons and item counts, linking to `/items/[typename]`
- Display real collection data from the database in the sidebar
- Add a "View all collections" link under the sidebar collections list that goes to `/collections`
- Keep star icons for favorite collections; recent collections show a colored circle based on the most-used item type in that collection
- Add the database functions to `src/lib/db/items.ts` (use `src/lib/db/collections.ts` for reference)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/stats-sidebar-spec.md
- Reference: @src/lib/db/collections.ts

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
