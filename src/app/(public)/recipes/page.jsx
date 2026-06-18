import { Suspense } from "react";
import BrowseHeader from "@/components/recipes/BrowseHeader";
import BrowseRecipesContent from "@/components/recipes/BrowseRecipesContent";
import RecipeGridSkeleton from "@/components/recipes/RecipeGridSkeleton";

/**
 * Browse Recipes — server page.
 *
 * searchParams is a Promise in Next.js 15+ — must be awaited.
 * Passes initial filter state from URL params down to the client
 * orchestration component for instant hydration (no flicker).
 *
 * Static placeholder data is used here until real API integration lands.
 * Replace `getRecipes()` / `getCategories()` with actual fetch calls
 * when the backend is ready.
 */

// ─── Static placeholder data ──────────────────────────────────────────────────

const CATEGORIES = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "quick", label: "Quick Meals" },
];

const RECIPES = [
  {
    id: "miso-glazed-salmon",
    name: "Miso-Glazed Salmon with Sesame Greens",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    alt: "Miso-glazed salmon fillet with sesame greens on a dark plate",
    category: "Dinner",
    categoryId: "dinner",
    cuisine: "Japanese",
    prepTime: "25 min",
    author: "Elena Marsh",
    featured: true,
  },
  {
    id: "sourdough-french-toast",
    name: "Sourdough French Toast with Whipped Ricotta",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    alt: "Thick sourdough French toast with whipped ricotta and berries",
    category: "Breakfast",
    categoryId: "breakfast",
    cuisine: "French",
    prepTime: "20 min",
    author: "James Okafor",
  },
  {
    id: "burrata-heirloom-tomato",
    name: "Burrata with Heirloom Tomatoes & Basil Oil",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    alt: "Burrata cheese with sliced heirloom tomatoes and basil oil",
    category: "Lunch",
    categoryId: "lunch",
    cuisine: "Italian",
    prepTime: "10 min",
    author: "Sofia Ricci",
  },
  {
    id: "lamb-ragu-pappardelle",
    name: "Slow-Braised Lamb Ragù with Pappardelle",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
    alt: "Wide pappardelle pasta tossed in rich slow-braised lamb ragù",
    category: "Dinner",
    categoryId: "dinner",
    cuisine: "Italian",
    prepTime: "3 hr",
    author: "Marco Bellini",
  },
  {
    id: "tahini-dark-chocolate-tart",
    name: "Dark Chocolate & Tahini Tart",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
    alt: "Dark chocolate tart with tahini swirl in a fluted tart shell",
    category: "Dessert",
    categoryId: "dessert",
    cuisine: "Middle Eastern",
    prepTime: "1 hr 20 min",
    author: "Nour Al-Rashid",
    featured: true,
  },
  {
    id: "roasted-cauliflower-harissa",
    name: "Whole Roasted Cauliflower with Harissa Yogurt",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    alt: "Whole roasted cauliflower with a charred exterior, served on harissa yogurt",
    category: "Vegetarian",
    categoryId: "vegetarian",
    cuisine: "North African",
    prepTime: "55 min",
    author: "Fatima Benali",
  },
  {
    id: "smashed-cucumber-salad",
    name: "Smashed Cucumber Salad with Chilli Oil",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    alt: "Smashed cucumber pieces tossed in chilli oil and sesame seeds",
    category: "Quick Meals",
    categoryId: "quick",
    cuisine: "Chinese",
    prepTime: "12 min",
    author: "Mei Chen",
  },
  {
    id: "shakshuka-feta",
    name: "Shakshuka with Feta & Fresh Herbs",
    image:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    alt: "Eggs poached in spiced tomato sauce topped with crumbled feta",
    category: "Breakfast",
    categoryId: "breakfast",
    cuisine: "Middle Eastern",
    prepTime: "30 min",
    author: "Yael Koren",
  },
  {
    id: "duck-confit-lentils",
    name: "Duck Confit with Puy Lentils & Gremolata",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    alt: "Crispy duck confit leg resting on a bed of Puy lentils",
    category: "Dinner",
    categoryId: "dinner",
    cuisine: "French",
    prepTime: "2 hr 40 min",
    author: "Pierre Dubois",
  },
  {
    id: "cacio-e-pepe",
    name: "Cacio e Pepe",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    alt: "Spaghetti cacio e pepe with a generous coating of Pecorino",
    category: "Quick Meals",
    categoryId: "quick",
    cuisine: "Italian",
    prepTime: "18 min",
    author: "Marco Bellini",
  },
  {
    id: "mango-coconut-panna-cotta",
    name: "Coconut Panna Cotta with Mango Coulis",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    alt: "Silky coconut panna cotta topped with vivid mango coulis",
    category: "Dessert",
    categoryId: "dessert",
    cuisine: "Southeast Asian",
    prepTime: "4 hr",
    author: "Priya Nair",
  },
  {
    id: "roasted-red-pepper-soup",
    name: "Roasted Red Pepper & Tomato Soup",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    alt: "Vibrant red pepper and tomato soup served in a ceramic bowl",
    category: "Vegetarian",
    categoryId: "vegetarian",
    cuisine: "Mediterranean",
    prepTime: "45 min",
    author: "Elena Marsh",
  },
  {
    id: "bibimbap",
    name: "Stone Bowl Bibimbap with Gochujang",
    image:
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    alt: "Korean bibimbap served in a hot stone bowl with gochujang",
    category: "Lunch",
    categoryId: "lunch",
    cuisine: "Korean",
    prepTime: "40 min",
    author: "Jin-Ho Park",
  },
  {
    id: "cardamom-orange-cake",
    name: "Cardamom & Orange Flourless Cake",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    alt: "Dense, moist cardamom and orange cake dusted with icing sugar",
    category: "Dessert",
    categoryId: "dessert",
    cuisine: "Persian",
    prepTime: "1 hr 10 min",
    author: "Shirin Moradi",
  },
  {
    id: "grilled-corn-salad",
    name: "Charred Corn & Black Bean Salad",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    alt: "Charred corn and black bean salad with lime dressing",
    category: "Vegetarian",
    categoryId: "vegetarian",
    cuisine: "Mexican",
    prepTime: "22 min",
    author: "Lucia Flores",
  },
  {
    id: "soba-noodle-bowl",
    name: "Cold Soba Noodle Bowl with Dashi Broth",
    image:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=800&q=80",
    alt: "Cold soba noodles in a light dashi broth with sliced spring onion",
    category: "Quick Meals",
    categoryId: "quick",
    cuisine: "Japanese",
    prepTime: "15 min",
    author: "Mei Chen",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const RecipesPage = async ({ searchParams }) => {
  // searchParams is a Promise in Next.js 15+
  const resolvedParams = await searchParams;

  const initialCategory = resolvedParams?.category ?? null;
  const initialQuery = resolvedParams?.q ?? "";
  const initialPage = Number(resolvedParams?.page) || 1;

  return (
    <>
      {/* Compact page header — not a hero */}
      <BrowseHeader totalCount={RECIPES.length} />

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
          recipes={RECIPES}
          categories={CATEGORIES}
          initialCategory={initialCategory}
          initialQuery={initialQuery}
          initialPage={initialPage}
        />
      </Suspense>
    </>
  );
};

export default RecipesPage;
