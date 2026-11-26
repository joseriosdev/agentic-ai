# Current Feature: Auth Setup - NextAuth + GitHub Provider

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Install NextAuth v5 (`next-auth@beta`) and `@auth/prisma-adapter`
- Set up the split auth config pattern for edge compatibility
- Add the GitHub OAuth provider
- Protect `/dashboard/*` routes with the Next.js 16 proxy
- Redirect unauthenticated users to sign-in
- Files to create:
  - `src/auth.config.ts` - edge-compatible config (providers only, no adapter)
  - `src/auth.ts` - full config with Prisma adapter and JWT strategy
  - `src/app/api/auth/[...nextauth]/route.ts` - export handlers from `auth.ts`
  - `src/proxy.ts` - route protection with redirect logic
  - `src/types/next-auth.d.ts` - extend `Session` type with `user.id`

## Notes

<!-- Any extra notes -->

- Spec: `context/features/auth-spec-files/auth-phase-1-spec.md`
- Use Context7 to verify the newest NextAuth v5 config and conventions
- Use `next-auth@beta` (not `@latest`, which installs v4)
- Proxy file must be at `src/proxy.ts` (same level as `app/`)
- Use a named export: `export const proxy = auth(...)`, not a default export
- Use `session: { strategy: 'jwt' }` with the split config pattern
- Don't set a custom `pages.signIn` - use NextAuth's default page
- Env vars: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
- Testing:
  1. Go to `/dashboard` - should redirect to sign-in
  2. Click "Sign in with GitHub"
  3. Verify redirect back to `/dashboard` after auth
- References:
  - Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
  - Prisma adapter: https://authjs.dev/getting-started/adapters/prisma

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
