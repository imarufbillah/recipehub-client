import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Purchased — table skeleton.
 * Columns: Recipe | Author | Price | Date | Ref (mono) + Actions
 * Ref column is wider (mono transaction ID).
 */
const PurchasedLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <div className="h-3.5 w-24 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-44 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default PurchasedLoading;
