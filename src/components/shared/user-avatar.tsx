import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  className?: string;
}

export function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return initials || "?";
}

// Shows the user's image (e.g. from GitHub) or falls back to their initials.
export default function UserAvatar({ name, image, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("size-8", className)}>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback className="bg-muted text-xs font-medium">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
