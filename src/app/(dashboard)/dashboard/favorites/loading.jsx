import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Favorites — table skeleton.
 * Columns: Recipe | Author | Category | Saved | Plan + Actions
 */
const FavoritesLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <div className="h-3.5 w-20 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-40 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default FavoritesLoading;
