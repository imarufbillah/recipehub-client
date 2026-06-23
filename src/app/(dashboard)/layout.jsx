import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getServerSession } from "@/lib/session";

const DashboardLayout = async ({ children }) => {
  let session = null;
  try {
    session = await getServerSession();
  } catch {
    // Session fetch failed (e.g. auth service unreachable) — treat as logged out
  }

  const user = session?.user ?? null;

  // Proxy handles the typical redirect, but guard here as a fallback so the
  // layout never crashes trying to read role/name off a null user.
  if (!user) {
    redirect("/login");
  }

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
