import { cache } from "react";
import { prisma } from "@/lib/prisma";

// No auth yet: dashboard data belongs to the seeded demo user.
// Replace the lookup below with the session user once auth exists.
const DEMO_USER_EMAIL = "demo@devstash.io";

export interface CurrentUser {
  id: string;
  name: string | null;
  email: string;
}

// Cached per request, so every component shares one lookup.
export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true, name: true, email: true },
  });
  if (!user) {
    throw new Error(
      `Demo user ${DEMO_USER_EMAIL} not found. Run "npx prisma db seed".`,
    );
  }
  return user;
});

export async function getCurrentUserId(): Promise<string> {
  const user = await getCurrentUser();
  return user.id;
}
