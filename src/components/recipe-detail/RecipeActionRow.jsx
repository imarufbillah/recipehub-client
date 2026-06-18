"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, Flag, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Recipe action row — client component.
 *
 * Left group: Like (heart + count) + Favorite (bookmark) — engagement actions.
 * Right group: Report (ghost, quieter visual weight) + Purchase button area.
 *
 * Purchase states:
 *  - Not purchased + isPremium: primary-filled button with lock icon + price.
 *  - Purchased / free: quiet confirmation chip (no dominant button).
 *
 * Motion: brief scale-pulse (max 1.1, 150ms ease-out) on Like/Favorite toggle.
 * Per design system: no bounce, max 2 properties, 250–450ms for UI transitions.
 *
 * Props:
 *  initialLikes      — starting like count (number)
 *  initialLiked      — whether current user has liked (boolean)
 *  initialFavorited  — whether current user has favorited (boolean)
 *  isPremium         — recipe requires purchase
 *  isPurchased       — user has already purchased
 *  price             — display string e.g. "$4.99"
 *  onReport          — callback to open the report modal
 *  onPurchase        — callback when buy button is clicked
 */

const IconPulse = ({ children, trigger }) => (
  <motion.span
    key={trigger ? "active" : "inactive"}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 0.15, ease: "easeOut" }}
    className="inline-flex"
  >
    {children}
  </motion.span>
);

const RecipeActionRow = ({
  initialLikes = 0,
  initialLiked = false,
  initialFavorited = false,
  isPremium = false,
  isPurchased = false,
  price = "$4.99",
  onReport,
  onPurchase,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [favorited, setFavorited] = useState(initialFavorited);
  const [likePulse, setLikePulse] = useState(0);
  const [favPulse, setFavPulse] = useState(0);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
    setLikePulse((n) => n + 1);
  };

  const handleFavorite = () => {
    setFavorited((f) => !f);
    setFavPulse((n) => n + 1);
  };

  const showPurchaseButton = isPremium && !isPurchased;
  const showConfirmationChip = !isPremium || isPurchased;

  return (
    <div className="flex items-center justify-between gap-4 py-5 border-y border-border">
      {/* ── Left: engagement actions ── */}
      <div className="flex items-center gap-1">
        {/* Like button */}
        <button
          type="button"
          onClick={handleLike}
          aria-label={liked ? "Unlike this recipe" : "Like this recipe"}
          aria-pressed={liked}
          className={cn(
            "group inline-flex items-center gap-2 px-3 py-2 rounded-md",
            "text-[13px] font-sans font-medium transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            liked
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <IconPulse trigger={likePulse}>
            <Heart
              className={cn(
                "size-4 transition-all duration-200",
                liked ? "fill-primary stroke-primary" : "stroke-current",
              )}
              aria-hidden
            />
          </IconPulse>
          <span className="tabular-nums">{likeCount.toLocaleString()}</span>
        </button>

        {/* Hairline vertical divider */}
        <span className="w-px h-4 bg-border mx-1" aria-hidden />

        {/* Favorite / bookmark button */}
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Save to favorites"}
          aria-pressed={favorited}
          className={cn(
            "group inline-flex items-center gap-2 px-3 py-2 rounded-md",
            "text-[13px] font-sans font-medium transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            favorited
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <IconPulse trigger={favPulse}>
            <Bookmark
              className={cn(
                "size-4 transition-all duration-200",
                favorited ? "fill-primary stroke-primary" : "stroke-current",
              )}
              aria-hidden
            />
          </IconPulse>
          <span className="hidden sm:inline">
            {favorited ? "Saved" : "Save"}
          </span>
        </button>
      </div>

      {/* ── Right: report + purchase ── */}
      <div className="flex items-center gap-3">
        {/* Report — visually quieter than engagement actions */}
        {onReport && (
          <button
            type="button"
            onClick={onReport}
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-2 rounded-md",
              "text-[11px] uppercase tracking-[0.06em] font-medium font-sans",
              "text-muted-foreground/60 hover:text-muted-foreground",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label="Report this recipe"
          >
            <Flag className="size-3 shrink-0" aria-hidden />
            <span className="hidden sm:inline">Report</span>
          </button>
        )}

        {/* Purchase area */}
        <AnimatePresence mode="wait">
          {showPurchaseButton ? (
            <motion.div
              key="purchase"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Button
                variant="default"
                size="sm"
                onClick={onPurchase}
                className="gap-2 font-sans text-[13px] font-medium px-4"
              >
                <Lock className="size-3.5 shrink-0" aria-hidden />
                Unlock Recipe — {price}
              </Button>
            </motion.div>
          ) : showConfirmationChip ? (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Quiet confirmation chip — Badge secondary, no dominant visual weight */}
              <Badge className="bg-secondary text-secondary-foreground border-transparent rounded-md text-[11px] uppercase tracking-[0.06em] font-medium font-sans h-auto px-3 py-1.5 gap-1.5">
                <Check className="size-3 shrink-0" aria-hidden />
                {isPremium ? "Purchased" : "Free Recipe"}
              </Badge>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipeActionRow;
