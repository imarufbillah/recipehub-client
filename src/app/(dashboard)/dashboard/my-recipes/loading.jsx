import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * My Recipes page — skeleton for the table only.
 * The page header (title, subtitle, "Add Recipe" button) is static.
 * Columns: Recipe | Category | Cuisine | Prep Time | Status + Actions
 */
const MyRecipesLoading = () => (
  <div className="px-5 md:px-8 py-8">
    {/* Static header */}
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <div className="h-3.5 w-24 bg-muted rounded-sm animate-pulse" />
        <div className="h-3 w-48 bg-muted/60 rounded-sm animate-pulse mt-2" />
      </div>
      {/* "Add Recipe" button placeholder */}
      <div className="h-8 w-28 bg-muted rounded-md animate-pulse shrink-0" />
    </div>

    {/* Table — API-fetched */}
    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default MyRecipesLoading;
