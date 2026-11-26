import { connection } from "next/server";
import ItemRow from "@/components/dashboard/item-row";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUserId } from "@/lib/current-user";
import { getRecentItems } from "@/lib/db/items";

const SKELETON_ROW_COUNT = 5;

export default async function RecentItems() {
  // Per-user data: render at request time.
  await connection();
  const items = await getRecentItems(await getCurrentUserId());

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No items yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export function RecentItemsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
  );
}
