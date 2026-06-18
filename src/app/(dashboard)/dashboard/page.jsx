import UserOverview from "@/components/dashboard/UserOverview";
import AdminOverview from "@/components/dashboard/AdminOverview";

/**
 * Dashboard overview page — role-conditional content.
 *
 * Static mock role — replace with real session check when better-auth
 * is wired. The MOCK_USER.role in layout.jsx is the single source of truth
 * for the current session; this page reads from the same mock constant.
 *
 * Admin Mode density differences are handled inside AdminOverview (dense=true
 * on StatCard) — the page itself is identical in structure.
 */

// Mirrors layout.jsx MOCK_USER.role — replace both with session when ready
const ROLE = "user"; // swap to "admin" to preview

const USER_STATS = {
  totalRecipes: 12,
  totalFavorites: 47,
  totalLikes: 318,
  isPremium: false,
};

const ADMIN_STATS = {
  totalUsers: 3_842,
  totalRecipes: 12_107,
  premiumMembers: 924,
  totalReports: 17,
};

const OverviewPage = () => {
  return (
    <div className="px-5 md:px-8 py-8">
      {/* Section header — sans, Admin Mode rules */}
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Overview
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          {ROLE === "admin"
            ? "Platform-wide statistics at a glance."
            : "A summary of your activity on RecipeHub."}
        </p>
      </div>

      {ROLE === "admin" ? (
        <AdminOverview stats={ADMIN_STATS} />
      ) : (
        <UserOverview stats={USER_STATS} />
      )}
    </div>
  );
};

export default OverviewPage;
