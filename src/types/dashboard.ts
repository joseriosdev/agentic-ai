import type { ItemTypeName } from "@/lib/constants/item-types";

export interface SidebarItemType {
  name: ItemTypeName;
  label: string;
  href: string;
  count: number;
}

export interface SidebarCollection {
  id: string;
  name: string;
  href: string;
  itemCount: number;
}

export interface SidebarUser {
  name: string;
  email: string;
}

export interface SidebarData {
  types: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  user: SidebarUser;
}
