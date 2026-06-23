import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import FeaturedRecipesGrid from "./FeaturedRecipesGrid";
import { getFeaturedRecipes } from "@/lib/apiClient.server";

const FeaturedRecipes = async () => {
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
    // Fail silently — section simply renders empty
  }

  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        <AnimatedSectionHeader title="Featured Recipes" href="/recipes" />

        <FeaturedRecipesGrid recipes={recipes} />
      </div>
    </section>
  );
};

export default FeaturedRecipes;
