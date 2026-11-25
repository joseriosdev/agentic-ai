import { Pin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ITEM_TYPE_ACCENT_CLASSES,
  ITEM_TYPE_BG_CLASSES,
  ITEM_TYPE_ICONS,
  ITEM_TYPE_TEXT_COLORS,
} from "@/lib/constants/item-types";
import { cn } from "@/lib/utils";
import type { DashboardItem } from "@/types/dashboard";

interface ItemRowProps {
  item: DashboardItem;
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function ItemRow({ item }: ItemRowProps) {
  const Icon = ITEM_TYPE_ICONS[item.typeName];

  return (
    <Card
      className={cn(
        "flex-row items-start gap-4 border-l-2 px-5 py-4 transition-colors duration-150 hover:bg-accent/40",
        ITEM_TYPE_ACCENT_CLASSES[item.typeName],
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-md",
          ITEM_TYPE_BG_CLASSES[item.typeName],
        )}
      >
        <Icon className={cn("size-5", ITEM_TYPE_TEXT_COLORS[item.typeName])} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{item.title}</h3>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {item.description}
        </p>
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <time
        dateTime={item.createdAt.toISOString()}
        className="shrink-0 text-xs text-muted-foreground"
      >
        {DATE_FORMAT.format(item.createdAt)}
      </time>
    </Card>
  );
}
