import { prisma } from "@/lib/prisma";
import { isItemTypeName, type ItemTypeName } from "@/lib/constants/item-types";
import type {
  DashboardCollection,
  DashboardStats,
  SidebarCollection,
} from "@/types/dashboard";

// No auth yet: dashboard data belongs to the seeded demo user.
export const DEMO_USER_EMAIL = "demo@devstash.io";
const RECENT_COLLECTIONS_LIMIT = 6;
const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

type CollectionStats = Pick<
  DashboardStats,
  "totalCollections" | "favoriteCollections"
>;

interface SidebarCollections {
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
}

// Type names ordered by how many items use them (most-used first).
function rankTypesByUsage(typeNames: string[]): ItemTypeName[] {
  const counts = new Map<ItemTypeName, number>();
  for (const name of typeNames) {
    if (isItemTypeName(name)) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

export async function getRecentCollections(
  limit = RECENT_COLLECTIONS_LIMIT,
): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: DEMO_USER_EMAIL } },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      items: {
        select: { item: { select: { itemType: { select: { name: true } } } } },
      },
    },
  });

  return collections.map((collection) => {
    const typeNames = rankTypesByUsage(
      collection.items.map(({ item }) => item.itemType.name),
    );
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description ?? "",
      href: `/collections/${collection.id}`,
      itemCount: collection.items.length,
      isFavorite: collection.isFavorite,
      typeNames,
      dominantType: typeNames[0] ?? null,
    };
  });
}

export async function getCollectionStats(): Promise<CollectionStats> {
  const where = { user: { email: DEMO_USER_EMAIL } };
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where }),
    prisma.collection.count({ where: { ...where, isFavorite: true } }),
  ]);
  return { totalCollections, favoriteCollections };
}

// Favorites plus the most recently updated non-favorite collections.
export async function getSidebarCollections(
  recentLimit = SIDEBAR_RECENT_COLLECTIONS_LIMIT,
): Promise<SidebarCollections> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: DEMO_USER_EMAIL } },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      isFavorite: true,
      items: {
        select: { item: { select: { itemType: { select: { name: true } } } } },
      },
    },
  });

  const toSidebarCollection = (
    collection: (typeof collections)[number],
  ): SidebarCollection => ({
    id: collection.id,
    name: collection.name,
    href: `/collections/${collection.id}`,
    itemCount: collection.items.length,
    dominantType:
      rankTypesByUsage(
        collection.items.map(({ item }) => item.itemType.name),
      )[0] ?? null,
  });

  return {
    favoriteCollections: collections
      .filter((collection) => collection.isFavorite)
      .map(toSidebarCollection),
    recentCollections: collections
      .filter((collection) => !collection.isFavorite)
      .slice(0, recentLimit)
      .map(toSidebarCollection),
  };
}
