"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { reviewReport } from "@/lib/apiClient.client";

const COLUMNS = [
  { key: "recipe", label: "Reported Recipe" },
  { key: "reporter", label: "Reporter", width: "w-36" },
  { key: "reason", label: "Reason", width: "w-40" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "status", label: "Status", width: "w-28", badge: true },
];

const ManageReportsClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  const refresh = () => startTransition(() => router.refresh());

  const handleResolve = async (row) => {
    if (row.status === "Resolved") return;
    try {
      await reviewReport(row.id, { action: "resolve" });
      toast.success("Report resolved.");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "Resolved" } : r)),
      );
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDismiss = async (row) => {
    if (row.status === "Dismissed") return;
    try {
      await reviewReport(row.id, { action: "dismiss" });
      toast.success("Report dismissed.");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "Dismissed" } : r)),
      );
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const actions = [
    {
      icon: Check,
      label: "Resolve report",
      onClick: handleResolve,
      disabledFn: (row) => row.status !== "Pending",
    },
    {
      icon: X,
      label: "Dismiss report",
      onClick: handleDismiss,
      variant: "destructive",
      disabledFn: (row) => row.status !== "Pending",
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
