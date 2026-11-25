"use client";

import { Folder, Star } from "lucide-react";
import Logo from "@/components/layout/logo";
import SidebarLink from "@/components/layout/sidebar/sidebar-link";
import SidebarSection from "@/components/layout/sidebar/sidebar-section";
import SidebarUser from "@/components/layout/sidebar/sidebar-user";
import {
  ITEM_TYPE_ICONS,
  ITEM_TYPE_TEXT_COLORS,
} from "@/lib/constants/item-types";
import { cn } from "@/lib/utils";
import type { SidebarCollection, SidebarData } from "@/types/dashboard";

interface SidebarProps {
  data: SidebarData;
  collapsed?: boolean;
  onNavigate?: () => void;
}

interface CollectionGroupProps {
  label: string;
  collections: SidebarCollection[];
  favorite?: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}

function Count({ value }: { value: number }) {
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

function CollectionGroup({
  label,
  collections,
  favorite = false,
  collapsed,
  onNavigate,
}: CollectionGroupProps) {
  if (collections.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <p className="px-2 pt-2 text-[11px] font-medium tracking-wider text-muted-foreground/70 uppercase">
          {label}
        </p>
      )}
      {collections.map((collection) => (
        <SidebarLink
          key={collection.id}
          href={collection.href}
          label={collection.name}
          icon={Folder}
          iconClassName="text-muted-foreground"
          collapsed={collapsed}
          onNavigate={onNavigate}
          trailing={
            favorite ? (
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            ) : (
              <Count value={collection.itemCount} />
            )
          }
        />
      ))}
    </div>
  );
}

export default function Sidebar({
  data,
  collapsed = false,
  onNavigate,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div
        className={cn(
          "flex h-14 shrink-0 items-center px-4",
          collapsed && "justify-center px-0",
        )}
      >
        <Logo showName={!collapsed} />
      </div>

      <nav
        className={cn(
          "flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-4",
          collapsed && "px-2",
        )}
      >
        <SidebarSection title="Types" collapsed={collapsed}>
          {data.types.map((type) => (
            <SidebarLink
              key={type.name}
              href={type.href}
              label={type.label}
              icon={ITEM_TYPE_ICONS[type.name]}
              iconClassName={ITEM_TYPE_TEXT_COLORS[type.name]}
              collapsed={collapsed}
              onNavigate={onNavigate}
              trailing={<Count value={type.count} />}
            />
          ))}
        </SidebarSection>

        <div className="border-t border-sidebar-border" />

        <SidebarSection title="Collections" collapsed={collapsed}>
          <CollectionGroup
            label="Favorites"
            collections={data.favoriteCollections}
            favorite
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
          <CollectionGroup
            label="Recent"
            collections={data.recentCollections}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </SidebarSection>
      </nav>

      <SidebarUser user={data.user} collapsed={collapsed} />
    </div>
  );
}
