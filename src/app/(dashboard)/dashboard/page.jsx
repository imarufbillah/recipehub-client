import UserOverview from "@/components/dashboard/UserOverview";
import AdminOverview from "@/components/dashboard/AdminOverview";
import { getServerSession } from "@/lib/session";
import {
  getTotalUsers,
  getTotalRecipes,
  getTotalPremiumMembers,
  getTotalReports,
} from "@/lib/apiClient.server";

const OverviewPage = async () => {
  const { user } = await getServerSession();
  const role = user?.role ?? "user";

  const userStats = {
    totalRecipes: user?.recipes ?? 0,
    totalFavorites: user?.totalFavorites ?? 0,
    totalLikes: user?.totalLikes ?? 0,
    isPremium: user?.plan === "premium",
  };

  let adminStats = {
    totalUsers: 0,
    totalRecipes: 0,
    premiumMembers: 0,
    totalReports: 0,
  };

  if (role === "admin") {
    const [usersRes, recipesRes, premiumRes, reportsRes] =
      await Promise.allSettled([
        getTotalUsers(),
        getTotalRecipes(),
        getTotalPremiumMembers(),
        getTotalReports(),
      ]);

    adminStats = {
      totalUsers:
        usersRes.status === "fulfilled" ? (usersRes.value.totalUsers ?? 0) : 0,
      totalRecipes:
        recipesRes.status === "fulfilled"
          ? (recipesRes.value.totalRecipes ?? 0)
          : 0,
      premiumMembers:
        premiumRes.status === "fulfilled"
          ? (premiumRes.value.totalPremiumMembers ?? 0)
          : 0,
      totalReports:
        reportsRes.status === "fulfilled"
          ? (reportsRes.value.totalReports ?? 0)
          : 0,
    };
  }

  return (
    <div className="px-5 md:px-8 py-8">
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
