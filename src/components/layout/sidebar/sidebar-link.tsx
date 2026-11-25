"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  iconClassName?: string;
  trailing?: React.ReactNode;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  iconClassName,
  trailing,
  collapsed = false,
  onNavigate,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/90 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      <Icon className={cn("size-4 shrink-0", iconClassName)} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {trailing}
        </>
      )}
    </Link>
  );
}
