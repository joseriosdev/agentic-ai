import {
  mockCollections,
  mockItemTypeCounts,
  mockItemTypes,
  mockUser,
} from "@/lib/mock-data";
import type { ItemTypeName } from "@/lib/constants/item-types";
import type { SidebarCollection, SidebarData } from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 5;

type MockCollection = (typeof mockCollections)[number];

function toSidebarCollection(collection: MockCollection): SidebarCollection {
  return {
    id: collection.id,
    name: collection.name,
    href: `/collections/${collection.id}`,
    itemCount: collection.itemCount,
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getSidebarData(): SidebarData {
  const types = mockItemTypes.map((type) => {
    const name = type.name as ItemTypeName;
    return {
      name,
      label: `${capitalize(name)}s`,
      href: `/items/${name}s`,
      count: mockItemTypeCounts[name],
    };
  });

  const favoriteCollections = mockCollections
    .filter((collection) => collection.isFavorite)
    .map(toSidebarCollection);

  const recentCollections = mockCollections
    .filter((collection) => !collection.isFavorite)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, RECENT_COLLECTIONS_LIMIT)
    .map(toSidebarCollection);

  return {
    types,
    favoriteCollections,
    recentCollections,
    user: { name: mockUser.name, email: mockUser.email },
  };
}
