import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardCollection } from "@/types/dashboard";

interface CollectionCardProps {
  collection: DashboardCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={collection.href} className="group block">
      <Card className="h-full gap-1 px-5 py-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-md">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{collection.name}</h3>
          {collection.isFavorite && (
            <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {collection.itemCount} items
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {collection.description}
        </p>
      </Card>
    </Link>
  );
}
