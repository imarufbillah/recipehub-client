import { getAllReports } from "@/lib/apiClient.server";
import ManageReportsClient from "@/components/dashboard/ManageReportsClient";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ReportsPage = async ({ searchParams }) => {
  const page = Number((await searchParams).page ?? 1);
  const data = await getAllReports(page, 20);

  const rows = (data.reports ?? []).map((r) => ({
    id: r._id,
    recipe: r.recipeName ?? r.recipe ?? "—",
    reporter: r.reporterName ?? r.reporter ?? "—",
    reason: r.reason ?? "—",
    date: r.createdAt ? formatDate(r.createdAt) : "—",
    status: r.status === "resolved" ? "Resolved" : "Open",
  }));

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Reports
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Review user-submitted reports and take action.
        </p>
      </div>
      <ManageReportsClient
        initialRows={rows}
        totalPages={data.totalPages ?? 1}
        currentPage={data.page ?? 1}
      />
    </div>
  );
};

export default ReportsPage;
