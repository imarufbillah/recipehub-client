"use client";

import { useState } from "react";
import RecipeActionRow from "./RecipeActionRow";
import ReportModal from "./ReportModal";
import { useClientSession } from "@/hooks/useClientSession";
import { createReport } from "@/lib/apiClient";

/**
 * Thin client island — owns modal open/close state and wires the report
 * callback between RecipeActionRow and ReportModal.
 * Keeps the page itself a server component; only this shell is a client component.
 *
 * Props:
 *  recipeId          — recipe's _id, forwarded to like/favorite/report APIs
 *  initialLikes      — like count from server data
 *  initialLiked      — whether current user has liked (from server)
 *  initialFavorited  — whether current user has favorited (from server)
 *  initialReported   — whether current user has already reported (from server)
 *  isPremium         — recipe gating
 *  isPurchased       — user purchase state
 *  price             — display price string
 */
const RecipeDetailClient = ({
  recipeId,
  initialLikes,
  initialLiked,
  initialFavorited,
  initialReported = false,
  isPremium,
  isPurchased,
  price,
}) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [hasReported, setHasReported] = useState(initialReported);
  const { user } = useClientSession();
  const userId = user?.id ?? null;

  const handleReport = () => setReportOpen(true);
  const handleCloseReport = () => setReportOpen(false);

  const handleSubmitReport = async (reason, additionalContext) => {
    if (!userId) return;

    await createReport({
      userId,
      recipeId,
      reason,
      ...(additionalContext ? { additionalContext } : {}),
    });

    setHasReported(true);
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
        hasReported={hasReported}
      />

      <ReportModal
        open={reportOpen}
        onClose={handleCloseReport}
        onSubmit={handleSubmitReport}
        initialReported={hasReported}
      />
    </>
  );
};

export default RecipeDetailClient;
