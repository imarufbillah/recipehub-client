import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/session";
import { getRecipesByUserId } from "@/lib/apiClient";
import MyRecipesTable from "@/components/dashboard/MyRecipesTable";

const COLUMNS = [
  { key: "recipeName", label: "Recipe" },
  { key: "category", label: "Category", width: "w-28" },
  { key: "cuisine", label: "Cuisine", width: "w-28" },
  { key: "prepTime", label: "Prep Time", width: "w-24", mono: true },
  { key: "status", label: "Status", width: "w-24", badge: true },
];

const MyRecipesPage = async () => {
  const { user } = await getServerSession();

  let recipes = [];
  try {
    const data = await getRecipesByUserId(user.id);
    recipes = Array.isArray(data) ? data : (data?.recipes ?? []);
  } catch {
    // Render empty table — no crash, error is recoverable
    recipes = [];
  }

  // Map API shape → flat row objects DashboardTable expects
  const rows = recipes.map((r) => ({
    id: r._id,
    recipeName: r.recipeName,
    category: r.category ?? "—",
    cuisine: r.cuisine ?? "—",
    prepTime: r.prepTime ? `${r.prepTime} min` : "—",
    status: r.status ?? "active",
  }));

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

      <MyRecipesTable columns={COLUMNS} rows={rows} />
    </div>
  );
};

export default MyRecipesPage;
