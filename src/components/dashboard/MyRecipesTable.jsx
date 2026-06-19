"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";
import DeleteRecipeModal from "@/components/dashboard/DeleteRecipeModal";

const MyRecipesTable = ({ rows: initialRows }) => {
  const router = useRouter();

  // Local copy of rows so we can optimistically remove a deleted row
  const [rows, setRows] = useState(initialRows);

  // Modal state — null when closed, { id, name } when open
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDeleted = (deletedId) => {
    setRows((prev) => prev.filter((r) => r.id !== deletedId));
  };

  const columns = [
    {
      key: "recipeName",
      label: "Recipe",
      hrefFn: (row) => `/recipes/${row.id}`,
    },
    { key: "category", label: "Category", width: "w-28" },
    { key: "cuisine", label: "Cuisine", width: "w-28" },
    { key: "prepTime", label: "Prep Time", width: "w-24", mono: true },
    { key: "status", label: "Status", width: "w-24", badge: true },
  ];

  const actions = [
    {
      icon: Eye,
      label: "View recipe",
      onClick: (row) => router.push(`/recipes/${row.id}`),
    },
    {
      icon: Pencil,
      label: "Edit recipe",
      onClick: (row) => router.push(`/dashboard/edit-recipe/${row.id}`),
    },
    {
      icon: Trash2,
      label: "Delete recipe",
      onClick: (row) => setDeleteTarget({ id: row.id, name: row.recipeName }),
      variant: "destructive",
    },
  ];

  return (
    <>
      <DashboardTable
        columns={columns}
        rows={rows}
        actions={actions}
        pageSize={10}
      />

      <DeleteRecipeModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        recipeId={deleteTarget?.id}
        recipeName={deleteTarget?.name}
        onDeleted={handleDeleted}
      />
    </>
  );
};

export default MyRecipesTable;
