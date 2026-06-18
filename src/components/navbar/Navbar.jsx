"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrolled from "@/hooks/useScrolled";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";

/**
 * Sticky navbar — transparent over the hero, gains card background + hairline
 * border after scrolling past 80px. Designed once, rendered on all public pages
 * via the (public) layout.
 *
 * Desktop: logo left | nav links center | theme + auth right
 * Mobile:  logo left | hamburger right  (full-screen overlay handled by MobileMenu)
 */
const Navbar = () => {
  const scrolled = useScrolled(80);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-card border-b border-border shadow-none"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between gap-6">
        {/* ── Logo / Wordmark ── */}
        <Link
          href="/"
          className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-foreground shrink-0 hover:text-primary transition-colors duration-200"
        >
          RecipeHub
        </Link>

        {/* ── Desktop nav links (center / right) ── */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks pathname={pathname} />
        </div>

        {/* ── Desktop: theme toggle + auth ── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <ThemeToggle />

          {/* Login — ghost/text button, no fill, color shifts to primary on hover */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent px-3"
          >
            <Link href="/login">Login</Link>
          </Button>

          {/* Register — secondary button (NOT primary — primary is reserved for the page CTA) */}
          <Button variant="secondary" size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* ── Mobile: hamburger (overlay managed inside MobileMenu) ── */}
        <div className="flex md:hidden items-center">
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
