import { mockCollections, mockItemTypes, mockItems } from "@/lib/mock-data";
import type { ItemTypeName } from "@/lib/constants/item-types";
import type {
  DashboardCollection,
  DashboardItem,
  DashboardStats,
} from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 6;
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

export function getDashboardStats(): DashboardStats {
  return {
    totalItems: mockItems.length,
    totalCollections: mockCollections.length,
    favoriteItems: mockItems.filter((item) => item.isFavorite).length,
    favoriteCollections: mockCollections.filter((c) => c.isFavorite).length,
  };
}

export function getRecentCollections(): DashboardCollection[] {
  return [...mockCollections]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, RECENT_COLLECTIONS_LIMIT)
    .map((collection) => ({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      href: `/collections/${collection.id}`,
      itemCount: collection.itemCount,
      isFavorite: collection.isFavorite,
    }));
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
