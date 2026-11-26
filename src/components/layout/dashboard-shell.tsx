"use client";

import { Suspense, useState } from "react";
import Sidebar, { SidebarSkeleton } from "@/components/layout/sidebar/sidebar";
import TopBar from "@/components/layout/top-bar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SidebarData } from "@/types/dashboard";

const DESKTOP_QUERY = "(min-width: 1024px)";

interface DashboardShellProps {
  sidebarData: Promise<SidebarData>;
  children: React.ReactNode;
}

export default function DashboardShell({
  sidebarData,
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setCollapsed((value) => !value);
    } else {
      setMobileOpen((value) => !value);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border transition-[width] duration-200 ease-in-out lg:block",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <Suspense fallback={<SidebarSkeleton collapsed={collapsed} />}>
          <Sidebar data={sidebarData} collapsed={collapsed} />
        </Suspense>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0 sm:max-w-72">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Item types and collections
          </SheetDescription>
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar
              data={sidebarData}
              onNavigate={() => setMobileOpen(false)}
            />
          </Suspense>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
