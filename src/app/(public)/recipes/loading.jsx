import RecipeGridSkeleton from "@/components/recipes/RecipeGridSkeleton";

/**
 * Browse Recipes page loading state.
 *
 * Static (renders at full opacity, no skeleton):
 *  - H1 "Browse Recipes" — never changes
 *  - Subtitle prefix "Exploring" and suffix "recipes from our community of cooks."
 *
 * Dynamic (skeleton only on the fetched parts):
 *  - The count number inside the subtitle — small inline pulse block
 *  - Filter bar categories/cuisines pills
 *  - Recipe grid
 */

const FilterBarSkeleton = () => (
  <div className="sticky top-16 z-10 w-full border-b border-border bg-background/95 backdrop-blur-sm">
    <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-3 flex items-center gap-3 overflow-x-auto">
      {/* Search input placeholder */}
      <div className="h-8 w-52 bg-muted rounded-md shrink-0 animate-pulse" />
      {/* Filter pill placeholders — variable widths mirror real category/cuisine labels */}
      {[72, 80, 64, 96, 68, 88].map((w, i) => (
        <div
          key={i}
          className="h-8 bg-muted rounded-md shrink-0 animate-pulse"
          style={{ width: `${w}px`, animationDelay: `${i * 45}ms` }}
        />
      ))}
    </div>
  </div>
);

const RecipesLoading = () => (
  <>
    {/* ── Page header ─────────────────────────────────────────────────────── */}
    <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 pt-12 pb-8 lg:pt-16 lg:pb-10">
      <div className="max-w-2xl">
        {/* H1 — fully static, never API-fetched */}
        <h1 className="font-heading text-[clamp(28px,4vw,52px)] leading-tight tracking-[-0.02em] text-foreground">
          Browse Recipes
        </h1>

        {/* Subtitle — static prefix/suffix, skeleton only on the count number */}
        <p className="mt-2 text-[15px] font-sans text-muted-foreground leading-relaxed flex items-baseline gap-1.5 flex-wrap">
          Exploring
          {/* Count number — the only fetched value in this line */}
          <span
            className="inline-block h-[1em] w-7 rounded-sm bg-muted animate-pulse align-middle"
            aria-hidden="true"
          />
          recipes from our community of cooks.
        </p>
      </div>
    </section>

    {/* ── Filter bar — categories & cuisines are API-fetched ───────────────── */}
    <FilterBarSkeleton />

    {/* ── Recipe grid ──────────────────────────────────────────────────────── */}
    <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-10 lg:py-14">
      <RecipeGridSkeleton count={12} />
    </div>
  </>
);

export default RecipesLoading;
