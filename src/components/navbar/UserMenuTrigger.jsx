import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * UserMenuTrigger — the always-visible collapsed state of the user menu.
 *
 * Composed of:
 *  - Circular avatar (image if available, else muted initial fallback)
 *  - Premium ring: a thin accent-token ring around the avatar when user.role implies premium
 *  - User's first name on desktop (hidden below md)
 *  - Chevron-down icon (muted-foreground)
 *
 * Intentionally NOT styled as a button with border/fill — reads as a quiet
 * identity marker consistent with the editorial navbar chrome.
 */
const UserMenuTrigger = ({ user, open, onClick }) => {
  const firstName = user?.name?.split(" ")[0] ?? "";
  const initial = user?.name?.[0]?.toUpperCase() ?? "?";
  const isPremium = user?.plan === "premium";

  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        // No fill, no border — quiet identity marker
        "flex items-center gap-2 rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "transition-opacity duration-200 hover:opacity-80",
      )}
    >
      {/* Avatar */}
      <span
        className={cn(
          "relative flex shrink-0 size-8 rounded-full",
          // Premium: subtle accent-token ring (2px ring, 1px offset — quiet, not a badge)
          isPremium &&
            "ring-2 ring-accent ring-offset-1 ring-offset-background",
        )}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User avatar"}
            fill
            sizes="32px"
            className="rounded-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-[11px] font-medium uppercase tracking-[0.08em] select-none">
            {initial}
          </span>
        )}
      </span>

      {/* First name — desktop only */}
      <span className="hidden md:block text-[15px] text-foreground font-normal leading-none select-none">
        {firstName}
      </span>

      {/* Chevron */}
      <ChevronDown
        className={cn(
          "size-3.5 text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  );
};

export default UserMenuTrigger;
