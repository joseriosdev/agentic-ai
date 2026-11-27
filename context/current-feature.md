# Current Feature: Auth UI - Sign In, Register & Sign Out

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Replace the default NextAuth pages with custom UI
- Sign in page (`/sign-in`):
  - Email and password fields
  - "Sign in with GitHub" button
  - Link to the register page
  - Form validation and error display
- Register page (`/register`):
  - Name, email, password and confirm password fields
  - Validation (passwords match, email format)
  - Submit to `/api/auth/register`
  - Redirect to `/sign-in` on success
- Bottom of sidebar:
  - User avatar (GitHub image, or initials as a fallback)
  - User name
  - Dropdown/dropup on avatar click with a "Sign out" link
  - Clicking the icon goes to `/profile`
- Reusable avatar component that handles both cases (image or initials, e.g. "Brad Traversy" → "BT")

## Notes

<!-- Any extra notes -->

- Spec: `context/features/auth-spec-files/auth-phase-3-spec.md`
- Point NextAuth `pages.signIn` at `/sign-in` so protected routes redirect to the custom page
- Existing sidebar user block lives in `src/components/layout/sidebar/sidebar-user.tsx`
- shadcn `avatar` and `dropdown-menu` components are not installed yet (current ui: badge, button, card, collapsible, input, sheet, skeleton)
- `/profile` route does not exist yet; the avatar link will point to it
- Testing:
  1. Go to `/sign-in` and verify the custom page renders
  2. Sign in with GitHub and verify the flow works
  3. Sign in with email/password and verify the flow works
  4. Verify the avatar shows (GitHub image or initials)
  5. Click the avatar and verify the dropdown appears
  6. Click "Sign out" and verify logout and redirect
  7. Go to `/register`, create a new account, and verify redirect to `/sign-in`

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
- Auth phase 2 (Credentials provider with bcryptjs: placeholder in edge-safe `auth.config.ts`, real validation in `auth.ts`, `POST /api/auth/register` route)
