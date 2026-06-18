"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrolled from "@/hooks/useScrolled";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";
import { useClientSession } from "@/hooks/useClientSession";

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
  const { user, isPending } = useClientSession();
  //  user data structure for example
  //   {
  //     "name": "Inspector",
  //     "email": "admin@recipehub.com",
  //     "emailVerified": false,
  //     "image": "https://img.icons8.com/fluent/1200/microsoft-admin.jpg",
  //     "createdAt": "2026-06-18T09:06:46.440Z",
  //     "updatedAt": "2026-06-18T09:06:46.440Z",
  //     "id": "6a33b526c8e7e9cc557dcb62"
  // }

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
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {isPending ? null : user ? (
            /* Authenticated — user menu trigger + dropdown */
            <UserMenu user={user} />
          ) : (
            /* Unauthenticated — Login + Register */
            <>
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
            </>
          )}
        </div>

        {/* ── Mobile: hamburger (overlay managed inside MobileMenu) ── */}
        <div className="flex md:hidden items-center">
          <MobileMenu pathname={pathname} user={user} isPending={isPending} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
