import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Favorites — heading and subtitle are static.
 * Only the table rows are API-fetched.
 * Columns: Recipe | Author | Category | Saved | Plan + Actions
 */
const FavoritesLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Favorites
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        Recipes you&apos;ve saved for later.
      </p>
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default FavoritesLoading;
