# Current Feature

Pro Badge Sidebar

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Show a PRO badge next to the Files and Images types in the sidebar
- Use the shadcn/ui `Badge` component
- Keep the badge clean and subtle
- Badge text is all uppercase: "PRO"

## Notes

<!-- Any extra notes -->

- Spec: @context/features/add-pro-badge-sidebar.md
- File and Image are Pro-only types (see project overview)

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
