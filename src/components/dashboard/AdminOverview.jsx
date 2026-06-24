import { Users, BookOpen, Crown, Flag } from "lucide-react";
import StatCard from "./StatCard";

const AdminOverview = ({
  stats = {
    totalUsers: 0,
    totalRecipes: 0,
    premiumMembers: 0,
    totalReports: 0,
    pendingReports: 0,
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

      {/* Reports — pending count from API signals items needing attention */}
      <StatCard
        label="Total Reports"
        value={stats.totalReports.toLocaleString()}
        icon={Flag}
        iconColor="muted"
        dense
      >
        {stats.pendingReports > 0 && (
          <span className="text-[11px] font-sans text-destructive uppercase tracking-[0.06em] font-medium">
            {stats.pendingReports} pending review
          </span>
        )}
      </StatCard>
    </div>
  );
};

export default AdminOverview;
