"use client";

import { Check, Trash2, Eye } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";

const COLUMNS = [
  { key: "recipe", label: "Reported Recipe" },
  { key: "reporter", label: "Reporter", width: "w-32" },
  { key: "reason", label: "Reason", width: "w-40" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "status", label: "Status", width: "w-24", badge: true },
];

const ROWS = [
  {
    id: "rep1",
    recipe: "Quick & Easy Pasta Carbonara",
    reporter: "James Okafor",
    reason: "Copyright Issue",
    date: "Jun 3, 2024",
    status: "Open",
  },
  {
    id: "rep2",
    recipe: "Ultimate Chocolate Brownies",
    reporter: "Mei Chen",
    reason: "Inaccurate Recipe",
    date: "Jun 11, 2024",
    status: "Open",
  },
  {
    id: "rep3",
    recipe: "The Best Banana Bread",
    reporter: "Yael Koren",
    reason: "Spam",
    date: "Jun 19, 2024",
    status: "Resolved",
  },
  {
    id: "rep4",
    recipe: "Traditional Beef Bourguignon",
    reporter: "Lucia Flores",
    reason: "Offensive Content",
    date: "Jul 2, 2024",
    status: "Open",
  },
  {
    id: "rep5",
    recipe: "Crispy Fried Chicken Sandwich",
    reporter: "David Osei",
    reason: "Copyright Issue",
    date: "Jul 15, 2024",
    status: "Resolved",
  },
  {
    id: "rep6",
    recipe: "Perfect Sourdough Loaf",
    reporter: "Priya Nair",
    reason: "Spam",
    date: "Jul 28, 2024",
    status: "Open",
  },
  {
    id: "rep7",
    recipe: "Homemade Ramen Broth",
    reporter: "Fatima Benali",
    reason: "Inaccurate Recipe",
    date: "Aug 10, 2024",
    status: "Open",
  },
  {
    id: "rep8",
    recipe: "Classic French Onion Soup",
    reporter: "Pierre Dubois",
    reason: "Copyright Issue",
    date: "Aug 22, 2024",
    status: "Resolved",
  },
  {
    id: "rep9",
    recipe: "Street Tacos al Pastor",
    reporter: "Jin-Ho Park",
    reason: "Offensive Content",
    date: "Sep 4, 2024",
    status: "Open",
  },
  {
    id: "rep10",
    recipe: "Vegan Mushroom Wellington",
    reporter: "Shirin Moradi",
    reason: "Spam",
    date: "Sep 18, 2024",
    status: "Open",
  },
];

const ReportsPage = () => {
  const actions = [
    {
      icon: Eye,
      label: "View report",
      onClick: (row) => console.log("view", row.id),
    },
    {
      icon: Check,
      label: "Mark as resolved",
      onClick: (row) => console.log("resolve", row.id),
    },
    {
      icon: Trash2,
      label: "Dismiss report",
      onClick: (row) => console.log("dismiss", row.id),
      variant: "destructive",
    },
  ];

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Reports
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Review user-submitted reports and take action.
        </p>
      </div>
      <DashboardTable
        columns={COLUMNS}
        rows={ROWS}
        actions={actions}
        pageSize={10}
      />
    </div>
  );
};

export default ReportsPage;
