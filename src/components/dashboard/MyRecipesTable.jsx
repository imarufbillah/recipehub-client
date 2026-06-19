"use client";

import { Pencil, Trash2 } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";

const MyRecipesTable = ({ columns, rows }) => {
  const actions = [
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
