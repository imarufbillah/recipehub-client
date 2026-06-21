import { notFound } from "next/navigation";
import { headers } from "next/headers";
import RecipeDetailHero from "@/components/recipe-detail/RecipeDetailHero";
import RecipeTitleBlock from "@/components/recipe-detail/RecipeTitleBlock";
import RecipeDetailClient from "@/components/recipe-detail/RecipeDetailClient";
import RecipeContentBody from "@/components/recipe-detail/RecipeContentBody";
import {
  getRecipeById,
  getLikeStatus,
  getFavoriteStatus,
  getReportStatus,
  getPurchaseStatus,
} from "@/lib/apiClient";
import { auth } from "@/lib/auth";

const normaliseRecipe = (r) => ({
  id: r._id,
  slug: r._id, // slug == _id for API routes
  name: r.recipeName,
  image: r.imageUrl,
  alt: r.recipeName,
  category: r.category,
  cuisine: r.cuisine,
  difficulty: r.difficulty,
  prepTime: `${r.prepTime} min`,
  isPremium: r.isPremium ?? false,
  price: r.price ? `$${r.price}` : null,
  priceAmount: r.price ?? null, // raw number for Stripe (e.g. 3.99)
  // No author / isPurchased in current API shape — resolved separately
  author: null,
  likes: r.likeCount ?? 0,
  // Flatten ingredients array into a single group
  ingredientGroups: [
    {
      items: (r.ingredients ?? []).map((ing) => ({
        qty: String(ing.qty),
        unit: ing.unit,
        name: ing.name,
      })),
    },
  ],
  steps: r.steps ?? [],
});

// ─── Page ─────────────────────────────────────────────────────────────────────

const RecipeDetailPage = async ({ params }) => {
  const { slug } = await params;

  // Fetch recipe and session in parallel; session needed for like/favorite status
  const [raw, session] = await Promise.all([
    getRecipeById(slug),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!raw) {
    notFound();
  }

  const recipe = normaliseRecipe(raw);
  const userId = session?.user?.id ?? null;

  // Only fetch like/favorite/report/purchase status when there's a logged-in user
  const [initialLiked, initialFavorited, initialReported, isPurchased] = userId
    ? await Promise.all([
        getLikeStatus({ userId, recipeId: recipe.id }).catch(() => false),
        getFavoriteStatus({ userId, recipeId: recipe.id }).catch(() => false),
        getReportStatus({ userId, recipeId: recipe.id }).catch(() => false),
        getPurchaseStatus({ userId, recipeId: recipe.id }).catch(() => false),
      ])
    : [false, false, false, false];

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
                    recipeId={recipe.id}
                    recipeName={recipe.name}
                    recipeSlug={recipe.slug}
                    priceAmount={recipe.priceAmount}
                    initialLikes={recipe.likes}
                    initialLiked={initialLiked}
                    initialFavorited={initialFavorited}
                    initialReported={initialReported}
                    isPremium={recipe.isPremium}
                    isPurchased={isPurchased}
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
                  recipeId={recipe.id}
                  recipeName={recipe.name}
                  recipeSlug={recipe.slug}
                  priceAmount={recipe.priceAmount}
                  initialLikes={recipe.likes}
                  initialLiked={initialLiked}
                  initialFavorited={initialFavorited}
                  initialReported={initialReported}
                  isPremium={recipe.isPremium}
                  isPurchased={isPurchased}
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
        isPremium={recipe.isPremium}
        isPurchased={isPurchased}
        recipeId={recipe.id}
        recipeName={recipe.name}
        recipeSlug={recipe.slug}
        priceAmount={recipe.priceAmount}
        price={recipe.price}
      />
    </>
  );
};

export default RecipeDetailPage;
