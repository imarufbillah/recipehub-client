"use client";

import { Star, Pencil, Trash2 } from "lucide-react";
import DashboardTable from "@/components/dashboard/DashboardTable";

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "author", label: "Author", width: "w-32" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "submitted", label: "Submitted", width: "w-28" },
  { key: "likes", label: "Likes", width: "w-16" },
  { key: "status", label: "Status", width: "w-24", badge: true },
];

const ROWS = [
  {
    id: "r1",
    name: "Miso-Glazed Salmon with Sesame Greens",
    author: "Elena Marsh",
    category: "Dinner",
    submitted: "Feb 14, 2024",
    likes: 342,
    status: "Featured",
  },
  {
    id: "r2",
    name: "Sourdough French Toast with Whipped Ricotta",
    author: "James Okafor",
    category: "Breakfast",
    submitted: "Mar 3, 2024",
    likes: 218,
    status: "Active",
  },
  {
    id: "r3",
    name: "Burrata with Heirloom Tomatoes & Basil Oil",
    author: "Sofia Ricci",
    category: "Lunch",
    submitted: "Mar 20, 2024",
    likes: 175,
    status: "Active",
  },
  {
    id: "r4",
    name: "Slow-Braised Lamb Ragù with Pappardelle",
    author: "Marco Bellini",
    category: "Dinner",
    submitted: "Apr 8, 2024",
    likes: 289,
    status: "Active",
  },
  {
    id: "r5",
    name: "Dark Chocolate & Tahini Tart",
    author: "Nour Al-Rashid",
    category: "Dessert",
    submitted: "Apr 25, 2024",
    likes: 217,
    status: "Featured",
  },
  {
    id: "r6",
    name: "Whole Roasted Cauliflower with Harissa Yogurt",
    author: "Fatima Benali",
    category: "Veg",
    submitted: "May 12, 2024",
    likes: 143,
    status: "Active",
  },
  {
    id: "r7",
    name: "Smashed Cucumber Salad with Chilli Oil",
    author: "Mei Chen",
    category: "Quick",
    submitted: "May 29, 2024",
    likes: 301,
    status: "Active",
  },
  {
    id: "r8",
    name: "Shakshuka with Feta & Fresh Herbs",
    author: "Yael Koren",
    category: "Breakfast",
    submitted: "Jun 15, 2024",
    likes: 196,
    status: "Active",
  },
  {
    id: "r9",
    name: "Duck Confit with Puy Lentils & Gremolata",
    author: "Pierre Dubois",
    category: "Dinner",
    submitted: "Jul 3, 2024",
    likes: 88,
    status: "Inactive",
  },
  {
    id: "r10",
    name: "Cacio e Pepe",
    author: "Marco Bellini",
    category: "Quick",
    submitted: "Jul 21, 2024",
    likes: 412,
    status: "Active",
  },
  {
    id: "r11",
    name: "Coconut Panna Cotta with Mango Coulis",
    author: "Priya Nair",
    category: "Dessert",
    submitted: "Aug 9, 2024",
    likes: 161,
    status: "Active",
  },
  {
    id: "r12",
    name: "Roasted Red Pepper & Tomato Soup",
    author: "Elena Marsh",
    category: "Veg",
    submitted: "Aug 27, 2024",
    likes: 124,
    status: "Active",
  },
];

const ManageRecipesPage = () => {
  const actions = [
    {
      icon: Star,
      label: "Toggle featured",
      onClick: (row) => console.log("feature", row.id),
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
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Manage Recipes
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Feature, edit, or remove recipes from the platform.
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

export default ManageRecipesPage;
