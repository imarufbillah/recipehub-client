"use client";

import { useState } from "react";
import RecipeActionRow from "./RecipeActionRow";
import ReportModal from "./ReportModal";
import { useClientSession } from "@/hooks/useClientSession";

/**
 * Thin client island — owns only the modal open/close state and wires
 * the Report callback between RecipeActionRow and ReportModal.
 * Keeps the page itself a server component; only this shell is a client component.
 *
 * Props:
 *  recipeId         — recipe's _id, forwarded to the like API
 *  initialLikes     — like count from server data
 *  initialLiked     — user-specific state (would come from session in real app)
 *  initialFavorited — user-specific state
 *  isPremium        — recipe gating
 *  isPurchased      — user purchase state
 *  price            — display price string
 */
const RecipeDetailClient = ({
  recipeId,
  initialLikes,
  initialLiked,
  initialFavorited,
  isPremium,
  isPurchased,
  price,
}) => {
  const [reportOpen, setReportOpen] = useState(false);
  const { user } = useClientSession();
  const userId = user?.id ?? null;

  const handleReport = () => setReportOpen(true);
  const handleCloseReport = () => setReportOpen(false);
  const handleSubmitReport = (reason, detail) => {
    // TODO: wire to API endpoint
    console.log("Report submitted:", { reason, detail });
  };

  return (
    <>
      <RecipeActionRow
        initialLikes={initialLikes}
        initialLiked={initialLiked}
        initialFavorited={initialFavorited}
        isPremium={isPremium}
        isPurchased={isPurchased}
        price={price}
        onReport={handleReport}
        userId={userId}
        recipeId={recipeId}
      />

      <ReportModal
        open={reportOpen}
        onClose={handleCloseReport}
        onSubmit={handleSubmitReport}
      />
    </>
  );
};

export default RecipeDetailClient;
