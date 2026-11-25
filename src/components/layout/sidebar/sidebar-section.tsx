"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarSectionProps {
  title: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export default function SidebarSection({
  title,
  collapsed = false,
  children,
}: SidebarSectionProps) {
  if (collapsed) {
    return <div className="flex flex-col gap-1">{children}</div>;
  }

  return (
    <Collapsible defaultOpen className="group/section">
      <CollapsibleTrigger className="mb-1 flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
        {title}
        <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=closed]/section:-rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
