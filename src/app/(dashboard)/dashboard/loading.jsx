import StatCardsSkeleton from "@/components/dashboard/StatCardsSkeleton";

/**
 * Dashboard overview — only the stat cards and subtitle are API-fetched.
 * The "Overview" heading is static and renders instantly.
 */
const DashboardOverviewLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Overview
      </h2>
      {/* Subtitle contains user name / role — API-derived */}
      <div className="h-3 w-64 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    {/* Stat cards — all values are API-fetched */}
    <StatCardsSkeleton count={4} dense={false} />
  </div>
);

export default DashboardOverviewLoading;
