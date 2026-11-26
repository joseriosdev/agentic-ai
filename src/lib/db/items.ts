import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  ITEM_TYPE_ICONS,
  isItemTypeName,
} from "@/lib/constants/item-types";
import type {
  DashboardItem,
  DashboardStats,
  SidebarItemType,
} from "@/types/dashboard";

const RECENT_ITEMS_LIMIT = 10;
// Display order for system types in the sidebar.
const ITEM_TYPE_ORDER = Object.keys(ITEM_TYPE_ICONS);

type ItemStats = Pick<DashboardStats, "totalItems" | "favoriteItems">;

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

export async function getPinnedItems(
  userId: string,
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { createdAt: "desc" },
    select: dashboardItemSelect,
  });
  return toDashboardItems(items);
}

export async function getRecentItems(
  userId: string,
  limit = RECENT_ITEMS_LIMIT,
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: dashboardItemSelect,
  });
  return toDashboardItems(items);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { totalItems, favoriteItems };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// System item types with the number of items the user has of each type.
export async function getSidebarItemTypes(
  userId: string,
): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: {
      name: true,
      _count: { select: { items: { where: { userId } } } },
    },
  });

  return types
    .flatMap((type) => {
      const name = type.name;
      if (!isItemTypeName(name)) return [];
      return {
        name,
        label: `${capitalize(name)}s`,
        href: `/items/${name}s`,
        count: type._count.items,
      };
    })
    .sort(
      (a, b) => ITEM_TYPE_ORDER.indexOf(a.name) - ITEM_TYPE_ORDER.indexOf(b.name),
    );
}
