import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Reports (admin) — table skeleton.
 * Columns: Reported Recipe | Reporter | Reason | Date | Status + Actions
 */
const ReportsLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <div className="h-3.5 w-20 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-60 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={10} hasActions />
  </div>
);

export default ReportsLoading;
