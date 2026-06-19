import UserOverview from "@/components/dashboard/UserOverview";
import AdminOverview from "@/components/dashboard/AdminOverview";
import { getServerSession } from "@/lib/session";

/**
 * Dashboard overview page — server component.
 *
 * Reads the real session from getServerSession (same call the layout makes),
 * derives stats from the live user object, and renders the role-appropriate
 * overview component.
 *
 * User fields used: role, plan, recipes (recipe count stored on user doc).
 * Admin stats come from the platform aggregate — left as placeholder values
 * until a real API endpoint exists.
 */
const OverviewPage = async () => {
  const { user } = await getServerSession();
  const role = user?.role ?? "user";

  const userStats = {
    totalRecipes: user?.recipes ?? 0,
    totalFavorites: 0, // TODO: fetch from API
    totalLikes: 0, // TODO: fetch from API
    isPremium: user?.plan === "premium",
  };

  // TODO: replace with real platform aggregate API call
  const adminStats = {
    totalUsers: 0,
    totalRecipes: 0,
    premiumMembers: 0,
    totalReports: 0,
  };

  return (
    <div className="px-5 md:px-8 py-8">
      {/* Section header — sans, Admin Mode rules */}
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Overview
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          {role === "admin"
            ? "Platform-wide statistics at a glance."
            : `Welcome back, ${user?.name?.split(" ")[0] ?? "there"}. Here's a summary of your activity.`}
        </p>
      </div>

      {role === "admin" ? (
        <AdminOverview stats={adminStats} />
      ) : (
        <UserOverview stats={userStats} />
      )}
    </div>
  );
};

export default OverviewPage;
