import { Suspense } from "react";
import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import PopularRecipesGrid from "./PopularRecipesGrid";
import PopularRecipesSkeleton from "./PopularRecipesSkeleton";
import { getMostLikedRecipes } from "@/lib/apiClient.server";

// ─── Data + grid — isolated async component so Suspense wraps only it ─────────

const PopularRecipesGrid_Async = async () => {
  let recipes = [];

  try {
    const data = await getMostLikedRecipes();
    recipes = (Array.isArray(data) ? data : (data?.recipes ?? [])).map((r) => ({
      id: r._id,
      name: r.recipeName,
      author: r.author ?? "—",
      category: r.category ?? "—",
      prepTime: r.prepTime ? `${r.prepTime} min` : "—",
      likes: r.likeCount ?? 0,
      image: r.imageUrl,
      alt: `${r.recipeName} — recipe photo`,
    }));
  } catch {
    // Fail silently — section renders empty on API error
  }

  return <PopularRecipesGrid recipes={recipes} />;
};

// ─── Section shell — static header + Suspense boundary around grid only ───────

const PopularRecipes = () => {
  return (
    <section className="w-full py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        {/* Static — renders instantly */}
        <AnimatedSectionHeader
          title="Popular Right Now"
          href="/recipes?sort=popular"
          linkLabel="See All"
        />

        {/* API-fetched: skeleton shown while data loads */}
        <Suspense fallback={<PopularRecipesSkeleton count={6} />}>
          <PopularRecipesGrid_Async />
        </Suspense>
      </div>
    </section>
  );
};

export default PopularRecipes;
