"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONDENSED_BENEFITS = [
  "Unlimited recipe publishing",
  "Premium profile badge",
  "Access to purchase individual recipes",
];

/**
 * Shake animation for the limit-hit micro-label line.
 * 150ms, 2–3px horizontal oscillation, ease-out settle.
 * Per spec: "used once, immediately on modal open, to draw the eye"
 */
const shakeVariants = {
  initial: { x: 0 },
  shake: {
    x: [0, -3, 3, -2, 2, -1, 0],
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

/**
 * Modal panel entrance — fade + 8px upward translate, 300ms ease-out.
 * Per design system modal pattern.
 */
const panelVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const PremiumUpgradeModal = ({
  isOpen,
  onClose,
  variant = "upgrade",
  price = "19.99",
  onCheckout,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const isLimitHit = variant === "limit";

  const handleCheckout = async () => {
    if (onCheckout) {
      setIsLoading(true);
      try {
        await onCheckout();
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Default: navigate to the full premium page
    window.location.href = "/premium";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/*
           * Scrim — foreground token at low opacity per design system:
           * "scrim background uses foreground token at low opacity (not pure black)"
           */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/20"
            onClick={onClose}
            aria-hidden
          />

          {/* ── Modal panel ── */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="premium-modal-title"
          >
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "relative w-full max-w-110",
                "bg-card border border-border rounded-xl",
                "px-8 py-8 flex flex-col gap-0",
                "max-sm:px-5 max-sm:py-6",
              )}
            >
              {/* Close button — top-right, ghost icon */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </button>

              {/* ── Context-aware header ── */}
              <div className="flex flex-col gap-2 pb-6">
                {isLimitHit && (
                  /* Limit-hit micro-label with subtle entrance shake */
                  <motion.p
                    variants={shakeVariants}
                    initial="initial"
                    animate="shake"
                    className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
                  >
                    Free plan limit reached
                  </motion.p>
                )}

                {/* Serif H3 — confident, non-punitive */}
                <h2
                  id="premium-modal-title"
                  className="font-heading text-[clamp(20px,2.5vw,26px)] leading-snug tracking-[-0.02em] text-foreground"
                >
                  {isLimitHit
                    ? "Ready to publish more?"
                    : "Unlock the full RecipeHub experience."}
                </h2>

                {/* Muted supporting line */}
                <p className="text-[14px] leading-[1.6] text-muted-foreground font-sans">
                  {isLimitHit
                    ? "You've reached the 2-recipe limit on the free plan."
                    : "Everything you need to cook, publish, and share — without limits."}
                </p>
              </div>

              {/* ── Premium badge moment — price block ── */}
              <div className="flex items-baseline gap-2 pb-6 border-b border-border">
                {/* Accent "PREMIUM" micro-label badge */}
                <span className="inline-flex items-center bg-accent/10 text-accent border border-accent/20 rounded-sm px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] font-medium font-sans shrink-0">
                  Premium
                </span>

                {/* Price — medium-large serif, typographically intentional */}
                <span className="font-heading text-[clamp(28px,4vw,36px)] leading-none tracking-[-0.03em] text-foreground">
                  ${price}
                </span>

                {/* Clarifier */}
                <span className="text-[13px] text-muted-foreground font-sans">
                  / month
                </span>
              </div>

              {/* ── Condensed benefits — 3 items max ── */}
              <ul
                className="flex flex-col gap-3 py-5 border-b border-border"
                aria-label="Premium benefits"
              >
                {CONDENSED_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check
                      className="size-3.5 shrink-0 mt-0.5 text-accent stroke-[1.75]"
                      aria-hidden
                    />
                    <span className="text-[14px] leading-normal text-foreground font-sans">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* "See everything included" ghost link */}
              <div className="pt-3 pb-5">
                <Link
                  href="/premium"
                  onClick={onClose}
                  className="text-[13px] text-muted-foreground hover:text-foreground font-sans transition-colors duration-150"
                >
                  See everything included →
                </Link>
              </div>

              {/* ── CTA block ── */}
              <div className="flex flex-col gap-2.5">
                {/* Primary — dominant action */}
                <Button
                  variant="default"
                  className="w-full h-10 text-[14px] font-medium font-sans"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Redirecting…" : "Get Premium"}
                </Button>

                {/* Dismiss — "Maybe later", not "No thanks" or dark-pattern phrasing */}
                <Button
                  variant="ghost"
                  className="w-full h-9 text-[13px] font-sans text-muted-foreground hover:text-foreground"
                  onClick={onClose}
                >
                  Maybe later
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PremiumUpgradeModal;
