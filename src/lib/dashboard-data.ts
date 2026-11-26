import { mockItemTypes, mockItems } from "@/lib/mock-data";
import type { ItemTypeName } from "@/lib/constants/item-types";
import type { DashboardItem, DashboardStats } from "@/types/dashboard";

const RECENT_ITEMS_LIMIT = 10;

type MockItem = (typeof mockItems)[number];

const TYPE_NAME_BY_ID = new Map(
  mockItemTypes.map((type) => [type.id, type.name as ItemTypeName]),
);

function toDashboardItem(item: MockItem): DashboardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    typeName: TYPE_NAME_BY_ID.get(item.itemTypeId) ?? "snippet",
    tags: item.tags,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt,
  };
}

function byNewest(a: { createdAt: Date }, b: { createdAt: Date }): number {
  return b.createdAt.getTime() - a.createdAt.getTime();
}

export function getItemStats(): Pick<
  DashboardStats,
  "totalItems" | "favoriteItems"
> {
  return {
    totalItems: mockItems.length,
    favoriteItems: mockItems.filter((item) => item.isFavorite).length,
  };
}

export function getPinnedItems(): DashboardItem[] {
  return mockItems
    .filter((item) => item.isPinned)
    .sort(byNewest)
    .map(toDashboardItem);
}

export function getRecentItems(): DashboardItem[] {
  return [...mockItems]
    .sort(byNewest)
    .slice(0, RECENT_ITEMS_LIMIT)
    .map(toDashboardItem);
}
