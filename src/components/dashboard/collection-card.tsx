import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  ITEM_TYPE_ACCENT_CLASSES,
  ITEM_TYPE_ICONS,
  ITEM_TYPE_TEXT_COLORS,
} from "@/lib/constants/item-types";
import { cn } from "@/lib/utils";
import type { DashboardCollection } from "@/types/dashboard";

interface CollectionCardProps {
  collection: DashboardCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { dominantType, typeNames } = collection;

  return (
    <Link href={collection.href} className="group block">
      <Card
        className={cn(
          "h-full gap-1 border-l-2 px-5 py-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-y-foreground/20 group-hover:border-r-foreground/20 group-hover:shadow-md",
          dominantType && ITEM_TYPE_ACCENT_CLASSES[dominantType],
        )}
      >
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{collection.name}</h3>
          {collection.isFavorite && (
            <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {collection.description}
        </p>
        {typeNames.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            {typeNames.map((typeName) => {
              const Icon = ITEM_TYPE_ICONS[typeName];
              return (
                <Icon
                  key={typeName}
                  aria-label={typeName}
                  className={cn("size-4", ITEM_TYPE_TEXT_COLORS[typeName])}
                />
              );
            })}
          </div>
        )}
      </Card>
    </Link>
  );
}
