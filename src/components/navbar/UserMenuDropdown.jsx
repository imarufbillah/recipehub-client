import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Heart,
  ShoppingBag,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

/**
 * UserMenuDropdown — the popover panel anchored below-right of the trigger.
 *
 * Structure (top → bottom):
 *  1. Identity header (non-interactive): avatar, full name, email
 *  2. Navigation items: Dashboard, Profile, Favorites, Purchased Recipes
 *  3. Conditional admin row: "Admin Dashboard" (accent icon, only when role === "admin")
 *  4. Hairline divider
 *  5. Logout — destructive-token text + icon
 *
 * Elevation: card token background, hairline border, soft low-opacity shadow.
 * Hover: secondary-token background tint on rows, no primary fill — utility not CTA.
 */

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/dashboard/favorites",
    label: "Favorites",
    icon: Heart,
  },
  {
    href: "/dashboard/purchased",
    label: "Purchased Recipes",
    icon: ShoppingBag,
  },
];

const MenuItem = ({
  href,
  label,
  icon: Icon,
  onClick,
  className,
  iconClassName,
}) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-2.5 rounded-md",
        "text-[15px] text-foreground",
        "transition-colors duration-150",
        "hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      <Icon
        className={cn("size-4 text-muted-foreground shrink-0", iconClassName)}
      />
      {label}
    </Link>
  </li>
);

const UserMenuDropdown = ({ user, onClose }) => {
  const initial = user?.name?.[0]?.toUpperCase() ?? "?";
  const isAdmin = user?.role === "admin";
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    onClose?.();
  };

  return (
    <div
      className={cn(
        // Popover token surface
        "bg-popover text-popover-foreground",
        // Hairline border, radius-lg, soft shadow
        "border border-border rounded-lg",
        "shadow-[0_4px_24px_-4px_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
        // Width + positioning
        "w-64 py-2",
      )}
      role="menu"
      aria-label="User menu"
    >
      {/* ── 1. Identity header ── */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          {/* Larger avatar than trigger (40px) */}
          <span className="relative flex shrink-0 size-10 rounded-full">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User avatar"}
                fill
                sizes="40px"
                className="rounded-full object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-[13px] font-medium uppercase tracking-wider select-none">
                {initial}
              </span>
            )}
          </span>

          <div className="flex flex-col min-w-0">
            <span className="text-[15px] font-medium text-foreground leading-snug truncate">
              {user?.name}
            </span>
            <span className="text-[13px] text-muted-foreground leading-snug truncate">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Hairline divider below identity */}
      <div className="border-t border-border mx-0 mb-1" />

      {/* ── 2. Navigation items ── */}
      <nav aria-label="User navigation">
        <ul className="px-2">
          {menuItems.map((item) => (
            <MenuItem key={item.href} {...item} onClick={onClose} />
          ))}

          {/* ── 3. Conditional admin row ── */}
          {isAdmin && (
            <MenuItem
              href="/dashboard"
              label="Admin Dashboard"
              icon={ShieldCheck}
              onClick={onClose}
              // Accent-tinted icon only — not the whole row
              iconClassName="text-accent"
            />
          )}
        </ul>
      </nav>

      {/* Hairline divider before logout */}
      <div className="border-t border-border mx-0 mt-1 mb-1" />

      {/* ── 4. Logout ── */}
      <div className="px-2 pb-1">
        <button
          type="button"
          role="menuitem"
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2.5 rounded-md",
            "text-[15px] text-destructive",
            "transition-colors duration-150",
            "hover:bg-destructive/8 hover:text-destructive",
          )}
        >
          <LogOut className="size-4 shrink-0 text-destructive" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenuDropdown;
