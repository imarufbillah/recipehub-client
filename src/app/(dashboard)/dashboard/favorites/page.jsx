import Link from "next/link";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "author", label: "Author", width: "w-32" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "saved", label: "Saved", width: "w-28" },
  { key: "plan", label: "Plan", width: "w-20", badge: true },
];

const ROWS = [
  {
    id: "f1",
    name: "Dark Chocolate & Tahini Tart",
    author: "Nour Al-Rashid",
    category: "Dessert",
    saved: "Jun 3, 2024",
    plan: "Premium",
  },
  {
    id: "f2",
    name: "Whole Roasted Cauliflower with Harissa Yogurt",
    author: "Fatima Benali",
    category: "Vegetarian",
    saved: "Jun 11, 2024",
    plan: "Free",
  },
  {
    id: "f3",
    name: "Cold Soba Noodle Bowl with Dashi Broth",
    author: "Mei Chen",
    category: "Quick",
    saved: "Jul 2, 2024",
    plan: "Free",
  },
  {
    id: "f4",
    name: "Duck Confit with Puy Lentils & Gremolata",
    author: "Pierre Dubois",
    category: "Dinner",
    saved: "Jul 19, 2024",
    plan: "Premium",
  },
  {
    id: "f5",
    name: "Stone Bowl Bibimbap with Gochujang",
    author: "Jin-Ho Park",
    category: "Lunch",
    saved: "Aug 8, 2024",
    plan: "Free",
  },
];

const FavoritesPage = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-6">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Favorites
      </h2>
      <p className="mt-1 text-[13px] font-sans text-muted-foreground">
        Recipes you&apos;ve saved for later.
      </p>
    </div>

    {ROWS.length > 0 ? (
      <DashboardTable
        columns={COLUMNS}
        rows={ROWS}
        actions={[]}
        pageSize={10}
      />
    ) : (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <Bookmark
          className="size-8 text-muted-foreground/40 stroke-[1.25]"
          aria-hidden
        />
        <h3 className="font-heading text-[20px] leading-snug tracking-[-0.01em] text-foreground">
          No saved recipes yet
        </h3>
        <p className="text-[14px] font-sans text-muted-foreground max-w-xs">
          Browse the collection and bookmark recipes you want to come back to.
        </p>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mt-1 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
        >
          <Link href="/recipes">Browse Recipes →</Link>
        </Button>
      </div>
    )}
  </div>
);

export default FavoritesPage;
