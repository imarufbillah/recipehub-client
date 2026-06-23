"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/navbar/ThemeToggle";
import DashboardSidebar from "./DashboardSidebar";
import DashboardUserDropdown from "./DashboardUserDropdown";
import { cn } from "@/lib/utils";

const DashboardHeader = ({ title, role = "user", user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  // Close on click-outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      <DashboardSidebar
        role={role}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-5 md:px-8 bg-background border-b border-border">
        {/* ── Left: mobile hamburger + page title ── */}
        <div className="flex items-center gap-3">
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

          <h1
            className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h1>
        </div>

        {/* ── Right: theme toggle + avatar trigger ── */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Avatar trigger — avatar + first name + rotating chevron */}
          <div ref={menuRef} className="relative ml-1">
            <button
              type="button"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={cn(
                "flex items-center gap-2 rounded-full outline-none",
                "transition-opacity duration-200 hover:opacity-80",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {/* Avatar circle */}
              <span
                className={cn(
                  "relative flex shrink-0 size-8 rounded-full overflow-hidden bg-muted",
                  user?.plan === "premium" &&
                    "ring-2 ring-accent ring-offset-1 ring-offset-background",
                )}
              >
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "avatar"}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em] select-none">
                    {initials}
                  </span>
                )}
              </span>

              {/* First name — hidden on very small screens */}
              <span className="hidden sm:block text-[13px] font-sans text-foreground leading-none select-none">
                {user?.name?.split(" ")[0] ?? ""}
              </span>

              {/* Chevron — rotates 180° when open */}
              <ChevronDown
                className={cn(
                  "size-3.5 text-muted-foreground transition-transform duration-200",
                  menuOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>

            {/* Dropdown with entrance animation matching the navbar */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 z-50"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.175, ease: "easeOut" }}
                >
                  <DashboardUserDropdown
                    user={user}
                    role={role}
                    onClose={() => setMenuOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
