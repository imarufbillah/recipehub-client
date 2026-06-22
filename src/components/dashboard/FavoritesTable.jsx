"use client";

import { useState } from "react";
import { BookmarkX } from "lucide-react";
import { toast } from "sonner";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { removeFromFavorites } from "@/lib/apiClient.client";

const COLUMNS = [
  {
    key: "recipeName",
    label: "Recipe",
    hrefFn: (row) => `/recipes/${row.id}`,
  },
  { key: "author", label: "Author", width: "w-32" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "addedAt", label: "Saved", width: "w-28" },
  { key: "plan", label: "Plan", width: "w-20", badge: true },
];

const FavoritesTable = ({ rows: initialRows, userId }) => {
  const [rows, setRows] = useState(initialRows);

  const handleRemove = async (row) => {
    // Optimistic removal
    setRows((prev) => prev.filter((r) => r.id !== row.id));

    try {
      await removeFromFavorites({ userId, recipeId: row.id });
      toast.success(`Removed "${row.recipeName}" from favorites.`);
    } catch {
      // Restore on failure
      setRows((prev) => {
        // Re-insert at original position if possible, otherwise append
        const idx = initialRows.findIndex((r) => r.id === row.id);
        const next = [...prev];
        next.splice(idx, 0, row);
        return next;
      });
      toast.error("Couldn't remove favorite. Please try again.");
    }
  };

  const actions = [
    {
      icon: BookmarkX,
      label: "Remove from favorites",
      onClick: handleRemove,
      variant: "destructive",
    },
  ];

  return (
    <DashboardTable
      columns={COLUMNS}
      rows={rows}
      actions={actions}
      pageSize={10}
    />
  );
};

export default FavoritesTable;
