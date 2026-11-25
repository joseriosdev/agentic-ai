import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarUser as SidebarUserData } from "@/types/dashboard";

interface SidebarUserProps {
  user: SidebarUserData;
  collapsed?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SidebarUser({
  user,
  collapsed = false,
}: SidebarUserProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-sidebar-border p-3",
        collapsed && "justify-center",
      )}
    >
      <div
        title={collapsed ? user.name : undefined}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
      >
        {getInitials(user.name)}
      </div>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings />
          </Button>
        </>
      )}
    </div>
  );
}
