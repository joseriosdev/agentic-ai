import { auth } from "@/auth";
import type { SidebarUser } from "@/types/dashboard";

export async function getSidebarUser(): Promise<SidebarUser> {
  const session = await auth();
  if (!session?.user?.email) {
    // The proxy guards /dashboard, so this only happens if that check is bypassed.
    throw new Error("Not authenticated");
  }
  const { name, email, image } = session.user;
  return { name: name || email, email, image: image ?? null };
}
