import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

// ============================================
// SEED DATA
// ============================================

const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

const BCRYPT_ROUNDS = 12;

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

type SystemTypeName = (typeof SYSTEM_ITEM_TYPES)[number]["name"];

interface SeedItem {
  title: string;
  type: SystemTypeName;
  description: string;
  content?: string;
  language?: string;
  url?: string;
}

interface SeedCollection {
  name: string;
  description: string;
  items: SeedItem[];
}

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        title: "useDebounce & useLocalStorage hooks",
        type: "snippet",
        language: "typescript",
        description: "Debounce a changing value and persist state to localStorage.",
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
      },
      {
        title: "Context provider with compound components",
        type: "snippet",
        language: "typescript",
        description: "Typed context provider powering a compound Tabs component.",
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs.* must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div>{children}</div> : null;
};`,
      },
      {
        title: "cn() class name utility",
        type: "snippet",
        language: "typescript",
        description: "Merge conditional Tailwind classes without conflicts.",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// cn("px-2 py-1", isActive && "bg-primary", "px-4") => "py-1 bg-primary px-4"`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        title: "Code review prompt",
        type: "prompt",
        description: "Thorough review focused on bugs, security and readability.",
        content: `You are a senior software engineer reviewing a pull request.

Review the code below and report:
1. Bugs and logic errors (with the exact line and a fix)
2. Security issues (input validation, auth checks, injection risks)
3. Performance problems (unnecessary work, N+1 queries, re-renders)
4. Readability and naming improvements

Rank findings by severity. Skip style nitpicks a linter would catch.

Code:
{{code}}`,
      },
      {
        title: "Documentation generator prompt",
        type: "prompt",
        description: "Generate clear docs for a function, module or API.",
        content: `Write documentation for the code below for developers who will use it, not maintain it.

Include:
- A one-sentence summary of what it does
- Parameters and return value, with types
- At least one realistic usage example
- Edge cases, errors thrown, and side effects

Use Markdown. Keep it concise; don't restate the code line by line.

Code:
{{code}}`,
      },
      {
        title: "Refactoring assistant prompt",
        type: "prompt",
        description: "Refactor code for clarity without changing behavior.",
        content: `Refactor the code below to improve readability and maintainability.

Constraints:
- Behavior must stay exactly the same
- Keep the public API (exports, function signatures) unchanged
- Prefer small, well-named functions over comments
- Remove dead code and duplication

Return the refactored code, then a short bullet list of what changed and why.

Code:
{{code}}`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Next.js multi-stage Dockerfile",
        type: "snippet",
        language: "dockerfile",
        description: "Small production image for a Next.js standalone build.",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy with migrations",
        type: "command",
        language: "bash",
        description: "Apply pending Prisma migrations, then build and start.",
        content: "npx prisma migrate deploy && npm run build && npm run start",
      },
      {
        title: "Docker documentation",
        type: "link",
        description: "Official Docker docs: guides, manuals and reference.",
        url: "https://docs.docker.com/",
      },
      {
        title: "GitHub Actions documentation",
        type: "link",
        description: "Workflows, syntax and examples for CI/CD.",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        title: "Undo last commit, keep changes",
        type: "command",
        language: "bash",
        description: "Move HEAD back one commit and keep the changes staged.",
        content: "git reset --soft HEAD~1",
      },
      {
        title: "Clean up Docker resources",
        type: "command",
        language: "bash",
        description: "Remove stopped containers, unused networks, images and build cache.",
        content: "docker system prune -a",
      },
      {
        title: "Kill process on a port",
        type: "command",
        language: "bash",
        description: "Find and kill whatever is listening on port 3000.",
        content: "lsof -ti :3000 | xargs kill -9",
      },
      {
        title: "Check outdated npm packages",
        type: "command",
        language: "bash",
        description: "List dependencies with newer versions available.",
        content: "npm outdated",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS documentation",
        type: "link",
        description: "Utility classes, theming and v4 configuration reference.",
        url: "https://tailwindcss.com/docs",
      },
      {
        title: "shadcn/ui",
        type: "link",
        description: "Accessible, copy-paste components built on Radix and Tailwind.",
        url: "https://ui.shadcn.com/",
      },
      {
        title: "Material Design 3",
        type: "link",
        description: "Google's open-source design system and guidelines.",
        url: "https://m3.material.io/",
      },
      {
        title: "Lucide icons",
        type: "link",
        description: "Open-source icon library used across DevStash.",
        url: "https://lucide.dev/icons/",
      },
    ],
  },
];

// ============================================
// SEED STEPS
// ============================================

async function seedSystemItemTypes(): Promise<Map<string, string>> {
  const typeIds = new Map<string, string>();

  // System types have userId = null, which a compound-unique upsert can't match,
  // so look them up by name instead.
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null, isSystem: true },
    });

    const saved = existing
      ? await prisma.itemType.update({
          where: { id: existing.id },
          data: { icon: type.icon, color: type.color },
        })
      : await prisma.itemType.create({ data: { ...type, isSystem: true } });

    typeIds.set(type.name, saved.id);
  }

  return typeIds;
}

async function seedDemoUser(): Promise<string> {
  const password = await bcrypt.hash(DEMO_USER.password, BCRYPT_ROUNDS);
  const data = {
    name: DEMO_USER.name,
    password,
    isPro: false,
    emailVerified: new Date(),
  };

  const user = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: data,
    create: { email: DEMO_USER.email, ...data },
  });

  return user.id;
}

// Removes only the demo user's items and collections so the seed can be re-run.
async function resetDemoContent(userId: string) {
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });
}

async function seedCollections(userId: string, typeIds: Map<string, string>) {
  for (const collection of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        userId,
        items: {
          create: collection.items.map((item) => ({
            item: {
              create: {
                title: item.title,
                description: item.description,
                contentType: item.type === "link" ? "URL" : "TEXT",
                content: item.content,
                language: item.language,
                url: item.url,
                user: { connect: { id: userId } },
                itemType: { connect: { id: typeIds.get(item.type) } },
              },
            },
          })),
        },
      },
    });

    console.log(`  ✓ ${collection.name} (${collection.items.length} items)`);
  }
}

async function main() {
  console.log("Seeding system item types...");
  const typeIds = await seedSystemItemTypes();

  console.log("Seeding demo user...");
  const userId = await seedDemoUser();

  console.log("Seeding collections and items...");
  await resetDemoContent(userId);
  await seedCollections(userId, typeIds);

  console.log("Seeding complete!");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
