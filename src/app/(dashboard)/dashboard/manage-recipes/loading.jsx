import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Manage Recipes (admin) — heading and subtitle are static.
 * Only the table rows are API-fetched.
 * Columns: Recipe | Author | Category | Submitted | Likes | Status | Featured + Actions
 */
const ManageRecipesLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Manage Recipes
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        Feature or remove recipes from the platform.
      </p>
    </div>

    <DashboardTableSkeleton colCount={7} rowCount={10} hasActions />
  </div>
);

export default ManageRecipesLoading;
