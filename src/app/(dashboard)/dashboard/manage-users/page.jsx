"use client";

import { Ban, Trash2 } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "joined", label: "Joined", width: "w-28" },
  { key: "recipes", label: "Recipes", width: "w-20" },
  { key: "status", label: "Status", width: "w-24", badge: true },
  { key: "plan", label: "Plan", width: "w-20", badge: true },
];

const ROWS = [
  {
    id: "u1",
    name: "Elena Marsh",
    email: "elena@example.com",
    joined: "Jan 12, 2024",
    recipes: 12,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u2",
    name: "James Okafor",
    email: "james@example.com",
    joined: "Feb 3, 2024",
    recipes: 7,
    status: "Active",
    plan: "Free",
  },
  {
    id: "u3",
    name: "Sofia Ricci",
    email: "sofia@example.com",
    joined: "Mar 18, 2024",
    recipes: 21,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u4",
    name: "Marco Bellini",
    email: "marco@example.com",
    joined: "Apr 5, 2024",
    recipes: 4,
    status: "Blocked",
    plan: "Free",
  },
  {
    id: "u5",
    name: "Nour Al-Rashid",
    email: "nour@example.com",
    joined: "Apr 22, 2024",
    recipes: 9,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u6",
    name: "Fatima Benali",
    email: "fatima@example.com",
    joined: "May 7, 2024",
    recipes: 3,
    status: "Active",
    plan: "Free",
  },
  {
    id: "u7",
    name: "Mei Chen",
    email: "mei@example.com",
    joined: "May 19, 2024",
    recipes: 15,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u8",
    name: "Yael Koren",
    email: "yael@example.com",
    joined: "Jun 1, 2024",
    recipes: 6,
    status: "Active",
    plan: "Free",
  },
  {
    id: "u9",
    name: "Pierre Dubois",
    email: "pierre@example.com",
    joined: "Jun 14, 2024",
    recipes: 11,
    status: "Blocked",
    plan: "Free",
  },
  {
    id: "u10",
    name: "Priya Nair",
    email: "priya@example.com",
    joined: "Jul 2, 2024",
    recipes: 8,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u11",
    name: "Jin-Ho Park",
    email: "jinho@example.com",
    joined: "Jul 20, 2024",
    recipes: 5,
    status: "Active",
    plan: "Free",
  },
  {
    id: "u12",
    name: "Shirin Moradi",
    email: "shirin@example.com",
    joined: "Aug 8, 2024",
    recipes: 18,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u13",
    name: "Lucia Flores",
    email: "lucia@example.com",
    joined: "Aug 25, 2024",
    recipes: 2,
    status: "Inactive",
    plan: "Free",
  },
  {
    id: "u14",
    name: "David Osei",
    email: "david@example.com",
    joined: "Sep 10, 2024",
    recipes: 14,
    status: "Active",
    plan: "Premium",
  },
  {
    id: "u15",
    name: "Amara Diallo",
    email: "amara@example.com",
    joined: "Sep 28, 2024",
    recipes: 0,
    status: "Active",
    plan: "Free",
  },
];

const ManageUsersPage = () => {
  const actions = [
    {
      icon: Ban,
      label: "Block / Unblock user",
      onClick: (row) => console.log("toggle block", row.id),
    },
    {
      icon: Trash2,
      label: "Delete user",
      onClick: (row) => console.log("delete", row.id),
      variant: "destructive",
    },
  ];

  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Manage Users
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          View, block, and remove user accounts.
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

export default ManageUsersPage;
