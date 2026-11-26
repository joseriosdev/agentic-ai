# Current Feature

Dashboard Collections

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Replace the mock collection data in the dashboard main area with real data from the Neon database via Prisma
- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in the server component (no mock data from `src/lib/mock-data.ts`)
- Keep the current design: 6 recent collection cards
- Collection card border color derived from the most-used item type in that collection
- Show small icons of all item types present in each collection
- Update collection stats display to use real data
- Do not add the items underneath the collections yet (later feature)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/dashboard-collections-spec.md
- Design reference: @context/screenshots/dashboard-ui-main.png (layout and design already exist)

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI phase 1 (shadcn setup, /dashboard layout, top bar, placeholders)
- Dashboard UI phase 2 (collapsible sidebar, type links, favorite/recent collections, mobile drawer)
- Dashboard UI phase 3 (main area, stats cards, recent collections, pinned items, recent items)
- Database setup (Neon PostgreSQL + Prisma 7, initial migration, system item types seed)
- Seed sample data (demo user, system item types, 5 collections with 18 items)
