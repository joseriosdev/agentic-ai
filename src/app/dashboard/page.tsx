import { Clock, Pin } from "lucide-react";
import CollectionCard from "@/components/dashboard/collection-card";
import ItemRow from "@/components/dashboard/item-row";
import SectionHeader from "@/components/dashboard/section-header";
import StatsCards from "@/components/dashboard/stats-cards";
import {
  getDashboardStats,
  getPinnedItems,
  getRecentCollections,
  getRecentItems,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const collections = getRecentCollections();
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

      <StatsCards stats={stats} />

      <section>
        <SectionHeader title="Collections" viewAllHref="/collections" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
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
