import { FolderPlus, PanelLeft, Plus, Search } from "lucide-react";
import Logo from "@/components/layout/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <PanelLeft />
      </Button>

      <Logo showName={false} className="lg:hidden" />

      <div className="relative flex max-w-md flex-1 items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          className="w-full pl-9 pr-14"
        />
        <kbd className="pointer-events-none absolute right-3 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium sm:flex">
          ⌘ K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" aria-label="New Collection">
          <FolderPlus />
          <span className="hidden sm:inline">New Collection</span>
        </Button>
        <Button size="sm" aria-label="New Item">
          <Plus />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
