import { getAllUsers } from "@/lib/apiClient.server";
import ManageUsersClient from "@/components/dashboard/ManageUsersClient";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ManageUsersPage = async ({ searchParams }) => {
  const page = Number((await searchParams).page ?? 1);

  let data = { users: [], totalPages: 1, page: 1 };
  try {
    data = await getAllUsers(page, 20);
  } catch (err) {
    console.error("[ManageUsersPage]", err?.message);
  }

  const rows = (data.users ?? []).map((u) => ({
    id: u._id,
    name: u.name,
    email: u.email,
    joined: formatDate(u.createdAt),
    recipes: u.recipes,
    status: u.isBlocked ? "Blocked" : "Active",
    plan: u.plan === "premium" ? "Premium" : "Free",
  }));

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Manage Users
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          View, block, and remove user accounts.
        </p>
      </div>
      <ManageUsersClient
        initialRows={rows}
        totalPages={data.totalPages ?? 1}
        currentPage={data.page ?? 1}
      />
    </div>
  );
};

export default ManageUsersPage;
