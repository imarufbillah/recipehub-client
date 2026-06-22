"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PremiumPageHeader from "./PremiumPageHeader";
import PremiumOfferCard from "./PremiumOfferCard";
import PremiumAlreadyMember from "./PremiumAlreadyMember";
import PremiumSocialProof from "./PremiumSocialProof";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

const PremiumPageClient = ({ isPremium = false, price = "19.99" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
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
  };

  return (
    /*
     * Two-column grid on lg+.
     * 7/12 left, 5/12 right — deliberate asymmetry per design system
     * ("asymmetry permitted in hero/featured layouts").
     * gap-16 gives generous breathing room between columns.
     * Single column on mobile (grid-cols-1).
     */
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
      {/* ── Left column — text content ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="lg:col-span-7 flex flex-col gap-12"
      >
        <PremiumPageHeader />

        {/* Social proof strip — lives in the left column below the header copy */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <PremiumSocialProof />
          </motion.div>
        )}
      </motion.div>

      {/* ── Right column — offer card, sticky on scroll ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
        /*
         * lg:sticky + top accounts for the fixed navbar (h-16 = 64px) plus
         * comfortable breathing room so the card doesn't kiss the nav edge.
         */
        className="lg:col-span-5 lg:sticky lg:top-24"
      >
        {isPremium ? (
          <PremiumAlreadyMember />
        ) : (
          <PremiumOfferCard
            price={price}
            onCheckout={handleCheckout}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
};

export default PremiumPageClient;
