"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Animation variants — identical to PremiumPageClient ─────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

// ─── Static data ──────────────────────────────────────────────────────────────

const BENEFIT_HIGHLIGHTS = [
  "Publish unlimited recipes",
  "Earn a Premium profile badge",
  "Purchase any recipe on the platform",
  "Priority visibility in search",
];

/*
 * Widths mirror actual label character lengths:
 *   "Unlimited recipe publishing"           → w-48
 *   "Premium profile badge"                 → w-36
 *   "Access to purchase individual recipes" → w-56
 *   "Priority recipe visibility in search"  → w-52
 *   "Exclusive premium member community"    → w-48
 */
const BENEFIT_LABEL_WIDTHS = ["w-48", "w-36", "w-56", "w-52", "w-48"];

const SOCIAL_PROOF_COLS = [
  { lines: ["w-28", "w-24", "w-20"], nameW: "w-12" },
  { lines: ["w-32", "w-28", "w-16"], nameW: "w-14" },
  { lines: ["w-24", "w-32", "w-20"], nameW: "w-10" },
];

// ─── Left column ──────────────────────────────────────────────────────────────

const LeftColumn = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={0}
    className="lg:col-span-7 flex flex-col gap-12"
  >
    {/* PremiumPageHeader — fully static, render real text */}
    <div className="flex flex-col gap-8">
      {/* Eyebrow badge */}
      <span className="inline-flex items-center w-fit bg-accent/10 text-accent border border-accent/20 rounded-sm px-3 py-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans">
        RecipeHub Premium
      </span>

      {/* H1 */}
      <h1 className="font-heading text-[clamp(32px,4.5vw,56px)] leading-none tracking-tight text-foreground max-w-[12ch]">
        Your kitchen, fully unlocked.
      </h1>

      {/* Supporting copy */}
      <p className="text-[16px] leading-[1.65] text-muted-foreground font-sans max-w-[38ch]">
        One subscription. Unlimited publishing, exclusive access, and the tools
        serious cooks actually need.
      </p>

      {/* Benefit highlights — real text, no skeleton */}
      <ul className="flex flex-col gap-3" aria-label="What you get">
        {BENEFIT_HIGHLIGHTS.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check
              className="size-4 shrink-0 text-accent stroke-[1.75]"
              aria-hidden
            />
            <span className="text-[14px] font-sans text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* PremiumSocialProof skeleton — same fadeIn delay as real component */}
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={0.3}
      className="w-full"
      aria-hidden="true"
    >
      <div className="flex items-stretch divide-x divide-border">
        {SOCIAL_PROOF_COLS.map((col, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col items-center text-center gap-3 px-5 py-0",
              i === 0 && "pl-0",
              i === SOCIAL_PROOF_COLS.length - 1 && "pr-0",
            )}
          >
            {/* Quote lines */}
            <div className="flex flex-col gap-1.5 items-center">
              {col.lines.map((w, j) => (
                <div
                  key={j}
                  className={cn("h-3 bg-muted rounded-sm animate-pulse", w)}
                  style={{ animationDelay: `${(i * 3 + j) * 40}ms` }}
                />
              ))}
            </div>
            {/* Avatar + name */}
            <div className="flex items-center gap-2 mt-auto">
              <div className="size-6 rounded-full bg-muted shrink-0 animate-pulse" />
              <div
                className={cn(
                  "h-2.5 bg-muted rounded-sm animate-pulse",
                  col.nameW,
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

// ─── Right column — PremiumOfferCard skeleton ─────────────────────────────────

const RightColumn = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={0.1}
    className="lg:col-span-5 lg:sticky lg:top-24"
    aria-hidden="true"
  >
    <div
      className={cn(
        "w-full bg-card border border-border rounded-xl",
        "px-10 py-14 flex flex-col gap-0",
        "max-sm:px-6 max-sm:py-10",
      )}
    >
      {/* ── 1. Price block ──
          Mirrors: flex items-end gap-1 pb-8
          $ symbol + large numeral + stacked "per month / cancel anytime"
      */}
      <div className="flex items-end gap-1 pb-8">
        <div className="w-5 h-6 bg-muted rounded-sm animate-pulse self-start mt-3" />
        <div className="w-32 h-20 bg-muted rounded-sm animate-pulse" />
        <div className="flex flex-col gap-1.5 ml-2 mb-2">
          <div className="h-3.5 w-20 bg-muted rounded-sm animate-pulse" />
          <div className="h-3.5 w-24 bg-muted rounded-sm animate-pulse" />
        </div>
      </div>

      {/* ── Divider 1 ── */}
      <div className="h-px bg-border" />

      {/* ── 2. Benefits list — 5 rows ── */}
      <ul className="flex flex-col gap-4 py-8">
        {BENEFIT_LABEL_WIDTHS.map((w, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className="size-4 shrink-0 mt-0.5 rounded-sm bg-muted animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
            <div
              className={cn("h-4 rounded-sm bg-muted animate-pulse", w)}
              style={{ animationDelay: `${i * 50 + 20}ms` }}
            />
          </li>
        ))}
      </ul>

      {/* ── Divider 2 ── */}
      <div className="h-px bg-border" />

      {/* ── 3. CTA block ── */}
      <div className="flex flex-col gap-4 pt-8">
        <div className="h-11 w-full rounded-md bg-muted animate-pulse" />
        <div className="h-3 w-44 mx-auto rounded-sm bg-muted animate-pulse" />
      </div>
    </div>
  </motion.div>
);

// ─── Page skeleton ─────────────────────────────────────────────────────────────

const PremiumLoading = () => (
  <section className="w-full py-24 lg:py-32">
    <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  </section>
);

export default PremiumLoading;
