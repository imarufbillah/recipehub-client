import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Reports (admin) — heading and subtitle are static.
 * Only the table rows are API-fetched.
 * Columns: Reported Recipe | Reporter | Reason | Date | Status + Actions
 */
const ReportsLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Reports
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        Review user-submitted reports and take action.
      </p>
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={10} hasActions />
  </div>
);

export default ReportsLoading;
