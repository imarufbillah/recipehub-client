import { notFound } from "next/navigation";
import RecipeDetailHero from "@/components/recipe-detail/RecipeDetailHero";
import RecipeTitleBlock from "@/components/recipe-detail/RecipeTitleBlock";
import RecipeDetailClient from "@/components/recipe-detail/RecipeDetailClient";
import RecipeContentBody from "@/components/recipe-detail/RecipeContentBody";

/**
 * Recipe Detail page — server component.
 *
 * Layout:
 *  ┌────────────────────────────────────────────────────────────┐
 *  │  HERO SPREAD  (full-width, asymmetric 55/45 desktop grid)  │
 *  │  ┌─────────────────────┐  ┌─────────────────────────────┐  │
 *  │  │  Image panel (55%)  │  │  Title block                │  │
 *  │  │  full-height        │  │  Author + metadata strip    │  │
 *  │  │  sharp corners      │  │  Action row (client island) │  │
 *  │  └─────────────────────┘  └─────────────────────────────┘  │
 *  └────────────────────────────────────────────────────────────┘
 *  ┌────────────────────────────────────────────────────────────┐
 *  │  CONTENT BODY  (5/12 ingredients | 7/12 instructions)     │
 *  └────────────────────────────────────────────────────────────┘
 *
 * On mobile: hero image stacks above title block, content columns stack.
 *
 * params is a Promise in Next.js 15+ — must be awaited.
 */

// ─── Static recipe dataset ────────────────────────────────────────────────────

const RECIPES = {
  "miso-glazed-salmon": {
    id: "miso-glazed-salmon",
    name: "Miso-Glazed Salmon with Sesame Greens",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=85",
    alt: "Miso-glazed salmon fillet with sesame greens on a dark ceramic plate",
    author: "Elena Marsh",
    category: "Dinner",
    cuisine: "Japanese",
    difficulty: "Intermediate",
    prepTime: "25 min",
    isPremium: false,
    isPurchased: false,
    price: null,
    likes: 342,
    ingredientGroups: [
      {
        items: [
          { qty: "4", unit: "×", name: "salmon fillets (180g each), skin on" },
          { qty: "3 tbsp", name: "white miso paste" },
          { qty: "2 tbsp", name: "mirin" },
          { qty: "1 tbsp", name: "sake or dry sherry" },
          { qty: "1 tbsp", name: "soy sauce" },
          { qty: "1 tsp", name: "sesame oil" },
          { qty: "2 tsp", name: "caster sugar" },
        ],
      },
      {
        title: "For the sesame greens",
        items: [
          { qty: "200g", name: "tenderstem broccoli" },
          { qty: "150g", name: "edamame beans, shelled" },
          { qty: "2 tbsp", name: "toasted sesame seeds" },
          { qty: "1 tbsp", name: "soy sauce" },
          { qty: "1 tsp", name: "sesame oil" },
          { qty: "1 tsp", name: "rice vinegar" },
        ],
      },
    ],
    steps: [
      {
        text: "Whisk together the miso, mirin, sake, soy sauce, sesame oil, and sugar in a small bowl until smooth. Pat the salmon fillets dry with kitchen paper.",
      },
      {
        text: "Place the salmon skin-side down in a shallow dish. Spoon the miso glaze over the flesh side, spreading evenly. Cover and refrigerate for at least 15 minutes, or up to 4 hours for a deeper flavour.",
        tip: "The longer you marinate, the more intensely savoury the result — but even 15 minutes makes a significant difference.",
      },
      {
        text: "Preheat your grill (broiler) to high, or heat a large oven-safe frying pan over medium-high heat. Remove the salmon from the marinade, letting excess drip off.",
      },
      {
        text: "If grilling: place salmon flesh-side up on a foil-lined tray 10cm from the grill element. Grill for 6–8 minutes until the glaze is deeply caramelised and the fish flakes easily. If pan-searing: heat a film of neutral oil, add salmon skin-side down, cook 4 minutes, flip and cook a further 2 minutes.",
      },
      {
        text: "While the salmon cooks, blanch the tenderstem broccoli in boiling salted water for 2 minutes. Drain, then toss with the edamame, soy sauce, sesame oil, rice vinegar, and toasted sesame seeds.",
      },
      {
        text: "Divide the sesame greens between plates and lay a salmon fillet alongside. Serve immediately.",
        tip: "A small mound of steamed short-grain rice alongside is not strictly necessary, but it is the correct choice.",
      },
    ],
  },
  "tahini-dark-chocolate-tart": {
    id: "tahini-dark-chocolate-tart",
    name: "Dark Chocolate & Tahini Tart",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1400&q=85",
    alt: "Dark chocolate tart with tahini swirl on a fluted pastry shell",
    author: "Nour Al-Rashid",
    category: "Dessert",
    cuisine: "Middle Eastern",
    difficulty: "Advanced",
    prepTime: "1 hr 20 min",
    isPremium: true,
    isPurchased: false,
    price: "$4.99",
    likes: 217,
    ingredientGroups: [
      {
        title: "For the pastry",
        items: [
          { qty: "200g", name: "plain flour, plus extra for dusting" },
          { qty: "30g", name: "cocoa powder, sifted" },
          { qty: "100g", name: "unsalted butter, cold, cubed" },
          { qty: "60g", name: "icing sugar, sifted" },
          { qty: "1", unit: "large", name: "egg yolk" },
          { qty: "2–3 tbsp", name: "ice-cold water" },
        ],
      },
      {
        title: "For the filling",
        items: [
          { qty: "250ml", name: "double cream" },
          { qty: "200g", name: "dark chocolate (70%), finely chopped" },
          { qty: "2", name: "eggs, room temperature" },
          { qty: "1 tsp", name: "vanilla extract" },
          { qty: "¼ tsp", name: "flaky sea salt" },
          { qty: "4 tbsp", name: "good-quality tahini, well stirred" },
        ],
      },
    ],
    steps: [
      {
        text: "Make the pastry: pulse flour, cocoa, and icing sugar in a food processor until combined. Add the cold butter and pulse until the mixture resembles coarse breadcrumbs.",
      },
      {
        text: "Add the egg yolk and ice water one tablespoon at a time, pulsing until the dough just comes together — it should hold when pressed but not be sticky. Flatten into a disc, wrap in cling film, and chill for 30 minutes.",
        tip: "Do not overwork the dough. Once it clumps, stop. Overworked pastry becomes tough.",
      },
      {
        text: "Heat the oven to 180°C / 160°C fan. Roll the pastry on a lightly floured surface to 3mm thickness. Line a 23cm loose-bottomed tart tin, pressing gently into the edges. Trim any overhang, then freeze for 15 minutes.",
      },
      {
        text: "Blind bake: line the pastry with baking parchment, fill with baking beans, and bake for 15 minutes. Remove beans and parchment, return to the oven for a further 8 minutes until the base looks dry and matte. Cool completely.",
      },
      {
        text: "Make the filling: bring the cream to a bare simmer in a small saucepan. Remove from heat, add the chopped chocolate, and let sit for 2 minutes. Stir gently from the centre outwards until smooth. Let cool to room temperature (about 15 minutes).",
      },
      {
        text: "Whisk the eggs and vanilla into the cooled chocolate ganache until just combined — do not aerate. Reduce oven to 150°C / 130°C fan. Pour the filling into the tart shell.",
      },
      {
        text: "Spoon the tahini over the surface in 4–5 drops. Use a skewer or the tip of a sharp knife to swirl the tahini into the chocolate — long slow arcs, not frantic stirring. Scatter flaky salt over the top.",
        tip: "Less swirling is more. Two or three deliberate strokes give a cleaner marbled result than over-worked spirals.",
      },
      {
        text: "Bake for 18–22 minutes until the edges are just set but the centre retains a slight wobble. Cool in the tin for 30 minutes, then refrigerate for at least 2 hours before slicing.",
      },
    ],
  },
};

