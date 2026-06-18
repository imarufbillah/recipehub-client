import DashboardHeader from "@/components/dashboard/DashboardHeader";

/**
 * Dashboard layout — shared shell for all /dashboard/* routes.
 *
 * No public Navbar or Footer — dashboard chrome is entirely self-contained.
 * DashboardHeader owns the mobile sidebar trigger, so the sidebar renders
 * inside the header component (co-located state pattern).
 *
 * Desktop layout: 240px fixed sidebar (rendered inside DashboardHeader's
 * DashboardSidebar) + flex-1 main content offset by lg:pl-60.
 *
 * Static placeholder role/user — replace with real session data when
 * better-auth is wired up.
 */

const MOCK_USER = {
  name: "Elena Marsh",
  email: "elena@recipehub.com",
  avatarInitials: "EM",
  role: "user", // swap to "admin" to preview admin views
};

const DashboardLayout = ({ children }) => {
  const role = MOCK_USER.role;

  return (
    <div className="min-h-screen bg-background">
      {/* Header: contains sidebar (desktop fixed + mobile overlay) */}
      <DashboardHeader title="Dashboard" role={role} user={MOCK_USER} />

      {/* Main content — offset left on desktop to clear the fixed sidebar */}
      <main className="lg:pl-60 min-h-[calc(100vh-3.5rem)]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
