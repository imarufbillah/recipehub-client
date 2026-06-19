"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import DashboardSidebar from "./DashboardSidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Dashboard Header — client component.
 *
 * Persistent top bar across all dashboard pages.
 * Per Admin Mode rules: page title in sans (not serif) — dashboard chrome
 * prioritises fast scanning, not editorial personality. Serif is reserved
 * for true content (recipe names, section titles).
 *
 * Layout:
 *  Left:  hamburger (mobile only) + current page title
 *  Right: theme toggle + user avatar menu trigger
 *
 * Hairline border-bottom separates header from content area.
 *
 * Props:
 *  title    — current page title string (passed from each page)
 *  role     — "user" | "admin" (passed to DashboardSidebar)
 *  user     — user identity object { name, avatarInitials }
 */
const DashboardHeader = ({ title, role = "user", user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <>
      {/* Sidebar — controlled from here so mobile hamburger and close are co-located */}
      <DashboardSidebar
        role={role}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Header bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-5 md:px-8 bg-background border-b border-border">
        {/* ── Left: mobile hamburger + page title ── */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only, opens sidebar overlay */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className={cn(
              "lg:hidden size-8 flex items-center justify-center rounded-md",
              "text-muted-foreground hover:text-foreground transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <Menu className="size-4.5" />
          </button>

          {/* Page title — sans, Admin Mode density, not serif */}
          <h1
            className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h1>
        </div>

        {/* ── Right: theme toggle + avatar ── */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Avatar chip — real image or initials, acts as menu trigger placeholder */}
          <button
            type="button"
            aria-label="User menu"
            className={cn(
              "ml-1 size-8 rounded-full bg-muted flex items-center justify-center overflow-hidden",
              "text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em]",
              "hover:opacity-80 transition-opacity duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "avatar"}
                width={400}
                height={400}
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </button>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
