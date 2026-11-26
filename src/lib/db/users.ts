import { getCurrentUser } from "@/lib/current-user";
import type { SidebarUser } from "@/types/dashboard";

export async function getSidebarUser(): Promise<SidebarUser> {
  const { name, email } = await getCurrentUser();
  return { name: name ?? email, email };
}
