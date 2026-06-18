import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import PopularRecipesGrid from "./PopularRecipesGrid";

/**
 * Static placeholder data — swap for async server fetch when API is wired.
 * 8 items → 4 rows × 2 columns on md+. Dense, scannable, "popular" feel.
 */
const POPULAR_RECIPES = [
  {
    id: "shakshuka-spiced",
    name: "Spiced Shakshuka",
    author: "Layla Hassan",
    category: "Breakfast",
    prepTime: "20 min",
    likes: 3241,
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=300&q=80",
    alt: "Spiced shakshuka with eggs poached in tomato sauce",
  },
  {
    id: "brown-butter-gnocchi",
    name: "Brown Butter Gnocchi",
    author: "Marco Fini",
    category: "Dinner",
    prepTime: "40 min",
    likes: 2887,
    image:
      "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=300&q=80",
    alt: "Pan-fried gnocchi in brown butter with sage leaves",
  },
  {
    id: "tahini-roasted-carrots",
    name: "Tahini Roasted Carrots",
    author: "Nour Khalil",
    category: "Sides",
    prepTime: "35 min",
    likes: 2104,
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=300&q=80",
    alt: "Honey-glazed roasted carrots with tahini drizzle and herbs",
  },
  {
    id: "japanese-milk-bread",
    name: "Japanese Milk Bread",
    author: "Yuki Tanaka",
    category: "Bread",
    prepTime: "3 hr",
    likes: 1998,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
    alt: "Pillowy Japanese shokupan milk bread loaf, golden crust",
  },
  {
    id: "seared-duck-breast",
    name: "Seared Duck Breast",
    author: "Claire Moreau",
    category: "Dinner",
    prepTime: "45 min",
    likes: 1854,
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=300&q=80",
    alt: "Seared duck breast sliced over cherry reduction",
  },
  {
    id: "cold-brew-tiramisu",
    name: "Cold Brew Tiramisu",
    author: "Sofia Ricci",
    category: "Dessert",
    prepTime: "6 hr",
    likes: 1672,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80",
    alt: "Tiramisu dusted with cocoa powder, served in a glass",
  },
  {
    id: "green-goddess-grain-bowl",
    name: "Green Goddess Grain Bowl",
    author: "Amara Osei",
    category: "Lunch",
    prepTime: "25 min",
    likes: 1540,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
    alt: "Grain bowl with roasted vegetables and green goddess dressing",
  },
  {
    id: "smash-burger",
    name: "Classic Smash Burger",
    author: "James Porter",
    category: "Dinner",
    prepTime: "15 min",
    likes: 1488,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
    alt: "Double smash burger with melted cheese and pickles",
  },
];

/**
 * Popular Recipes section — server component.
 * Section background uses --secondary token (one step off background)
 * to visually separate it from the white Featured section above —
 * creates page rhythm without adding a new color.
 */
const PopularRecipes = () => {
  return (
    <section className="w-full py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        <AnimatedSectionHeader
          title="Popular Right Now"
          href="/recipes?sort=popular"
          linkLabel="See All"
        />

        <PopularRecipesGrid recipes={POPULAR_RECIPES} />
      </div>
    </section>
  );
};

export default PopularRecipes;
