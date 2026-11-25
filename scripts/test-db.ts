import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const EXPECTED_SYSTEM_TYPES = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

async function checkConnection() {
  const [{ now }] = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
  console.log(`✓ Connected (server time: ${now.toISOString()})`);
}

async function printTableCounts() {
  const [users, items, itemTypes, collections, itemCollections, tags] =
    await Promise.all([
      prisma.user.count(),
      prisma.item.count(),
      prisma.itemType.count(),
      prisma.collection.count(),
      prisma.itemCollection.count(),
      prisma.tag.count(),
    ]);

  console.log("\nTable counts:");
  console.table({ users, items, itemTypes, collections, itemCollections, tags });
}

async function checkSystemTypes(): Promise<boolean> {
  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
    select: { name: true, icon: true, color: true },
    orderBy: { name: "asc" },
  });

  console.log("\nSystem item types:");
  console.table(systemTypes);

  const found = new Set(systemTypes.map((type) => type.name));
  const missing = EXPECTED_SYSTEM_TYPES.filter((name) => !found.has(name));

  if (missing.length > 0) {
    console.error(`✗ Missing system types: ${missing.join(", ")}`);
    return false;
  }

  console.log(`✓ All ${EXPECTED_SYSTEM_TYPES.length} system types present`);
  return true;
}

async function main() {
  console.log("Testing database connection...\n");

  await checkConnection();
  await printTableCounts();
  const systemTypesOk = await checkSystemTypes();

  if (!systemTypesOk) {
    process.exitCode = 1;
    return;
  }

  console.log("\nDatabase test passed!");
}

main()
  .catch((error: unknown) => {
    console.error("✗ Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
