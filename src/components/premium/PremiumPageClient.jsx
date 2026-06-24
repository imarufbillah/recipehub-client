"use client";

import { useState } from "react";
import PremiumPageHeader from "./PremiumPageHeader";
import PremiumOfferCard from "./PremiumOfferCard";
import PremiumAlreadyMember from "./PremiumAlreadyMember";
import PremiumSocialProof from "./PremiumSocialProof";
import useAuthGuard from "@/hooks/useAuthGuard";

const PremiumPageClient = ({ isPremium = false, price = "19.99" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const guard = useAuthGuard();

  const handleCheckout = () =>
    guard(async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/checkout_sessions_premium", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price }),
        });

        if (!res.ok) {
          const { error } = await res.json().catch(() => ({}));
          throw new Error(error ?? "Failed to start checkout");
        }

        const { url } = await res.json();
        if (!url) throw new Error("No checkout URL returned");
        window.location.href = url;
      } catch (err) {
        console.error("[PremiumCheckout]", err);
        setIsLoading(false);
      }
    });

  return (
    /*
     * Two-column grid on lg+.
     * 7/12 left, 5/12 right — deliberate asymmetry per design system.
     * Single column on mobile (grid-cols-1).
     */
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
      {/* ── Left column — text content ── */}
      <div className="lg:col-span-7 flex flex-col gap-12">
        <PremiumPageHeader />

        {/* Social proof strip — only for non-premium visitors */}
        {!isPremium && <PremiumSocialProof />}
      </div>

      {/* ── Right column — offer card, sticky on scroll ── */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        {isPremium ? (
          <PremiumAlreadyMember />
        ) : (
          <PremiumOfferCard
            price={price}
            onCheckout={handleCheckout}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default PremiumPageClient;
