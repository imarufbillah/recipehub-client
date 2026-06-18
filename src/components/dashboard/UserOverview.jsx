import { BookOpen, Heart, ThumbsUp, Crown } from "lucide-react";
import StatCard from "./StatCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * User overview — 4 stat cards at user density (dense=false).
 *
 * Cards: Total Recipes · Total Favorites · Total Likes Received · Premium Status
 *
 * Premium Status card has two distinct visual treatments:
 *  - Is premium: quiet accent-tinted "Premium" badge inside the card slot.
 *  - Not premium: ghost "Upgrade" CTA linking to a purchase page.
 *
 * Props:
 *  stats — {
 *    totalRecipes: number,
 *    totalFavorites: number,
 *    totalLikes: number,
 *    isPremium: boolean,
 *  }
 */
const UserOverview = ({
  stats = {
    totalRecipes: 12,
    totalFavorites: 47,
    totalLikes: 318,
    isPremium: false,
  },
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        label="Total Recipes"
        value={stats.totalRecipes.toLocaleString()}
        icon={BookOpen}
        iconColor="primary"
      />

      <StatCard
        label="Total Favorites"
        value={stats.totalFavorites.toLocaleString()}
        icon={Heart}
        iconColor="primary"
      />

      <StatCard
        label="Likes Received"
        value={stats.totalLikes.toLocaleString()}
        icon={ThumbsUp}
        iconColor="accent"
        iconColor-note="accent is the second color — used once across the 4 cards"
      />

      {/* ── Premium status — distinct treatment per state ── */}
      <StatCard
        label="Premium Status"
        value={stats.isPremium ? "Active" : "Free"}
        icon={Crown}
        iconColor={stats.isPremium ? "accent" : "muted"}
      >
        {stats.isPremium ? (
          /* Premium — quiet accent badge confirmation */
          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-[11px] uppercase tracking-[0.08em] font-medium font-sans px-2.5 py-1 rounded-sm">
            <Crown className="size-3 shrink-0" aria-hidden />
            Premium Member
          </span>
        ) : (
          /* Not premium — ghost upgrade prompt */
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Link href="/dashboard/upgrade">Upgrade to Premium →</Link>
          </Button>
        )}
      </StatCard>
    </div>
  );
};

export default UserOverview;
