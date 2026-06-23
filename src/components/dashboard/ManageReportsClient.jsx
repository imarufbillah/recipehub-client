"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, Ban } from "lucide-react";
import { toast } from "sonner";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { reviewReport } from "@/lib/apiClient.client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  { key: "recipe", label: "Reported Recipe" },
  { key: "reporter", label: "Reporter", width: "w-36" },
  { key: "reason", label: "Reason", width: "w-40" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "status", label: "Status", width: "w-28", badge: true },
];

const ManageReportsClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  // Modal state: { type: "resolve" | "dismiss", row } | null
  const [modal, setModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  const openModal = (type, row) => setModal({ type, row });
  const closeModal = () => setModal(null);

  const handleResolve = async () => {
    const { row } = modal;
    setIsSubmitting(true);
    try {
      await reviewReport(row.id, { action: "resolve" });
      toast.success("Report resolved — recipe has been deleted.");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "Resolved" } : r)),
      );
      closeModal();
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = async () => {
    const { row } = modal;
    setIsSubmitting(true);
    try {
      await reviewReport(row.id, { action: "dismiss" });
      toast.success("Report dismissed.");
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: "Dismissed" } : r)),
      );
      closeModal();
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const actions = [
    {
      icon: Check,
      label: "Resolve & delete recipe",
      onClick: (row) => openModal("resolve", row),
      disabledFn: (row) => row.status !== "Pending",
    },
    {
      icon: X,
      label: "Dismiss report",
      onClick: (row) => openModal("dismiss", row),
      variant: "destructive",
      disabledFn: (row) => row.status !== "Pending",
    },
  ];

  const isResolve = modal?.type === "resolve";

  return (
    <>
      <DashboardTable
        columns={COLUMNS}
        rows={rows}
        actions={actions}
        pageSize={20}
        serverPagination={{ totalPages, currentPage }}
        onPageChange={(p) => router.push(`/dashboard/reports?page=${p}`)}
      />

      <Dialog open={!!modal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent showCloseButton={!isSubmitting}>
          <DialogHeader>
            <div
              className={`mb-1 flex size-9 items-center justify-center rounded-lg ${
                isResolve
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isResolve ? (
                <Trash2 className="size-4" aria-hidden />
              ) : (
                <Ban className="size-4" aria-hidden />
              )}
            </div>
            <DialogTitle className="text-[15px] font-sans font-semibold text-foreground">
              {isResolve ? "Resolve report & delete recipe" : "Dismiss report"}
            </DialogTitle>
            <DialogDescription className="text-[13px] font-sans text-muted-foreground">
              {isResolve ? (
                <>
                  This will permanently delete{" "}
                  <span className="font-medium text-foreground">
                    {modal?.row.recipe}
                  </span>{" "}
                  and mark the report as resolved. This action cannot be undone.
                </>
              ) : (
                <>
                  This will mark the report for{" "}
                  <span className="font-medium text-foreground">
                    {modal?.row.recipe}
                  </span>{" "}
                  as dismissed. No action will be taken on the recipe.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant={isResolve ? "destructive" : "default"}
              size="sm"
              onClick={isResolve ? handleResolve : handleDismiss}
              disabled={isSubmitting || isPending}
            >
              {isSubmitting
                ? isResolve
                  ? "Deleting…"
                  : "Dismissing…"
                : isResolve
                  ? "Delete recipe"
                  : "Dismiss report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageReportsClient;
