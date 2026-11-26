import { connection } from "next/server";
import { Pin } from "lucide-react";
import ItemRow from "@/components/dashboard/item-row";
import SectionHeader from "@/components/dashboard/section-header";
import { getCurrentUserId } from "@/lib/current-user";
import { getPinnedItems } from "@/lib/db/items";

export default async function PinnedItems() {
  // Per-user data: render at request time.
  await connection();
  const items = await getPinnedItems(await getCurrentUserId());

  if (items.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Pinned" icon={Pin} />
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
