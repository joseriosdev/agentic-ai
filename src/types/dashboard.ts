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
  dominantType: ItemTypeName | null;
}

export interface SidebarUser {
  name: string;
  email: string;
}

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export interface DashboardCollection {
  id: string;
  name: string;
  description: string;
  href: string;
  itemCount: number;
  isFavorite: boolean;
  typeNames: ItemTypeName[];
  dominantType: ItemTypeName | null;
}

export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  typeName: ItemTypeName;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
}

export interface SidebarData {
  types: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  user: SidebarUser;
}
