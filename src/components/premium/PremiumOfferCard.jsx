"use client";

import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFITS = [
  "Unlimited recipe publishing",
  "Premium profile badge",
  "Access to purchase individual recipes",
  "Priority recipe visibility in search",
  "Exclusive premium member community",
];

const BenefitRow = ({ label }) => (
  <li className="flex items-start gap-3">
    <Check
      className="size-4 shrink-0 mt-0.5 text-accent stroke-[1.75]"
      aria-hidden
    />
    <span className="text-[15px] leading-[1.6] text-foreground font-sans">
      {label}
    </span>
  </li>
);

const PremiumOfferCard = ({ price = "20", onCheckout, isLoading = false }) => {
  return (
    <div
      className={cn(
        "w-full",
        "bg-card border border-border rounded-xl",
        "px-10 py-14 flex flex-col gap-0",
        "max-sm:px-6 max-sm:py-10",
      )}
    >
      {/* ── 1. Price block ── */}
      <div className="flex items-end gap-1 pb-8">
        {/* Currency symbol — smaller serif, aligned to numeral baseline */}
        <span className="font-heading text-[28px] leading-none tracking-[-0.02em] text-foreground self-start mt-3">
          $
        </span>

        {/*
         * Price numeral — large serif display size.
         * "Numeral as editorial element" — per design system stat-card treatment.
         */}
        <span className="font-heading text-[clamp(64px,8vw,88px)] leading-none tracking-[-0.04em] text-foreground">
          {price}
        </span>

        {/* Period label — muted sans, aligned to baseline */}
        <div className="flex flex-col gap-0.5 ml-2 mb-2">
          <span className="text-[13px] font-sans text-muted-foreground leading-snug">
            per month
          </span>
          <span className="text-[13px] font-sans text-muted-foreground leading-snug">
            cancel anytime
          </span>
        </div>
      </div>

      {/* ── Divider 1 ── */}
      <div className="h-px bg-border" aria-hidden />

      {/* ── 2. Benefits list ── */}
      <ul className="flex flex-col gap-4 py-8" aria-label="Premium benefits">
        {BENEFITS.map((benefit) => (
          <BenefitRow key={benefit} label={benefit} />
        ))}
      </ul>

      {/* ── Divider 2 ── */}
      <div className="h-px bg-border" aria-hidden />

      {/* ── 3. CTA block ── */}
      <div className="flex flex-col gap-4 pt-8">
        <Button
          variant="default"
          size="lg"
          className="w-full h-11 text-[14px] font-medium font-sans"
          onClick={onCheckout}
          disabled={isLoading}
          aria-label="Get Premium — billed monthly, cancel anytime"
        >
          {isLoading ? "Redirecting…" : "Unlock Premium"}
        </Button>

        {/* Stripe trust micro-line */}
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground font-sans">
          <Lock className="size-3 shrink-0" aria-hidden />
          Billed monthly · Secured by{" "}
          <span className="font-medium text-muted-foreground tracking-tight">
            Stripe
          </span>
        </p>
      </div>
    </div>
  );
};

export default PremiumOfferCard;
