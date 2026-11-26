# Current Feature

Dashboard Items

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Replace the mock item data in the dashboard main area (pinned and recent items) with real data from the Neon database via Prisma
- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server components (no mock data from `src/lib/mock-data.ts`)
- Item card icon/border derived from the item type
- Display item type tags and everything else currently shown on the item cards
- If there are no pinned items, don't display the pinned section at all
- Update item stats display to use real data

## Notes

<!-- Any extra notes -->

- Spec: @context/features/dashboard-items-spec.md
- Design reference: @context/screenshots/dashboard-ui-main.png (layout and design already exist)

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI phase 1 (shadcn setup, /dashboard layout, top bar, placeholders)
- Dashboard UI phase 2 (collapsible sidebar, type links, favorite/recent collections, mobile drawer)
- Dashboard UI phase 3 (main area, stats cards, recent collections, pinned items, recent items)
- Database setup (Neon PostgreSQL + Prisma 7, initial migration, system item types seed)
- Seed sample data (demo user, system item types, 5 collections with 18 items)
- Dashboard collections (real collection data from Neon via Prisma, type-derived card borders and icons, collection stats)
