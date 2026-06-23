import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import PopularRecipesGrid from "./PopularRecipesGrid";
import { getMostLikedRecipes } from "@/lib/apiClient.server";

const PopularRecipes = async () => {
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
    // Fail silently — section simply renders empty
  }

  return (
    <section className="w-full py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        <AnimatedSectionHeader
          title="Popular Right Now"
          href="/recipes?sort=popular"
          linkLabel="See All"
        />

        <PopularRecipesGrid recipes={recipes} />
      </div>
    </section>
  );
};

export default PopularRecipes;
