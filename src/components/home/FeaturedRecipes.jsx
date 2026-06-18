import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import FeaturedRecipesGrid from "./FeaturedRecipesGrid";

/**
 * Static placeholder data — replace with an async server fetch when the API
 * is wired up. All Unsplash photo IDs are editorially selected for warm,
 * plated-dish aesthetic consistent with the RecipeHub brand.
 */
const FEATURED_RECIPES = [
  {
    id: "pasta-al-pomodoro",
    name: "Pasta al Pomodoro",
    category: "Dinner",
    cuisine: "Italian",
    prepTime: "30 min",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    alt: "Pasta al Pomodoro — fresh tomato sauce over bronze-cut pasta",
  },
  {
    id: "miso-glazed-salmon",
    name: "Miso-Glazed Salmon",
    category: "Dinner",
    cuisine: "Japanese",
    prepTime: "25 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    alt: "Miso-glazed salmon fillet with sesame and scallion garnish",
  },
  {
    id: "roasted-cauliflower-soup",
    name: "Roasted Cauliflower Soup",
    category: "Lunch",
    cuisine: "French",
    prepTime: "45 min",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    alt: "Roasted cauliflower soup with herb oil and toasted seeds",
  },
  {
    id: "sourdough-focaccia",
    name: "Sourdough Focaccia",
    category: "Bread",
    cuisine: "Italian",
    prepTime: "3 hr",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80",
    alt: "Dimpled sourdough focaccia with olive oil and rosemary",
  },
];

/**
 * Featured Recipes section — server component.
 * Generous vertical padding (96–160px desktop) per design system public page rhythm.
 */
const FeaturedRecipes = () => {
  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        <AnimatedSectionHeader title="Featured Recipes" href="/recipes" />

        <FeaturedRecipesGrid recipes={FEATURED_RECIPES} />
      </div>
    </section>
  );
};

export default FeaturedRecipes;
