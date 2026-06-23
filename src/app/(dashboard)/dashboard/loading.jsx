import StatCardsSkeleton from "@/components/dashboard/StatCardsSkeleton";

/**
 * Dashboard overview — only the stat cards are API-fetched.
 * The page header ("Overview" title + subtitle) is static and renders instantly.
 */
const DashboardOverviewLoading = () => (
  <div className="px-5 md:px-8 py-8">
    {/* Static page header — not skeletal */}
    <div className="mb-6">
      <div className="h-3.5 w-20 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-64 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    {/* Stat cards — API-fetched */}
    <StatCardsSkeleton count={4} dense={false} />
  </div>
);

export default DashboardOverviewLoading;
