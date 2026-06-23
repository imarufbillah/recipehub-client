import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Manage Users (admin) — table skeleton.
 * Columns: Name | Email | Joined | Recipes | Status | Plan + Actions
 */
const ManageUsersLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <div className="h-3.5 w-28 bg-muted rounded-sm animate-pulse" />
      <div className="h-3 w-52 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <DashboardTableSkeleton colCount={6} rowCount={10} hasActions />
  </div>
);

export default ManageUsersLoading;
