import { BookOpen, Heart, ThumbsUp, Crown } from "lucide-react";
import StatCard from "./StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <Badge className="bg-accent/10 text-accent border-transparent rounded-sm text-[11px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2.5 py-1 gap-1.5">
            <Crown className="size-3 shrink-0" aria-hidden />
            Premium Member
          </Badge>
        ) : (
          /* Not premium — ghost upgrade prompt */
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Link href="/premium">Upgrade to Premium →</Link>
          </Button>
        )}
      </StatCard>
    </div>
  );
};

export default UserOverview;
