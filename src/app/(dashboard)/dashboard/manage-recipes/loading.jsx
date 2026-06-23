import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Manage Recipes (admin) — table skeleton.
 * Columns: Recipe | Author | Category | Submitted | Likes | Status | Featured + Actions
 */
const ManageRecipesLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <div className="h-3.5 w-32 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-56 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <DashboardTableSkeleton colCount={7} rowCount={10} hasActions />
  </div>
);

export default ManageRecipesLoading;
