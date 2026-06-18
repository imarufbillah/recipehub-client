import { Users, BookOpen, Crown, Flag } from "lucide-react";
import StatCard from "./StatCard";

/**
 * Admin overview — 4 stat cards at admin density (dense=true).
 *
 * Admin Mode: tighter padding, smaller numeral scale — admin screens
 * prioritise scanning multiple data points over single-stat impact.
 * Same tokens, same typography families — it must still feel like RecipeHub.
 *
 * Cards: Total Users · Total Recipes · Premium Members · Total Reports
 *
 * Props:
 *  stats — {
 *    totalUsers: number,
 *    totalRecipes: number,
 *    premiumMembers: number,
 *    totalReports: number,
 *  }
 */
const AdminOverview = ({
  stats = {
    totalUsers: 3_842,
    totalRecipes: 12_107,
    premiumMembers: 924,
    totalReports: 17,
  },
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={Users}
        iconColor="primary"
        dense
      />

      <StatCard
        label="Total Recipes"
        value={stats.totalRecipes.toLocaleString()}
        icon={BookOpen}
        iconColor="primary"
        dense
      />

      <StatCard
        label="Premium Members"
        value={stats.premiumMembers.toLocaleString()}
        icon={Crown}
        iconColor="accent"
        dense
      />

      {/* Reports — destructive tint signals this needs attention */}
      <StatCard
        label="Total Reports"
        value={stats.totalReports.toLocaleString()}
        icon={Flag}
        iconColor="muted"
        dense
      >
        {stats.totalReports > 0 && (
          <span className="text-[11px] font-sans text-destructive uppercase tracking-[0.06em] font-medium">
            {stats.totalReports} pending review
          </span>
        )}
      </StatCard>
    </div>
  );
};

export default AdminOverview;
