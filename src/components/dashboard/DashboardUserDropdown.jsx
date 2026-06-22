"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bookmark, ShoppingBag, Crown, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const MENU_ITEMS = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/favorites", label: "Favorites", icon: Bookmark },
  {
    href: "/dashboard/purchased",
    label: "Purchased Recipes",
    icon: ShoppingBag,
  },
  { href: "/premium", label: "Premium", icon: Crown },
];

const MenuItem = ({ href, label, icon: Icon, onClick, iconClassName }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 rounded-md",
        "text-[13px] font-sans text-foreground",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon
        className={cn("size-3.5 text-muted-foreground shrink-0", iconClassName)}
        aria-hidden
      />
      {label}
    </Link>
  </li>
);

const DashboardUserDropdown = ({ user, onClose }) => {
  const router = useRouter();
  const isPremium = user?.plan === "premium";

  const initial = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const handleSignOut = async () => {
    onClose?.();
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div
      role="menu"
      aria-label="User menu"
      className={cn(
        "bg-popover text-popover-foreground",
        "border border-border rounded-lg",
        "shadow-[0_4px_24px_-4px_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        "w-56 py-1.5",
      )}
    >
      {/* ── Identity header ── */}
      <div className="px-3 pt-2 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar — 36px in dropdown header */}
          <span className="relative flex shrink-0 size-9 rounded-full overflow-hidden bg-muted">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "avatar"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em] select-none">
                {initial}
              </span>
            )}
          </span>

          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-sans font-medium text-foreground leading-snug truncate">
              {user?.name}
            </span>
            {/* Plan badge inline under name */}
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.08em] font-medium font-sans leading-snug",
                isPremium ? "text-accent" : "text-muted-foreground",
              )}
            >
              {isPremium ? "Premium Member" : "Free Plan"}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border mb-1" />

      {/* ── Nav items ── */}
      <nav aria-label="Dashboard user navigation">
        <ul className="px-1.5">
          {MENU_ITEMS.map((item) => {
            // Hide Premium link for existing premium members — they don't need the upsell
            if (item.href === "/premium" && isPremium) return null;
            return (
              <MenuItem
                key={item.href}
                {...item}
                onClick={onClose}
                // Accent tint on Premium link only — its one job in the system
                iconClassName={
                  item.href === "/premium" ? "text-accent" : undefined
                }
              />
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border my-1" />

      {/* ── Back to site + sign out ── */}
      <div className="px-1.5 pb-1">
        <Link
          href="/"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md",
            "text-[13px] font-sans text-muted-foreground",
            "transition-colors duration-150 hover:bg-muted hover:text-foreground",
          )}
        >
          <Home className="size-3.5 shrink-0" aria-hidden />
          Back to site
        </Link>

        <button
          type="button"
          role="menuitem"
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md",
            "text-[13px] font-sans text-destructive",
            "transition-colors duration-150 hover:bg-destructive/8",
          )}
        >
          <LogOut className="size-3.5 shrink-0 text-destructive" aria-hidden />
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardUserDropdown;
