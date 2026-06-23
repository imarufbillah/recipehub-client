import { Suspense } from "react";
import BrowseHeader from "@/components/recipes/BrowseHeader";
import BrowseRecipesContent from "@/components/recipes/BrowseRecipesContent";
import RecipeGridSkeleton from "@/components/recipes/RecipeGridSkeleton";
import {
  getAllRecipeCategories,
  getAllRecipeCuisines,
  getAllRecipes,
} from "@/lib/apiClient.server";

// ─── Normaliser ───────────────────────────────────────────────────────────────

const normaliseRecipes = (raw = []) =>
  raw.map((r) => ({
    id: r._id,
    name: r.recipeName,
    image: r.imageUrl,
    alt: r.recipeName,
    category: r.category,
    categoryId: r.category?.toLowerCase() ?? "",
    cuisine: r.cuisine,
    difficulty: r.difficulty ?? null,
    prepTime: `${r.prepTime} min`,
    servings: r.servings ?? null,
    isPremium: r.isPremium ?? false,
    likeCount: r.likeCount ?? 0,
    price: r.price ?? null,
    author: r.author ?? null,
  }));

// ─── Page ─────────────────────────────────────────────────────────────────────

const RecipesPage = async ({ searchParams }) => {
  const p = await searchParams;

  const apiParams = {
    q: p?.q ?? "",
    category: p?.category ?? "",
    cuisine: p?.cuisine ?? "",
    difficulty: p?.difficulty ?? "",
    isPremium: p?.isPremium ?? "",
    sort: p?.sort ?? "newest",
    maxPrepTime: p?.maxPrepTime ?? "",
    page: p?.page ?? "1",
    limit: "12",
  };

  // Fetch categories, cuisines, and recipes in parallel; degrade gracefully on error
  let categories = [];
  let cuisines = [];
  let apiResponse = { recipes: [], total: 0, totalPages: 1, page: 1 };

  try {
    const [catData, cuisineData, recipeData] = await Promise.all([
      getAllRecipeCategories(),
      getAllRecipeCuisines(),
      getAllRecipes(apiParams),
    ]);
    categories = catData ?? [];
    cuisines = cuisineData ?? [];
    apiResponse = recipeData ?? apiResponse;
  } catch (err) {
    console.error("[RecipesPage]", err?.message);
  }

  // Both endpoints now return [{ id, label }] directly — no normalisation needed
  const rawRecipes = apiResponse?.recipes ?? [];
  const total = apiResponse?.total ?? 0;
  const totalPages = apiResponse?.totalPages ?? 1;
  const currentPage = apiResponse?.page ?? 1;

  const recipes = normaliseRecipes(rawRecipes);

  const hasFilters =
    !!p?.q ||
    !!p?.category ||
    !!p?.cuisine ||
    !!p?.difficulty ||
    !!p?.isPremium ||
    !!p?.maxPrepTime;

  return (
    <>
      <BrowseHeader total={total} hasFilters={hasFilters} />

      <Suspense
        fallback={
          <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-10 lg:py-14">
            <RecipeGridSkeleton count={12} />
          </div>
        }
      >
        <BrowseRecipesContent
          recipes={recipes}
          categories={categories}
          cuisines={cuisines}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          initialParams={{
            q: p?.q ?? "",
            category: p?.category ?? "",
            cuisine: p?.cuisine ?? "",
            difficulty: p?.difficulty ?? "",
            isPremium: p?.isPremium ?? "",
            sort: p?.sort ?? "newest",
            maxPrepTime: p?.maxPrepTime ?? "",
          }}
        />
      </Suspense>
    </>
  );
};

export default RecipesPage;
