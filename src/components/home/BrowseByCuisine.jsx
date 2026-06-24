import AnimatedSectionHeader from "@/components/ui/AnimatedSectionHeader";
import CuisineGrid from "./CuisineGrid";

const CUISINES = [
  {
    slug: "italian",
    name: "Italian",
    recipeCount: 214,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
    alt: "Fresh handmade pasta with rich ragù sauce — Italian cuisine",
  },
  {
    slug: "japanese",
    name: "Japanese",
    recipeCount: 178,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    alt: "Steaming bowl of tonkotsu ramen with chashu pork — Japanese cuisine",
  },
  {
    slug: "middle-eastern",
    name: "Middle Eastern",
    recipeCount: 132,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
    alt: "Mezze spread with hummus, flatbread and herbs — Middle Eastern cuisine",
  },
  {
    slug: "french",
    name: "French",
    recipeCount: 156,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    alt: "Classically plated French bistro dish with sauce — French cuisine",
  },
  {
    slug: "mexican",
    name: "Mexican",
    recipeCount: 189,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    alt: "Vibrant tacos with fresh salsa and lime — Mexican cuisine",
  },
  {
    slug: "bengali",
    name: "Bengali",
    recipeCount: 201,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    alt: "Richly spiced curry with basmati rice and naan — Bengali cuisine",
  },
];

/**
 * Browse by Cuisine section — server component.
 * Back on --background (white) to alternate with Popular's --secondary bg,
 * creating a light/warm/light rhythm down the page.
 */
const BrowseByCuisine = () => {
  return (
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col gap-10">
        <AnimatedSectionHeader
          title="Browse by Cuisine"
          href="/recipes"
          linkLabel="All Cuisines"
        />

        <CuisineGrid cuisines={CUISINES} />
      </div>
    </section>
  );
};

export default BrowseByCuisine;
