import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/session";
import { getFavoritesByUserId } from "@/lib/apiClient";
import FavoritesTable from "@/components/dashboard/FavoritesTable";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const normaliseFavorites = (raw = []) =>
  raw.map((item) => ({
    id: item.recipeId,
    recipeName: item.recipeName,
    author: item.author ?? "—",
    category: item.category ?? "—",
    addedAt: formatDate(item.addedAt),
    // badge column — reuses StatusBadge "premium" / "free" styles from DashboardTable
    plan: item.isPremium ? "Premium" : "Free",
  }));

const FavoritesPage = async () => {
  const { user } = await getServerSession();

  let rows = [];
  try {
    const data = await getFavoritesByUserId(user.id);
    rows = normaliseFavorites(
      Array.isArray(data) ? data : (data?.favorites ?? []),
    );
  } catch {
    rows = [];
  }

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Favorites
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Recipes you&apos;ve saved for later.
        </p>
      </div>

      {rows.length > 0 ? (
        <FavoritesTable rows={rows} userId={user.id} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Bookmark
            className="size-8 text-muted-foreground/40 stroke-[1.25]"
            aria-hidden
          />
          <h3 className="font-heading text-[20px] leading-snug tracking-[-0.01em] text-foreground">
            No saved recipes yet
          </h3>
          <p className="text-[14px] font-sans text-muted-foreground max-w-xs">
            Browse the collection and bookmark recipes you want to come back to.
          </p>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mt-1 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Link href="/recipes">Browse Recipes →</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
