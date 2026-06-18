"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Browse Recipes" },
];

/**
 * Mobile hamburger + full-screen overlay menu.
 *
 * Motion intent (per design system):
 *  - Overlay fades in (opacity 0→1, 250ms ease-out). No slide-bounce.
 *  - Links stagger-fade up 12px, 60ms apart, after overlay appears.
 *  - Close: quick fade-out (200ms), no bounce.
 */
const MobileMenu = ({ pathname = "" }) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
            {/* Top bar — logo + close button */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link
                href="/"
                onClick={close}
                className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-foreground"
              >
                RecipeHub
              </Link>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={close}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Nav links — large serif, stacked, generous vertical spacing */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 flex flex-col justify-center px-8"
            >
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label }, i) => {
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
                        // Overlay fades in at 250ms, links start staggering after
                        delay: 0.18 + i * 0.07,
                      }}
                    >
                      <Link
                        href={href}
                        onClick={close}
                        className={
                          isActive
                            ? "font-heading text-[40px] leading-tight tracking-[-0.02em] text-primary block py-3"
                            : "font-heading text-[40px] leading-tight tracking-[-0.02em] text-foreground hover:text-primary transition-colors duration-200 block py-3"
                        }
                      >
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom bar — theme toggle + auth buttons */}
            <div className="px-8 pb-10 pt-6 border-t border-border flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium">
                  Toggle theme
                </span>
              </div>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
