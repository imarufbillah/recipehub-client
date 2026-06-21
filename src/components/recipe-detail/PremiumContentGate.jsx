"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import handleCheckout from "@/lib/handleCheckout";

const PremiumContentGate = ({
  recipeName,
  recipeId,
  recipeSlug,
  priceAmount,
  price,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      await handleCheckout({
        recipeId,
        recipeName,
        price: priceAmount,
        recipeSlug,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-16 lg:py-24 overflow-hidden">
      {/* ── Blurred content skeleton ─────────────────────────────────────── */}
      {/* Mimics the real two-column layout so users understand what's gated */}
      <div
        className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 gap-14 select-none pointer-events-none"
        aria-hidden
      >
        {/* Left — ingredients skeleton */}
        <div className="lg:col-span-5 lg:border-r lg:border-border lg:pr-16 flex flex-col gap-6">
          <div className="h-7 w-32 bg-foreground/8 rounded" />
          {[100, 85, 92, 78, 95, 80, 88].map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-border/50"
            >
              <div className="h-3 w-12 bg-foreground/8 rounded shrink-0" />
              <div
                className={`h-3 bg-foreground/8 rounded`}
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>

        {/* Right — instructions skeleton */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="h-7 w-36 bg-foreground/8 rounded" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="shrink-0 h-10 w-8 bg-foreground/6 rounded" />
              <div className="flex flex-col gap-2 flex-1 pt-1">
                <div className="h-4 bg-foreground/8 rounded w-full" />
                <div className="h-4 bg-foreground/8 rounded w-5/6" />
                <div className="h-4 bg-foreground/8 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gradient fade overlay — foreground → transparent from bottom ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--background) 30%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Blur layer ── */}
      <div
        className="absolute inset-0 backdrop-blur-[3px] pointer-events-none"
        aria-hidden
      />

      {/* ── Gate card — sits above both overlay layers ── */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm w-full bg-card border border-border rounded-xl px-8 py-10 shadow-sm">
          {/* Premium badge */}
          <Badge className="bg-accent/10 text-accent border-transparent rounded-sm text-[11px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2.5 py-1">
            Premium Recipe
          </Badge>

          {/* Lock icon */}
          <div className="flex items-center justify-center size-14 rounded-full border border-border bg-background">
            <Lock
              className="size-6 text-muted-foreground stroke-[1.5]"
              aria-hidden
            />
          </div>

          {/* Headline + subtext */}
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-[clamp(20px,2.5vw,26px)] leading-tight tracking-[-0.01em] text-foreground">
              Unlock this recipe
            </h3>
            <p className="text-[14px] font-sans text-muted-foreground leading-relaxed">
              Purchase once to get full access to the ingredients and
              step-by-step instructions for{" "}
              <span className="text-foreground font-medium">{recipeName}</span>.
            </p>
          </div>

          {/* Unlock CTA */}
          <Button
            variant="default"
            size="default"
            disabled={loading}
            onClick={handleUnlock}
            className="w-full gap-2 font-sans text-[14px] font-medium"
          >
            <Lock className="size-4 shrink-0" aria-hidden />
            {loading ? "Redirecting…" : `Unlock Recipe — ${price}`}
          </Button>

          <p className="text-[12px] font-sans text-muted-foreground">
            One-time purchase · Instant access
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumContentGate;
