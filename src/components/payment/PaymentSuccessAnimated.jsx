"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccessAnimated = ({
  summaryLabel,
  subText,
  ctaLabel,
  redirectHref,
  amountDisplay,
  txnRef,
  customerEmail,
  isPremiumUpgrade,
}) => {
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

      {/* ── Text block ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
        className="flex flex-col gap-3"
      >
        <h2 className="font-heading text-[clamp(28px,3.5vw,38px)] leading-tight tracking-[-0.02em] text-foreground">
          You&rsquo;re all set.
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
        {/* Card header */}
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            Transaction Summary
          </p>
        </div>

        {/* Rows */}
        <div className="px-5 py-4 flex flex-col gap-3.5">
          {/* Item */}
          <div className="flex items-start justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans shrink-0">
              Item
            </span>
            <span className="text-[13px] font-sans text-foreground text-right leading-snug">
              {summaryLabel}
            </span>
          </div>

          {/* Amount — mono, authoritative from Stripe */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans shrink-0">
              Amount
            </span>
            <span className="font-mono text-[14px] font-semibold text-foreground">
              {amountDisplay}
            </span>
          </div>

          {/* Customer email — confirmed by Stripe */}
          {customerEmail && (
            <div className="flex items-start justify-between gap-4">
              <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans shrink-0">
                Receipt
              </span>
              <span className="font-mono text-[12px] text-muted-foreground text-right break-all">
                {customerEmail}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-border" aria-hidden />

          {/* Ref — short payment intent ID */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[12px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans shrink-0">
              Ref
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">
              {txnRef}
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

export default PaymentSuccessAnimated;
