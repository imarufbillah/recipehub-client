"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Payment Success page — single-focus, no chrome.
 *
 * Design intent: one earned moment of deliberate motion in the product.
 *  - Confirmation icon: fade + scale-in (scale 0.88 → 1.0, opacity 0 → 1,
 *    400ms ease-out). Max scale 1.05 at no point — no bounce, no overshoot.
 *    Line-icon (CheckCircle, not a filled celebratory graphic).
 *  - Serif H2 "You're all set."
 *  - Muted sans confirmation line (premium activated / recipe unlocked).
 *  - Compact transaction summary card: card token, hairline border,
 *    mono-styled transaction ID and amount (design system mono rule),
 *    sans labels above each value.
 *  - Single primary button to continue.
 *
 * searchParams (Promise in Next.js 15+):
 *  - type: "premium" | "recipe" (default "recipe")
 *  - title: recipe title (for "recipe" type)
 *  - amount: "$4.99"
 *  - txn: "TXN-00041A"
 *  - redirect: href for the CTA button (default "/dashboard")
 */

const PaymentSuccessPage = ({ searchParams }) => {
  const params = use(searchParams);

  const type = params?.type ?? "recipe";
  const recipeTitle = params?.title ?? "Recipe";
  const amount = params?.amount ?? "$0.00";
  const txnId = params?.txn ?? "TXN-000000";
  const redirectHref = params?.redirect ?? "/dashboard";

  const isPremiumUpgrade = type === "premium";

  const headlineText = "You're all set.";
  const subText = isPremiumUpgrade
    ? "Your Premium membership is now active. Enjoy full access to all premium recipes."
    : `You've unlocked "${recipeTitle}". Ingredients and instructions are now available.`;
  const ctaLabel = isPremiumUpgrade ? "Go to Dashboard" : "View Recipe";
  const summaryLabel = isPremiumUpgrade ? "Premium Membership" : recipeTitle;

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">
      {/* ── Confirmation icon — the one earned motion moment ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-hidden
      >
        <CheckCircle
          className="size-12 text-accent stroke-[1.25]"
          aria-hidden
        />
      </motion.div>

      {/* ── Text block — fades in slightly after icon ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        className="flex flex-col gap-3"
      >
        <h2 className="font-heading text-[clamp(28px,3.5vw,38px)] leading-tight tracking-[-0.02em] text-foreground">
          {headlineText}
        </h2>
        <p className="text-[15px] font-sans text-muted-foreground leading-relaxed max-w-xs mx-auto">
          {subText}
        </p>
      </motion.div>

      {/* ── Transaction summary card ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
        className="w-full bg-card border border-border rounded-lg overflow-hidden"
      >
        {/* Summary header */}
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            Transaction Summary
          </p>
        </div>

        {/* Summary rows */}
        <div className="px-5 py-4 flex flex-col gap-3.5">
          {/* Item */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans">
              Item
            </span>
            <span className="text-[13px] font-sans text-foreground text-right leading-snug max-w-50">
              {summaryLabel}
            </span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans">
              Amount
            </span>
            {/* Mono face for numeric financial data — design system rule */}
            <span className="font-mono text-[14px] font-semibold text-foreground">
              {amount}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" aria-hidden />

          {/* Transaction ID — mono face, subdued */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans">
              Ref
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">
              {txnId}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Primary CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
        className="w-full"
      >
        <Button
          variant="default"
          asChild
          className="w-full h-10 font-sans text-[14px] font-medium"
        >
          <Link href={redirectHref}>{ctaLabel}</Link>
        </Button>

        {/* Secondary quiet link — always to dashboard */}
        {!isPremiumUpgrade && (
          <Link
            href="/dashboard"
            className="block mt-3 text-[12px] font-sans text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Go to Dashboard
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
