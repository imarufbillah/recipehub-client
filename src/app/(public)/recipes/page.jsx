import { Suspense } from "react";
import BrowseHeader from "@/components/recipes/BrowseHeader";
import BrowseRecipesContent from "@/components/recipes/BrowseRecipesContent";
import RecipeGridSkeleton from "@/components/recipes/RecipeGridSkeleton";
import { getAllRecipeCategories, getAllRecipes } from "@/lib/apiClient";

/**
 * Browse Recipes — server page.
 *
 * searchParams is a Promise in Next.js 15+ — must be awaited.
 * Passes initial filter state from URL params down to the client
 * orchestration component for instant hydration (no flicker).
 *
 * API data is normalised here on the server so every downstream
 * component receives a stable, predictable shape.
 */

// ─── Normalisers ──────────────────────────────────────────────────────────────

/**
 * API returns plain strings: ["Lunch", "Breakfast", …]
 * Components expect: [{ id: "lunch", label: "Lunch" }, …]
 */
const normaliseCategories = (raw = []) =>
  raw.map((label) => ({ id: label.toLowerCase(), label }));

/**
 * Map API recipe shape → RecipeCard / BrowseRecipesContent shape.
 *
 * API field        → component field
 * _id              → id
 * recipeName       → name
 * imageUrl         → image
 * prepTime (mins)  → prepTime ("25 min")
 * isPremium        → isPremium (kept for premium gate logic)
 * isFeatured       → featured  (accent badge on card)
 * price            → price
 * category         → category  (unchanged)
 * categoryId       → derived as category.toLowerCase()
 * cuisine          → cuisine   (unchanged)
 */
const normaliseRecipes = (raw = []) =>
  raw.map((r) => ({
    id: r._id,
    name: r.recipeName,
    image: r.imageUrl,
    alt: r.recipeName,
    category: r.category,
    categoryId: r.category?.toLowerCase() ?? "",
    cuisine: r.cuisine,
    prepTime: `${r.prepTime} min`,
    featured: r.isFeatured ?? false,
    isPremium: r.isPremium ?? false,
    price: r.price ?? null,
  }));

// ─── Page ─────────────────────────────────────────────────────────────────────

const RecipesPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const [rawCategories, rawRecipes] = await Promise.all([
    getAllRecipeCategories(),
    getAllRecipes(),
  ]);

  const categories = normaliseCategories(rawCategories);
  const recipes = normaliseRecipes(rawRecipes);

  const initialCategory = resolvedParams?.category ?? null;
  const initialQuery = resolvedParams?.q ?? "";
  const initialPage = Number(resolvedParams?.page) || 1;

  return (
    <>
      {/* Compact page header — not a hero */}
      <BrowseHeader totalCount={recipes.length} />

      {/* Filter bar + grid + pagination — client island */}
      {/* Suspense boundary required because BrowseRecipesContent calls useSearchParams */}
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
          initialCategory={initialCategory}
          initialQuery={initialQuery}
          initialPage={initialPage}
        />
      </Suspense>
    </>
  );
};

export default RecipesPage;
