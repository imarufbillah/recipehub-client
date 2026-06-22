"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumUpgradeModal from "@/components/premium/PremiumUpgradeModal";

const RecipeLimitGate = ({ recipeCount }) => {
  // Open the modal immediately — user just hit the limit
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      {/* Blocked empty state — visible behind / after the modal */}
      <div className="flex flex-col items-center justify-center py-20 gap-5 text-center max-w-sm mx-auto">
        <div
          className="flex items-center justify-center size-12 rounded-full bg-muted"
          aria-hidden
        >
          <ShieldAlert className="size-5 text-muted-foreground stroke-[1.25]" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-[20px] leading-snug tracking-[-0.01em] text-foreground">
            Recipe limit reached
          </h3>
          <p className="text-[14px] font-sans text-muted-foreground leading-relaxed">
            You&apos;ve published {recipeCount} of 2 recipes on the free plan.
            Upgrade to Premium for unlimited publishing.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          <Button
            variant="default"
            size="sm"
            asChild
            className="w-full px-6 font-sans text-[13px] font-medium"
          >
            <Link href="/premium">Upgrade to Premium</Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="w-full px-4 font-sans text-[13px] text-muted-foreground hover:text-foreground"
          >
            Learn more
          </Button>
        </div>
      </div>

      {/* Upgrade modal — limit-hit variant, auto-opened on mount */}
      <PremiumUpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="limit"
      />
    </>
  );
};

export default RecipeLimitGate;
