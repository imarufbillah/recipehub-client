import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Purchased — heading and subtitle are static.
 * Only the table rows are API-fetched.
 * Columns: Recipe | Author | Price | Date | Ref (mono) + Actions
 */
const PurchasedLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Purchased
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        Premium recipes you&apos;ve unlocked.
      </p>
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default PurchasedLoading;
