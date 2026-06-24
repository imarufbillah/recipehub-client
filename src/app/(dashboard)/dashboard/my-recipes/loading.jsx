import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardTableSkeleton from "@/components/dashboard/DashboardTableSkeleton";

/**
 * My Recipes — heading, subtitle, and "Add Recipe" button are all static.
 * Only the table rows are API-fetched.
 * Columns: Recipe | Category | Cuisine | Prep Time | Status + Actions
 */
const MyRecipesLoading = () => (
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
      <Button variant="default" size="sm" asChild className="gap-1.5 shrink-0">
        <Link href="/dashboard/add-recipe">
          <Plus className="size-3.5" />
          Add Recipe
        </Link>
      </Button>
    </div>

    <DashboardTableSkeleton colCount={5} rowCount={8} hasActions />
  </div>
);

export default MyRecipesLoading;
