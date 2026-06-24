import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFIT_HIGHLIGHTS = [
  "Publish unlimited recipes",
  "Earn a Premium profile badge",
  "Purchase any recipe on the platform",
  "Priority visibility in search",
];

const PremiumLoading = () => {
  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          {/* ── Left column — fully static, no skeleton ── */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            {/* PremiumPageHeader — static content, render as-is */}
            <div className="flex flex-col gap-8">
              {/* Eyebrow badge */}
              <span className="inline-flex items-center w-fit bg-accent/10 text-accent border border-accent/20 rounded-sm px-3 py-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans">
                RecipeHub Premium
              </span>

              {/* H1 — Page Title */}
              <h1 className="font-heading text-[clamp(32px,4.5vw,56px)] leading-none tracking-tight text-foreground max-w-[12ch]">
                Your kitchen, fully unlocked.
              </h1>

              {/* Supporting copy */}
              <p className="text-[16px] leading-[1.65] text-muted-foreground font-sans max-w-[38ch]">
                One subscription. Unlimited publishing, exclusive access, and
                the tools serious cooks actually need.
              </p>

              {/* Benefit highlights */}
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

            {/* PremiumSocialProof strip — static content, render as-is */}
            <div className="w-full">
              <div className="flex items-stretch divide-x divide-border">
                {[
                  { width: "w-32", nameWidth: "w-14" },
                  { width: "w-28", nameWidth: "w-16" },
                  { width: "w-30", nameWidth: "w-12" },
                ].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center text-center gap-3 px-5 py-0",
                      i === 0 && "pl-0",
                      i === 2 && "pr-0",
                    )}
                  >
                    {/* Quote lines — two lines of muted italic text */}
                    <div className="flex flex-col gap-1.5 items-center">
                      <div className="h-3 w-28 bg-muted/50 rounded-sm" />
                      <div className="h-3 w-20 bg-muted/40 rounded-sm" />
                    </div>
                    {/* Avatar + name */}
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="size-6 rounded-full bg-muted/60 shrink-0" />
                      <div className="h-2.5 w-12 bg-muted/50 rounded-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — skeleton only, content is user-plan-dependent ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div
              className={cn(
                "w-full",
                "bg-card border border-border rounded-xl",
                "px-10 py-14 flex flex-col gap-0",
                "max-sm:px-6 max-sm:py-10",
              )}
              aria-hidden="true"
            >
              {/* ── Price / status block skeleton ── */}
              {/*
               * Mirrors either:
               *   PremiumOfferCard  → large price numeral + "/month" label
               *   PremiumAlreadyMember → circle check icon + H3 + sub-line
               *
               * We use a generic "header block" skeleton that fits both shapes:
               * a tall wide bar (numeral/confirmation heading) + a short narrow bar.
               */}
              <div className="pb-8 flex flex-col gap-3">
                {/* Large primary content — numeral or confirmation heading */}
                <div className="h-20 w-36 bg-muted/60 rounded-sm animate-pulse" />
                {/* Secondary line — "per month / cancel anytime" or sub-copy */}
                <div className="h-3.5 w-24 bg-muted/40 rounded-sm animate-pulse" />
                <div className="h-3 w-20 bg-muted/30 rounded-sm animate-pulse" />
              </div>

              {/* ── Divider 1 ── */}
              <div className="h-px bg-border" aria-hidden />

              {/* ── Benefits list skeleton ── */}
              {/*
               * 5 rows — matches both PremiumOfferCard (5 benefits) and
               * PremiumAlreadyMember (5 benefits). Each row: check icon + label.
               */}
              <ul className="flex flex-col gap-4 py-8" aria-label="">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {/* Check icon placeholder */}
                    <div className="size-4 shrink-0 rounded-sm bg-muted/50 animate-pulse" />
                    {/* Benefit label — varying widths for natural feel */}
                    <div
                      className={cn(
                        "h-3.5 rounded-sm bg-muted/40 animate-pulse",
                        i === 0 && "w-44",
                        i === 1 && "w-36",
                        i === 2 && "w-52",
                        i === 3 && "w-40",
                        i === 4 && "w-48",
                      )}
                    />
                  </li>
                ))}
              </ul>

              {/* ── Divider 2 ── */}
              <div className="h-px bg-border" aria-hidden />

              {/* ── CTA block skeleton ── */}
              {/*
               * Mirrors either:
               *   PremiumOfferCard  → primary button + Stripe micro-line
               *   PremiumAlreadyMember → ghost button "Go to Dashboard"
               *
               * We skeleton the button bar — a single full-width bar
               * at button height (h-11), then a slim secondary micro-line.
               */}
              <div className="flex flex-col gap-4 pt-8">
                {/* Primary button skeleton */}
                <div className="h-11 w-full rounded-md bg-muted/50 animate-pulse" />
                {/* Micro-line — "Billed monthly · Secured by Stripe" */}
                <div className="h-3 w-40 mx-auto rounded-sm bg-muted/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumLoading;
