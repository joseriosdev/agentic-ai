import { Folder, FolderHeart, Layers, Star, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatCard[] = [
    { label: "Items", value: stats.totalItems, icon: Layers, iconClassName: "text-snippet" },
    { label: "Collections", value: stats.totalCollections, icon: Folder, iconClassName: "text-prompt" },
    { label: "Favorite Items", value: stats.favoriteItems, icon: Star, iconClassName: "text-yellow-400" },
    { label: "Favorite Collections", value: stats.favoriteCollections, icon: FolderHeart, iconClassName: "text-image" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, iconClassName }) => (
        <Card key={label} className="gap-2 px-5 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="truncate">{label}</span>
            <Icon className={cn("size-4 shrink-0", iconClassName)} />
          </div>
          <p className="text-2xl font-semibold">{value}</p>
        </Card>
      ))}
    </div>
  );
}
