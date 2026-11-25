import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  viewAllHref?: string;
}

export default function SectionHeader({
  title,
  icon: Icon,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        {Icon && <Icon className="size-4 text-muted-foreground" />}
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </Link>
      )}
    </div>
  );
}
