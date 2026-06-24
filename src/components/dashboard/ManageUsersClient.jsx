"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Ban, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { blockUser, unblockUser, deleteUser } from "@/lib/apiClient.client";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "joined", label: "Joined", width: "w-28" },
  { key: "recipes", label: "Recipes", width: "w-20" },
  { key: "status", label: "Status", width: "w-24", badge: true },
  { key: "plan", label: "Plan", width: "w-20", badge: true },
];

const ManageUsersClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState(null); // row | null
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  const handleBlockToggle = async (row) => {
    const isBlocked = row.status === "Blocked";
    try {
      if (isBlocked) {
        await unblockUser(row.id);
        toast.success(`${row.name} unblocked.`);
      } else {
        await blockUser(row.id);
        toast.success(`${row.name} blocked.`);
      }
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? { ...r, status: isBlocked ? "Active" : "Blocked" }
            : r,
        ),
      );
      refresh();
    } catch (err) {
      toast.error(err?.message ?? "Action failed. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteUser(deleteTarget.id);
      toast.success(`${deleteTarget.name} deleted.`);
      setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      refresh();
    } catch (err) {
      toast.error(err?.message ?? "Delete failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const actions = [
    {
      // Single button — icon and label flip based on current row status
      iconFn: (row) => (row.status === "Blocked" ? ShieldCheck : Ban),
      labelFn: (row) =>
        row.status === "Blocked" ? "Unblock user" : "Block user",
      // key must be stable so React doesn't remount the button
      label: "block-toggle",
      onClick: handleBlockToggle,
    },
    {
      icon: Trash2,
      label: "Delete user",
      onClick: (row) => setDeleteTarget(row),
      variant: "destructive",
    },
  ];

  return (
    <>
      <DashboardTable
        columns={COLUMNS}
        rows={rows}
        actions={actions}
        pageSize={20}
        serverPagination={{ totalPages, currentPage }}
        onPageChange={(p) => router.push(`/dashboard/manage-users?page=${p}`)}
      />

      {/* ── Delete confirmation modal ── */}
      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-[22px] tracking-tight">
              Delete user
            </DialogTitle>
            <DialogDescription className="text-[14px] font-sans text-muted-foreground mt-1">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>
              ? All their data will be permanently removed. This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2 gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageUsersClient;
