"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  Bookmark,
  ShoppingBag,
  User,
  Users,
  ClipboardList,
  Flag,
  X,
  Globe,
  Utensils,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const USER_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/my-recipes", label: "My Recipes", icon: BookOpen },
  { href: "/dashboard/add-recipe", label: "Add Recipe", icon: PlusSquare },
  { href: "/dashboard/favorites", label: "Favorites", icon: Bookmark },
  { href: "/dashboard/purchased", label: "Purchased", icon: ShoppingBag },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const ADMIN_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/manage-users", label: "Manage Users", icon: Users },
  {
    href: "/dashboard/manage-recipes",
    label: "Manage Recipes",
    icon: ClipboardList,
  },
  { href: "/dashboard/reports", label: "Reports", icon: Flag },
];

const QUICK_LINKS = [
  { href: "/", label: "Home", icon: Globe },
  { href: "/recipes", label: "Browse Recipes", icon: Utensils },
  { href: "/premium", label: "Premium", icon: Crown },
];

// ─── Nav item ────────────────────────────────────────────────────────────────

const NavItem = ({ href, label, icon: Icon, isActive }) => (
  <Link
    href={href}
    className={cn(
      "relative flex items-center gap-3 px-4 py-2.5 rounded-md",
      "text-[13px] font-sans font-medium transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      isActive
        ? "text-primary bg-primary/5"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
    )}
    aria-current={isActive ? "page" : undefined}
  >
    {/* Primary left-border accent — only on active */}
    {isActive && (
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full"
        aria-hidden
      />
    )}
    <Icon
      className={cn(
        "size-4 shrink-0",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
      aria-hidden
    />
    <span>{label}</span>
  </Link>
);

// ─── Quick link item — lighter style, no active state ────────────────────────

const QuickLinkItem = ({ href, label, icon: Icon, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-md",
      "text-[12px] font-sans font-medium transition-colors duration-150",
      "text-muted-foreground hover:text-foreground hover:bg-muted/60",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    )}
  >
    <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
    <span>{label}</span>
  </Link>
);

// ─── Sidebar content (shared between desktop and mobile) ─────────────────────

const SidebarContent = ({ role, user, pathname, onLinkClick }) => {
  const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const isItemActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Logo / Wordmark ── */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Link
          href="/"
          onClick={onLinkClick}
          className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors duration-200"
        >
          RecipeHub
        </Link>
        {role === "admin" && (
          <p className="mt-0.5 text-[10px] uppercase tracking-widest font-medium text-muted-foreground font-sans">
            Admin Console
          </p>
        )}
      </div>

      {/* ── Nav list ── */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5"
        aria-label="Dashboard navigation"
      >
        {navItems.map((item) => (
          <div key={item.href} onClick={onLinkClick}>
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={isItemActive(item)}
            />
          </div>
        ))}
      </nav>

      {/* ── Quick links — public site shortcuts ── */}
      <div className="px-3 pb-3 border-t border-sidebar-border pt-3">
        <p className="px-4 pb-1.5 text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground/60 font-sans">
          Quick Links
        </p>
        <div className="flex flex-col gap-0.5">
          {QUICK_LINKS.map((link) => (
            <QuickLinkItem key={link.href} {...link} onClick={onLinkClick} />
          ))}
        </div>
      </div>

      {/* ── User identity block ── */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "avatar"}
                width={32}
                height={32}
                className="size-full object-cover"
              />
            ) : (
              <span className="text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em]">
                {initials}
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-sans font-medium text-foreground truncate leading-tight">
              {user?.name ?? "User"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans leading-tight">
              {role === "admin"
                ? "Administrator"
                : user?.plan === "premium"
                  ? "Premium"
                  : "Member"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sidebar shell ────────────────────────────────────────────────────────────

const DashboardSidebar = ({ role = "user", user, isOpen, onClose }) => {
  const pathname = usePathname();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop: persistent fixed sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 fixed top-0 left-0 bottom-0 z-30 bg-sidebar border-r border-sidebar-border"
        aria-label="Sidebar"
      >
        <SidebarContent
          role={role}
          user={user}
          pathname={pathname}
          onLinkClick={undefined}
        />
      </aside>

      {/* ── Mobile: slide-in overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                backgroundColor: "oklch(from var(--foreground) l c h / 0.4)",
              }}
              onClick={onClose}
              aria-hidden
            />

            <motion.aside
              key="panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-sidebar border-r border-sidebar-border lg:hidden flex flex-col"
              aria-label="Sidebar"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar"
                className="absolute top-4 right-4 size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" />
              </button>

              <SidebarContent
                role={role}
                user={user}
                pathname={pathname}
                onLinkClick={onClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
