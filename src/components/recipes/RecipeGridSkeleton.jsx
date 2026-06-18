import { cn } from "@/lib/utils";

/**
 * Loading skeleton for the recipe grid.
 * Matches the exact card dimensions so there's zero layout shift when
 * real content loads.
 *
 * - Card-shaped placeholder blocks using muted token bg.
 * - Subtle CSS pulse animation (tw-animate-css "animate-pulse").
 * - 3:2 image area + content area mirrors RecipeCard structure exactly.
 * - Staggered animation delay per card for a more organic feel.
 *
 * Props:
 *  count — number of skeleton cards to render (default 8)
 */
const SkeletonCard = ({ delay = 0 }) => (
  <div
    className="flex flex-col bg-card border border-border rounded-lg overflow-hidden animate-pulse"
    style={{ animationDelay: `${delay}ms` }}
    aria-hidden="true"
  >
    {/* Image placeholder — 3:2 aspect ratio */}
    <div className="w-full aspect-3/2 bg-muted" />

    {/* Content placeholder */}
    <div className="flex flex-col px-5 pt-4 pb-5 gap-3">
      {/* Recipe name — two lines */}
      <div className="space-y-2">
        <div className="h-5 bg-muted rounded-sm w-full" />
        <div className="h-5 bg-muted rounded-sm w-3/4" />
      </div>

      {/* Author line */}
      <div className="h-3.5 bg-muted rounded-sm w-1/2" />

      {/* Micro-tag row */}
      <div className="pt-3 flex items-center gap-3 border-t border-border">
        <div className="h-3 bg-muted rounded-sm w-14" />
        <div className="h-3 bg-muted rounded-sm w-1" />
        <div className="h-3 bg-muted rounded-sm w-16" />
        <div className="h-3 bg-muted rounded-sm w-1" />
        <div className="h-3 bg-muted rounded-sm w-12" />
      </div>
    </div>
  </div>
);

const RecipeGridSkeleton = ({ count = 8 }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      role="status"
      aria-label="Loading recipes…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} delay={i * 60} />
      ))}
    </div>
  );
};

export default RecipeGridSkeleton;
