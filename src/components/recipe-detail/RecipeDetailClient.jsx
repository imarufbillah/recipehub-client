"use client";

import { useState } from "react";
import RecipeActionRow from "./RecipeActionRow";
import ReportModal from "./ReportModal";
import { useClientSession } from "@/hooks/useClientSession";
import { createReport } from "@/lib/apiClient.client";

const RecipeDetailClient = ({
  recipeId,
  recipeName,
  recipeSlug,
  priceAmount,
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
        recipeName={recipeName}
        recipeSlug={recipeSlug}
        priceAmount={priceAmount}
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
