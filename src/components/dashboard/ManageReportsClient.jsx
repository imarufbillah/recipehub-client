"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { deleteReport, resolveReport } from "@/lib/apiClient.client";

const COLUMNS = [
  { key: "recipe", label: "Reported Recipe" },
  { key: "reporter", label: "Reporter", width: "w-36" },
  { key: "reason", label: "Reason", width: "w-40" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "status", label: "Status", width: "w-24", badge: true },
];

const ManageReportsClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  const refresh = () => startTransition(() => router.refresh());

  const handleResolve = async (row) => {
    if (row.status === "Resolved") return;
    try {
      await resolveReport(row.id);
      toast.success("Report marked as resolved.");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "Resolved" } : r)),
      );
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDelete = async (row) => {
    if (!confirm("Dismiss this report? This cannot be undone.")) return;
    try {
      await deleteReport(row.id);
      toast.success("Report dismissed.");
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      refresh();
    } catch {
      toast.error("Delete failed. Please try again.");
    }
  };

  const actions = [
    {
      icon: Check,
      label: "Mark as resolved",
      onClick: handleResolve,
    },
    {
      icon: Trash2,
      label: "Dismiss report",
      onClick: handleDelete,
      variant: "destructive",
    },
  ];

  return (
    <DashboardTable
      columns={COLUMNS}
      rows={rows}
      actions={actions}
      pageSize={20}
      serverPagination={{ totalPages, currentPage }}
      onPageChange={(p) => router.push(`/dashboard/reports?page=${p}`)}
    />
  );
};

export default ManageReportsClient;
