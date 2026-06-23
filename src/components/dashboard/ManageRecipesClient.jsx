"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DashboardTable from "@/components/dashboard/DashboardTable";
import {
  deleteRecipeAdmin,
  toggleFeaturedRecipe,
} from "@/lib/apiClient.client";

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "author", label: "Author", width: "w-36" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "submitted", label: "Submitted", width: "w-28" },
  { key: "likes", label: "Likes", width: "w-16" },
  { key: "status", label: "Status", width: "w-28", badge: true },
];

const ManageRecipesClient = ({ initialRows, totalPages, currentPage }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);

  const refresh = () => startTransition(() => router.refresh());

  const handleToggleFeatured = async (row) => {
    const next = row.status !== "Featured";
    try {
      await toggleFeaturedRecipe(row.id, next);
      toast.success(
        next
          ? `"${row.name}" marked as featured.`
          : `"${row.name}" unfeatured.`,
      );
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id ? { ...r, status: next ? "Featured" : "Active" } : r,
        ),
      );
      refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.name}"? This cannot be undone.`)) return;
    try {
      await deleteRecipeAdmin(row.id);
      toast.success(`"${row.name}" deleted.`);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      refresh();
    } catch {
      toast.error("Delete failed. Please try again.");
    }
  };

  const actions = [
    {
      icon: Star,
      label: "Toggle featured",
      onClick: handleToggleFeatured,
    },
    {
      icon: Trash2,
      label: "Delete recipe",
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
      onPageChange={(p) => router.push(`/dashboard/manage-recipes?page=${p}`)}
    />
  );
};

export default ManageRecipesClient;
