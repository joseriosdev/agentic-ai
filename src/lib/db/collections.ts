import { prisma } from "@/lib/prisma";
import { isItemTypeName, type ItemTypeName } from "@/lib/constants/item-types";
import type { DashboardCollection, DashboardStats } from "@/types/dashboard";

// No auth yet: dashboard data belongs to the seeded demo user.
const DEMO_USER_EMAIL = "demo@devstash.io";
const RECENT_COLLECTIONS_LIMIT = 6;

type CollectionStats = Pick<
  DashboardStats,
  "totalCollections" | "favoriteCollections"
>;

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
