"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Pencil, Trash2 } from "lucide-react";
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
import { deleteRecipe, toggleFeaturedRecipe } from "@/lib/apiClient.client";
import { cn } from "@/lib/utils";

// ─── Featured star cell ───────────────────────────────────────────────────────

const FeaturedCell = ({ isFeatured }) => (
  <Star
    className={cn(
      "size-3.5",
      isFeatured
        ? "fill-accent text-accent"
        : "fill-none text-muted-foreground/40",
    )}
    aria-label={isFeatured ? "Featured" : "Not featured"}
  />
);

// ─── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "author", label: "Author", width: "w-36" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "submitted", label: "Submitted", width: "w-28" },
  { key: "likes", label: "Likes", width: "w-16" },
  { key: "status", label: "Status", width: "w-28", badge: true },
  {
    key: "isFeatured",
    label: "Featured",
    width: "w-20",
    renderFn: (row) => <FeaturedCell isFeatured={row.isFeatured} />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ManageRecipesClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  // ── Feature toggle ─────────────────────────────────────────────────────────
  const handleToggleFeatured = async (row) => {
    const next = !row.isFeatured;
    try {
      await toggleFeaturedRecipe(row.id, next);
      toast.success(
        next ? `"${row.name}" featured.` : `"${row.name}" unfeatured.`,
      );
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, isFeatured: next } : r)),
      );
      refresh();
    } catch (err) {
      toast.error(err?.message ?? "Action failed. Please try again.");
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteRecipe(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted.`);
      setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
      refresh();
    } catch (err) {
      toast.error(err?.message ?? "Delete failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Actions ────────────────────────────────────────────────────────────────
  const actions = [
    {
      iconFn: (row) =>
        row.isFeatured
          ? (props) => (
              <Star
                {...props}
                className={cn(props.className, "fill-accent text-accent")}
              />
            )
          : Star,
      labelFn: (row) =>
        row.isFeatured ? "Unfeature recipe" : "Feature recipe",
      label: "feature-toggle",
      onClick: handleToggleFeatured,
    },
    {
      icon: Pencil,
      label: "Edit recipe",
      onClick: (row) =>
        router.push(`/dashboard/edit-recipe/${row.id}?from=manage-recipes`),
    },
    {
      icon: Trash2,
      label: "Delete recipe",
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
        onPageChange={(p) => router.push(`/dashboard/manage-recipes?page=${p}`)}
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
              Delete recipe
            </DialogTitle>
            <DialogDescription className="text-[14px] font-sans text-muted-foreground mt-1">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                &ldquo;{deleteTarget?.name}&rdquo;
              </span>
              ? This cannot be undone.
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

export default ManageRecipesClient;
