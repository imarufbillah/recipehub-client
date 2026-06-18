"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardTable from "@/components/dashboard/DashboardTable";

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "submitted", label: "Published", width: "w-28" },
  { key: "likes", label: "Likes", width: "w-16" },
  { key: "status", label: "Status", width: "w-24", badge: true },
];

const ROWS = [
  {
    id: "r1",
    name: "Miso-Glazed Salmon with Sesame Greens",
    category: "Dinner",
    submitted: "Feb 14, 2024",
    likes: 342,
    status: "Featured",
  },
  {
    id: "r2",
    name: "Sourdough French Toast with Whipped Ricotta",
    category: "Breakfast",
    submitted: "Mar 3, 2024",
    likes: 218,
    status: "Active",
  },
  {
    id: "r3",
    name: "Burrata with Heirloom Tomatoes & Basil Oil",
    category: "Lunch",
    submitted: "Mar 20, 2024",
    likes: 175,
    status: "Active",
  },
  {
    id: "r4",
    name: "Roasted Red Pepper & Tomato Soup",
    category: "Vegetarian",
    submitted: "Aug 27, 2024",
    likes: 124,
    status: "Active",
  },
  {
    id: "r5",
    name: "Cardamom & Orange Flourless Cake",
    category: "Dessert",
    submitted: "Sep 15, 2024",
    likes: 89,
    status: "Pending",
  },
];

const MyRecipesPage = () => {
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
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
            My Recipes
          </h2>
          <p className="mt-1 text-[13px] font-sans text-muted-foreground">
            Manage the recipes you&apos;ve published.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          asChild
          className="gap-1.5 shrink-0"
        >
          <Link href="/dashboard/add-recipe">
            <Plus className="size-3.5" />
            Add Recipe
          </Link>
        </Button>
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

export default MyRecipesPage;
