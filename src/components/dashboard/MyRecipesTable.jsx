"use client";

import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";

/**
 * MyRecipesTable — client island for the My Recipes page.
 *
 * Owns the interactive action handlers so the parent page stays a server component.
 * Columns are defined here so the `hrefFn` closures stay client-side.
 */
const MyRecipesTable = ({ rows }) => {
  const router = useRouter();

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
      onClick: (row) => console.log("edit", row.id),
    },
    {
      icon: Trash2,
      label: "Delete recipe",
      onClick: (row) => console.log("delete", row.id),
      variant: "destructive",
    },
  ];

  return (
    <DashboardTable
      columns={columns}
      rows={rows}
      actions={actions}
      pageSize={10}
    />
  );
};

export default MyRecipesTable;
