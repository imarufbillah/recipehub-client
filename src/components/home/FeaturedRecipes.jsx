import { Suspense } from "react";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import FeaturedRecipesGrid from "./FeaturedRecipesGrid";
import FeaturedRecipesSkeleton from "./FeaturedRecipesSkeleton";
import { getFeaturedRecipes } from "@/lib/apiClient.server";

// ─── Data + grid — isolated async component so Suspense can wrap only it ──────

const FeaturedRecipesGrid_Async = async () => {
  let recipes = [];

  try {
    const data = await getFeaturedRecipes();
    recipes = (Array.isArray(data) ? data : (data?.recipes ?? [])).map((r) => ({
      id: r._id,
      name: r.recipeName,
      category: r.category ?? "—",
      cuisine: r.cuisine ?? "—",
      difficulty: r.difficulty ?? null,
      prepTime: r.prepTime ? `${r.prepTime} min` : "—",
      isPremium: r.isPremium ?? false,
      likeCount: r.likeCount ?? 0,
      author: r.author ?? null,
      image: r.imageUrl,
      alt: `${r.recipeName} — recipe photo`,
    }));
  } catch {
    // Fail silently — section renders empty on API error
  }

  return <FeaturedRecipesGrid recipes={recipes} />;
};

// ─── Section shell — static header + Suspense boundary around grid only ───────

const FeaturedRecipes = () => {
  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        {/* Static — not API-fetched, renders instantly */}
        <AnimatedSectionHeader title="Featured Recipes" href="/recipes" />

        {/* API-fetched: skeleton shown while data loads */}
        <Suspense fallback={<FeaturedRecipesSkeleton count={4} />}>
          <FeaturedRecipesGrid_Async />
        </Suspense>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
