import { Suspense } from "react";
import { Clock, Pin } from "lucide-react";
import DashboardStats, {
  DashboardStatsSkeleton,
} from "@/components/dashboard/dashboard-stats";
import ItemRow from "@/components/dashboard/item-row";
import RecentCollections, {
  RecentCollectionsSkeleton,
} from "@/components/dashboard/recent-collections";
import SectionHeader from "@/components/dashboard/section-header";
import { getPinnedItems, getRecentItems } from "@/lib/dashboard-data";

export default function DashboardPage() {
  const pinnedItems = getPinnedItems();
  const recentItems = getRecentItems();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your developer knowledge hub
        </p>
      </header>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <section>
        <SectionHeader title="Collections" viewAllHref="/collections" />
        <Suspense fallback={<RecentCollectionsSkeleton />}>
          <RecentCollections />
        </Suspense>
      </section>

      {pinnedItems.length > 0 && (
        <section>
          <SectionHeader title="Pinned" icon={Pin} />
          <div className="flex flex-col gap-3">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader title="Recent Items" icon={Clock} />
        <div className="flex flex-col gap-3">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
