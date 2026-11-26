import { connection } from "next/server";
import StatsCards from "@/components/dashboard/stats-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { getItemStats } from "@/lib/dashboard-data";
import { getCollectionStats } from "@/lib/db/collections";

const STAT_CARD_COUNT = 4;

export default async function DashboardStats() {
  // Per-user data: render at request time.
  await connection();
  const collectionStats = await getCollectionStats();

  return <StatsCards stats={{ ...getItemStats(), ...collectionStats }} />;
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: STAT_CARD_COUNT }, (_, i) => (
        <Skeleton key={i} className="h-[88px] rounded-xl" />
      ))}
    </div>
  );
}
