import { connection } from "next/server";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";
import { getSidebarUser } from "@/lib/db/users";
import type { SidebarData } from "@/types/dashboard";

export async function getSidebarData(): Promise<SidebarData> {
  // Per-user data: render at request time.
  await connection();
  const [types, collections, user] = await Promise.all([
    getSidebarItemTypes(),
    getSidebarCollections(),
    getSidebarUser(),
  ]);
  return { types, ...collections, user };
}
