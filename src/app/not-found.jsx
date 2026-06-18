import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/navbar/ThemeToggle";

/**
 * 404 — global not-found page.
 *
 * Placed at app/not-found.jsx so it renders for all unmatched routes.
 * Inherits the root layout (html, body, fonts, ThemeProvider).
 *
 * Design intent:
 *  - Confidence through restraint: no cartoon illustration, no broken-plate
 *    food pun, no over-worked visual gimmick.
 *  - Large serif "404" as the dominant typographic element —
 *    Display Hero scale (72–96px desktop), treated purely as a numeral.
 *  - Short restrained sans copy beneath. Single primary button home.
 *  - Wordmark + theme toggle at top (minimal chrome, consistent with the
 *    single-focus layout philosophy of auth pages).
 *  - The entire viewport is breathing room — generous vertical centering.
 */

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Minimal top strip ── */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-heading text-[20px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors duration-200"
        >
          RecipeHub
        </Link>
        <ThemeToggle />
      </header>

      {/* ── Centered content — full remaining height ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 text-center">
        {/* ── Display numeral — the single dominant element ── */}
        {/*
         * Display Hero scale: 72–96px desktop, 40–48px mobile.
         * Serif, tight tracking — a confident typographic moment, not a graphic.
         * Muted-foreground keeps it from screaming; the size does the work.
         */}
        <p
          className="font-heading leading-none tracking-[-0.04em] text-muted-foreground/40 select-none"
          style={{ fontSize: "clamp(80px, 18vw, 144px)" }}
          aria-hidden
        >
          404
        </p>

        {/* ── Copy ── */}
        <div className="mt-6 flex flex-col gap-3 max-w-sm">
          <h1 className="font-heading text-[clamp(24px,3vw,34px)] leading-tight tracking-[-0.02em] text-foreground">
            This recipe doesn&apos;t exist.
          </h1>
          <p className="text-[15px] font-sans text-muted-foreground leading-relaxed">
            The page you&apos;re looking for may have been removed, renamed, or
            never existed in the first place.
          </p>
        </div>

        {/* ── Single CTA ── */}
        <div className="mt-8">
          <Button
            variant="default"
            asChild
            className="px-7 h-10 font-sans text-[14px] font-medium"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* ── Quiet secondary link — browse instead of going home ── */}
        <Link
          href="/recipes"
          className="mt-4 text-[12px] font-sans text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Browse all recipes →
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
