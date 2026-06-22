"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Heart,
  ShoppingBag,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Browse Recipes" },
  { href: "/premium", label: "Premium" },
];

const userMenuLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  {
    href: "/dashboard/purchased",
    label: "Purchased Recipes",
    icon: ShoppingBag,
  },
];

const MobileMenu = ({ pathname = "", user = null, isPending = false }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const initial = user?.name?.[0]?.toUpperCase() ?? "?";
  const isAdmin = user?.role === "admin";
  const isPremium = user?.plan === "premium";

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const handleSignOut = async () => {
    await authClient.signOut();
    close();
  };

  // All animated list items: nav links + (if authed) user links
  const allLinks = [
    ...navLinks,
    ...(user
      ? [
          ...userMenuLinks,
          ...(isAdmin
            ? [
                {
                  href: "/dashboard",
                  label: "Admin Dashboard",
                  icon: ShieldCheck,
                  isAdmin: true,
                },
              ]
            : []),
        ]
      : []),
  ];

  return (
    <>
      {/* Hamburger trigger */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu-overlay"
        onClick={() => setOpen(true)}
        className="text-foreground md:hidden"
      >
        <Menu className="size-5" />
      </Button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
          >
            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              {user ? (
                /* Authenticated: identity header instead of wordmark */
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "relative flex shrink-0 size-9 rounded-full",
                      isPremium &&
                        "ring-2 ring-accent ring-offset-1 ring-offset-background",
                    )}
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? "User avatar"}
                        fill
                        sizes="36px"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-[11px] font-medium uppercase tracking-wider select-none">
                        {initial}
                      </span>
                    )}
                  </span>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] font-medium text-foreground leading-snug truncate">
                      {user.name}
                    </span>
                    <span className="text-[13px] text-muted-foreground leading-snug truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              ) : (
                /* Unauthenticated: wordmark */
                <Link
                  href="/"
                  onClick={close}
                  className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-foreground"
                >
                  RecipeHub
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={close}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* ── Nav + user links ── */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 flex flex-col justify-center px-8 overflow-y-auto"
            >
              <ul className="flex flex-col gap-1">
                {/* Public nav links — large serif display */}
                {navLinks.map(({ href, label }, i) => {
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        delay: 0.18 + i * 0.07,
                      }}
                    >
                      <Link
                        href={href}
                        onClick={close}
                        className={cn(
                          "font-heading text-[40px] leading-tight tracking-[-0.02em] block py-3 transition-colors duration-200",
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary",
                        )}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}

                {/* Authenticated user links — hairline separator + sans body links */}
                {user && (
                  <>
                    <motion.li
                      key="divider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.18 + navLinks.length * 0.07,
                      }}
                      className="border-t border-border my-3"
                      aria-hidden="true"
                    />

                    {[
                      ...userMenuLinks,
                      ...(isAdmin
                        ? [
                            {
                              href: "/dashboard",
                              label: "Admin Dashboard",
                              icon: ShieldCheck,
                              isAdmin: true,
                            },
                          ]
                        : []),
                    ].map(
                      ({ href, label, icon: Icon, isAdmin: adminItem }, i) => (
                        <motion.li
                          key={`${href}-${label}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            duration: 0.32,
                            ease: "easeOut",
                            delay: 0.18 + (navLinks.length + 1 + i) * 0.06,
                          }}
                        >
                          <Link
                            href={href}
                            onClick={close}
                            className="flex items-center gap-3 py-3 text-[18px] text-foreground hover:text-primary transition-colors duration-200"
                          >
                            <Icon
                              className={cn(
                                "size-5 shrink-0",
                                adminItem
                                  ? "text-accent"
                                  : "text-muted-foreground",
                              )}
                            />
                            {label}
                          </Link>
                        </motion.li>
                      ),
                    )}
                  </>
                )}
              </ul>
            </nav>

            {/* ── Bottom bar ── */}
            <div className="px-8 pb-10 pt-6 border-t border-border flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium">
                  Toggle theme
                </span>
              </div>

              {!isPending &&
                (user ? (
                  /* Authenticated: logout link */
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 mt-2 text-[15px] text-destructive hover:opacity-80 transition-opacity duration-150 w-fit"
                  >
                    <LogOut className="size-4 shrink-0" />
                    Log out
                  </button>
                ) : (
                  /* Unauthenticated: Login + Register */
                  <div className="flex flex-col gap-3 mt-2">
                    <Button
                      variant="ghost"
                      asChild
                      className="justify-start px-0 text-sm text-foreground hover:text-primary w-fit"
                      onClick={close}
                    >
                      <Link href="/login">Login</Link>
                    </Button>

                    <Button
                      variant="secondary"
                      asChild
                      className="w-full"
                      onClick={close}
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
