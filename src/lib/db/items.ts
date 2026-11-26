import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { isItemTypeName } from "@/lib/constants/item-types";
import { DEMO_USER_EMAIL } from "@/lib/db/collections";
import type { DashboardItem, DashboardStats } from "@/types/dashboard";

const RECENT_ITEMS_LIMIT = 10;

type ItemStats = Pick<DashboardStats, "totalItems" | "favoriteItems">;

const userItemsWhere = { user: { email: DEMO_USER_EMAIL } };

const dashboardItemSelect = {
  id: true,
  title: true,
  description: true,
  isFavorite: true,
  isPinned: true,
  createdAt: true,
  itemType: { select: { name: true } },
  tags: { select: { name: true }, orderBy: { name: "asc" } },
} satisfies Prisma.ItemSelect;

type DashboardItemRecord = Prisma.ItemGetPayload<{
  select: typeof dashboardItemSelect;
}>;

// Custom (non-system) types have no icon/color yet, so they are skipped.
function toDashboardItems(records: DashboardItemRecord[]): DashboardItem[] {
  return records.flatMap((record) => {
    const typeName = record.itemType.name;
    if (!isItemTypeName(typeName)) return [];
    return {
      id: record.id,
      title: record.title,
      description: record.description ?? "",
      typeName,
      tags: record.tags.map((tag) => tag.name),
      isFavorite: record.isFavorite,
      isPinned: record.isPinned,
      createdAt: record.createdAt,
    };
  });
}

export async function getPinnedItems(): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { ...userItemsWhere, isPinned: true },
    orderBy: { createdAt: "desc" },
    select: dashboardItemSelect,
  });
  return toDashboardItems(items);
}

export async function getRecentItems(
  limit = RECENT_ITEMS_LIMIT,
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: userItemsWhere,
    orderBy: { createdAt: "desc" },
    take: limit,
    select: dashboardItemSelect,
  });
  return toDashboardItems(items);
}

export async function getItemStats(): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count({ where: userItemsWhere }),
    prisma.item.count({ where: { ...userItemsWhere, isFavorite: true } }),
  ]);
  return { totalItems, favoriteItems };
}
