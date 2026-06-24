import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * Manage Users (admin) — heading and subtitle are static.
 * Only the table rows are API-fetched.
 * Columns: Name | Email | Joined | Recipes | Status | Plan + Actions
 */
const ManageUsersLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Manage Users
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        View, block, and remove user accounts.
      </p>
    </div>

    <DashboardTableSkeleton colCount={6} rowCount={10} hasActions />
  </div>
);

export default ManageUsersLoading;
