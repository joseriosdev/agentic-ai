import { Suspense } from "react";
import { Clock } from "lucide-react";
import DashboardStats, {
  DashboardStatsSkeleton,
} from "@/components/dashboard/dashboard-stats";
import PinnedItems from "@/components/dashboard/pinned-items";
import RecentCollections, {
  RecentCollectionsSkeleton,
} from "@/components/dashboard/recent-collections";
import RecentItems, {
  RecentItemsSkeleton,
} from "@/components/dashboard/recent-items";
import SectionHeader from "@/components/dashboard/section-header";

export default function DashboardPage() {
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

      {/* No fallback: the section is hidden entirely when nothing is pinned. */}
      <Suspense fallback={null}>
        <PinnedItems />
      </Suspense>

      <section>
        <SectionHeader title="Recent Items" icon={Clock} />
        <Suspense fallback={<RecentItemsSkeleton />}>
          <RecentItems />
        </Suspense>
      </section>
    </div>
  );
}