const getFallbackRecipe = (slug) => RECIPES["miso-glazed-salmon"] ?? null;

// ─── Page ─────────────────────────────────────────────────────────────────────

const RecipeDetailPage = async ({ params }) => {
  // params is a Promise in Next.js 15+
  const { slug } = await params;

  const recipe = RECIPES[slug] ?? getFallbackRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      {/*
       * ── HERO SPREAD ──────────────────────────────────────────────────────
       * Asymmetric 55/45 grid on desktop.
       * Left: large image panel (full section height, sharp corners).
       * Right: title block + action row (scrollable content).
       * Mobile: image stacks above content, full width.
       */}
      <section className="w-full bg-background">
        <div className="mx-auto max-w-360">
          {/* Desktop 55/45 grid */}
          <div className="hidden lg:grid lg:grid-cols-[55fr_45fr] lg:min-h-[calc(100vh-4rem)]">
            {/* ── Left: image panel ── */}
            <RecipeDetailHero image={recipe.image} alt={recipe.alt} />

            {/* ── Right: title block + action row ── */}
            <div className="flex flex-col justify-center px-10 xl:px-16 py-20">
              <div className="max-w-xl">
                <RecipeTitleBlock
                  name={recipe.name}
                  author={recipe.author}
                  category={recipe.category}
                  cuisine={recipe.cuisine}
                  difficulty={recipe.difficulty}
                  prepTime={recipe.prepTime}
                  isPremium={recipe.isPremium}
                />

                {/* Client island: action row + report modal */}
                <div className="mt-8">
                  <RecipeDetailClient
                    initialLikes={recipe.likes}
                    initialLiked={false}
                    initialFavorited={false}
                    isPremium={recipe.isPremium}
                    isPurchased={recipe.isPurchased}
                    price={recipe.price}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: stacked layout */}
          <div className="lg:hidden">
            {/* Image — RecipeDetailHero renders the mobile block */}
            <RecipeDetailHero image={recipe.image} alt={recipe.alt} />

            {/* Title + action */}
            <div className="px-6 py-10">
              <RecipeTitleBlock
                name={recipe.name}
                author={recipe.author}
                category={recipe.category}
                cuisine={recipe.cuisine}
                difficulty={recipe.difficulty}
                prepTime={recipe.prepTime}
                isPremium={recipe.isPremium}
              />

              <div className="mt-8">
                <RecipeDetailClient
                  initialLikes={recipe.likes}
                  initialLiked={false}
                  initialFavorited={false}
                  isPremium={recipe.isPremium}
                  isPurchased={recipe.isPurchased}
                  price={recipe.price}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline rule separating hero spread from content body */}
      <div className="w-full border-t border-border" />

      {/*
       * ── CONTENT BODY ─────────────────────────────────────────────────────
       * Two-column on desktop: ingredients (5/12) | instructions (7/12).
       * Stacked on mobile. RecipeContentBody is a pure server component.
       */}
      <RecipeContentBody
        ingredientGroups={recipe.ingredientGroups}
        steps={recipe.steps}
      />
    </>
  );
};

export default RecipeDetailPage;
