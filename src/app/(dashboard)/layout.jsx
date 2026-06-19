import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getServerSession } from "@/lib/session";

const DashboardLayout = async ({ children }) => {
  const { user } = await getServerSession();
  const role = user.role;

  return (
    <div className="min-h-screen bg-background">
      {/* Header: contains sidebar (desktop fixed + mobile overlay) */}
      <DashboardHeader title="Dashboard" role={role} user={user} />

      {/* Main content — offset left on desktop to clear the fixed sidebar */}
      <main className="lg:pl-60 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
