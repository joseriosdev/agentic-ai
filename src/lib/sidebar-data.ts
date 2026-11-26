import { connection } from "next/server";
import { getCurrentUserId } from "@/lib/current-user";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";
import { getSidebarUser } from "@/lib/db/users";
import type { SidebarData } from "@/types/dashboard";

export async function getSidebarData(): Promise<SidebarData> {
  // Per-user data: render at request time.
  await connection();
  const userId = await getCurrentUserId();
  const [types, collections, user] = await Promise.all([
    getSidebarItemTypes(userId),
    getSidebarCollections(userId),
    getSidebarUser(),
  ]);
  return { types, ...collections, user };
}
