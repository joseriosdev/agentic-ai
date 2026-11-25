# Current Feature

Database Setup: Neon PostgreSQL + Prisma 7

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Set up Prisma 7 ORM with Neon PostgreSQL (serverless)
- Create initial schema based on the data models in `context/project-overview.md` (User, Item, ItemType, Collection, ItemCollection, Tag)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Create the initial migration with `prisma migrate dev` (never `db push`)
- Seed system item types (snippet, prompt, command, note, file, image, link)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/database-spec.md
- Use Prisma 7 — it has breaking changes. Review the upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup guide: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` points to the Neon development branch; a separate production branch exists. Always create migrations, never push directly unless specified.
- The schema in `project-overview.md` is a starting point and will evolve.

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Dashboard UI phase 1 (shadcn setup, /dashboard layout, top bar, placeholders)
- Dashboard UI phase 2 (collapsible sidebar, type links, favorite/recent collections, mobile drawer)
- Dashboard UI phase 3 (main area, stats cards, recent collections, pinned items, recent items)
- Database setup (Neon PostgreSQL + Prisma 7, initial migration, system item types seed)
