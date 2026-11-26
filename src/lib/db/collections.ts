import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { isItemTypeName, type ItemTypeName } from "@/lib/constants/item-types";
import type {
  DashboardCollection,
  DashboardStats,
  SidebarCollection,
} from "@/types/dashboard";

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

interface CollectionTypeCount {
  collectionId: string;
  typeName: string;
}

const sidebarCollectionSelect = {
  id: true,
  name: true,
  _count: { select: { items: true } },
} satisfies Prisma.CollectionSelect;

type SidebarCollectionRecord = Prisma.CollectionGetPayload<{
  select: typeof sidebarCollectionSelect;
}>;

// Per collection, its item type names ordered by usage (most-used first).
// Counting happens in the database, so item rows are never loaded.
async function getRankedTypesByCollection(
  collectionIds: string[],
): Promise<Map<string, ItemTypeName[]>> {
  const ranked = new Map<string, ItemTypeName[]>();
  if (collectionIds.length === 0) return ranked;

  const rows = await prisma.$queryRaw<CollectionTypeCount[]>`
    SELECT ic."collectionId", it."name" AS "typeName"
    FROM "item_collections" ic
    JOIN "items" i ON i."id" = ic."itemId"
    JOIN "item_types" it ON it."id" = i."itemTypeId"
    WHERE ic."collectionId" IN (${Prisma.join(collectionIds)})
    GROUP BY ic."collectionId", it."name"
    ORDER BY COUNT(*) DESC, it."name" ASC
  `;

  for (const { collectionId, typeName } of rows) {
    if (!isItemTypeName(typeName)) continue;
    const typeNames = ranked.get(collectionId) ?? [];
    typeNames.push(typeName);
    ranked.set(collectionId, typeNames);
  }
  return ranked;
}

export async function getRecentCollections(
  userId: string,
  limit = RECENT_COLLECTIONS_LIMIT,
): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      _count: { select: { items: true } },
    },
  });
  const rankedTypes = await getRankedTypesByCollection(
    collections.map((collection) => collection.id),
  );

  return collections.map((collection) => {
    const typeNames = rankedTypes.get(collection.id) ?? [];
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description ?? "",
      href: `/collections/${collection.id}`,
      itemCount: collection._count.items,
      isFavorite: collection.isFavorite,
      typeNames,
      dominantType: typeNames[0] ?? null,
    };
  });
}

export async function getCollectionStats(
  userId: string,
): Promise<CollectionStats> {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { totalCollections, favoriteCollections };
}

// Favorites plus the most recently updated non-favorite collections.
export async function getSidebarCollections(
  userId: string,
  recentLimit = SIDEBAR_RECENT_COLLECTIONS_LIMIT,
): Promise<SidebarCollections> {
  const [favorites, recents] = await Promise.all([
    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { updatedAt: "desc" },
      select: sidebarCollectionSelect,
    }),
    prisma.collection.findMany({
      where: { userId, isFavorite: false },
      orderBy: { updatedAt: "desc" },
      take: recentLimit,
      select: sidebarCollectionSelect,
    }),
  ]);
  const rankedTypes = await getRankedTypesByCollection(
    [...favorites, ...recents].map((collection) => collection.id),
  );

  const toSidebarCollection = (
    collection: SidebarCollectionRecord,
  ): SidebarCollection => ({
    id: collection.id,
    name: collection.name,
    href: `/collections/${collection.id}`,
    itemCount: collection._count.items,
    dominantType: rankedTypes.get(collection.id)?.[0] ?? null,
  });

  return {
    favoriteCollections: favorites.map(toSidebarCollection),
    recentCollections: recents.map(toSidebarCollection),
  };
}
