import { prisma } from "@/lib/prisma";
import { DEMO_USER_EMAIL } from "@/lib/db/collections";
import type { SidebarUser } from "@/types/dashboard";

export async function getSidebarUser(): Promise<SidebarUser> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { name: true, email: true },
  });
  const email = user?.email ?? DEMO_USER_EMAIL;
  return { name: user?.name ?? email, email };
}
