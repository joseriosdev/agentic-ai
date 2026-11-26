# Current Feature: Auth Credentials - Email/Password Provider

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Add a Credentials provider for email/password sign-in
- Hash passwords with `bcryptjs` (already installed)
- Ensure the User model has a `password` field (already present as `password String?`, so no migration needed)
- `auth.config.ts`: add a Credentials provider placeholder (`authorize: () => null`)
- `auth.ts`: override the Credentials provider with real bcrypt validation
- Create a registration API route `POST /api/auth/register`:
  - Accept `name`, `email`, `password`, `confirmPassword`
  - Validate that the passwords match
  - Reject if the user already exists
  - Hash the password with bcryptjs and create the user
  - Return a success/error response

## Notes

<!-- Any extra notes -->

- Spec: `context/features/auth-spec-files/auth-phase-2-spec.md`
- Split pattern: the placeholder in `auth.config.ts` keeps the proxy edge-safe; the DB/bcrypt logic lives only in `auth.ts`
- Coding standards say to validate inputs with Zod, which is not installed yet
- Testing:
  1. Register via curl:
     ```bash
     curl -X POST http://localhost:3000/api/auth/register \
       -H "Content-Type: application/json" \
       -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123"}'
     ```
  2. Go to `/api/auth/signin`
  3. Sign in with email/password
  4. Verify redirect to `/dashboard`
  5. Verify GitHub OAuth still works
- Reference: https://authjs.dev/getting-started/authentication/credentials

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
