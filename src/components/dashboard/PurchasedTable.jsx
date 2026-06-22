"use client";

import DashboardTable from "@/components/dashboard/DashboardTable";

const COLUMNS = [
  {
    key: "recipeName",
    label: "Recipe",
    hrefFn: (row) => `/recipes/${row.recipeId}`,
  },
  { key: "author", label: "Author", width: "w-32" },
  { key: "price", label: "Price", width: "w-20" },
  { key: "purchasedAt", label: "Date", width: "w-28" },
  { key: "ref", label: "Ref", width: "w-48", mono: true },
];

const PurchasedTable = ({ rows }) => (
  <DashboardTable columns={COLUMNS} rows={rows} actions={[]} pageSize={10} />
);

export default PurchasedTable;
