"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PremiumPageHeader from "./PremiumPageHeader";
import PremiumOfferCard from "./PremiumOfferCard";
import PremiumAlreadyMember from "./PremiumAlreadyMember";
import PremiumSocialProof from "./PremiumSocialProof";

const cardEntrance = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Header fades in first, slightly ahead of the card.
 * Keeps the page from feeling like everything pops at once.
 */
const headerEntrance = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0 },
  },
};

const PremiumPageClient = ({ isPremium = false, price = "20" }) => {
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
    <div className="flex flex-col items-center gap-16 w-full">
      {/* ── Page header block — breathing room before the offer ── */}
      <motion.div
        variants={headerEntrance}
        initial="hidden"
        animate="visible"
        className="w-full flex justify-center"
      >
        <PremiumPageHeader />
      </motion.div>

      {/* ── Offer card — single focal element, quiet entrance ── */}
      <motion.div
        variants={cardEntrance}
        initial="hidden"
        animate="visible"
        className="w-full flex justify-center"
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

      {/* ── Social proof strip — low emphasis, below the fold decision point ── */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="w-full flex justify-center pb-4"
        >
          <PremiumSocialProof />
        </motion.div>
      )}
    </div>
  );
};

export default PremiumPageClient;
