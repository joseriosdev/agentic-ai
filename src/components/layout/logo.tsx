import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  showName?: boolean;
  className?: string;
}

export default function Logo({ showName = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-prompt to-snippet text-white">
        <Layers className="size-4" />
      </div>
      {showName && <span className="text-lg font-semibold">DevStash</span>}
    </div>
  );
}
