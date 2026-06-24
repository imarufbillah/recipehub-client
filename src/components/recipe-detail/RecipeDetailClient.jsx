"use client";

import { useState } from "react";
import RecipeActionRow from "./RecipeActionRow";
import ReportModal from "./ReportModal";
import { useClientSession } from "@/hooks/useClientSession";
import { createReport } from "@/lib/apiClient.client";
import useAuthGuard from "@/hooks/useAuthGuard";

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
  isOwner = false,
  isAdmin = false,
  price,
}) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [hasReported, setHasReported] = useState(initialReported);
  const { user } = useClientSession();
  const userId = user?.id ?? null;
  const guard = useAuthGuard();

  const handleReport = () => guard(() => setReportOpen(true));
  const handleCloseReport = () => setReportOpen(false);

  const handleSubmitReport = async (reason, additionalContext) => {
    if (!userId) return;

    await createReport({
      userId,
      reporterName: user.name,
      recipeId,
      recipeName,
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
        isOwner={isOwner}
        isAdmin={isAdmin}
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
