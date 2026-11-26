import { connection } from "next/server";
import CollectionCard from "@/components/dashboard/collection-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentCollections } from "@/lib/db/collections";

const GRID_CLASSES = "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3";
const SKELETON_CARD_COUNT = 6;

export default async function RecentCollections() {
  // Per-user data: render at request time.
  await connection();
  const collections = await getRecentCollections();

  if (collections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No collections yet.</p>
    );
  }

  return (
    <div className={GRID_CLASSES}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export function RecentCollectionsSkeleton() {
  return (
    <div className={GRID_CLASSES}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  );
}
