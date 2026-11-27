"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { signOutUser } from "@/actions/auth";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SidebarUser as SidebarUserData } from "@/types/dashboard";

interface SidebarUserProps {
  user: SidebarUserData;
  collapsed?: boolean;
}

interface UserMenuProps {
  user: SidebarUserData;
  children: React.ReactNode;
}

function UserMenu({ user, children }: UserMenuProps) {
  const [signingOut, startSignOut] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={signingOut}
          onSelect={() => startSignOut(() => signOutUser())}
        >
          <LogOut />
          {signingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SidebarUser({
  user,
  collapsed = false,
}: SidebarUserProps) {
  if (collapsed) {
    // No room for the name block, so the avatar opens the menu (which links to the profile).
    return (
      <div className="flex justify-center border-t border-sidebar-border p-3">
        <UserMenu user={user}>
          <button
            type="button"
            title={user.name}
            aria-label="Open user menu"
            className="rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <UserAvatar name={user.name} image={user.image} />
          </button>
        </UserMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 border-t border-sidebar-border p-3">
      <Link
        href="/profile"
        aria-label="Profile"
        className="shrink-0 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <UserAvatar name={user.name} image={user.image} />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
      <UserMenu user={user}>
        <Button variant="ghost" size="icon" aria-label="Open user menu">
          <ChevronsUpDown />
        </Button>
      </UserMenu>
    </div>
  );
}
