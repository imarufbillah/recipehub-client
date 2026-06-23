import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches PopularRecipeCard exactly:
 *  - w-18 h-18 square thumbnail (left)
 *  - category · prepTime micro-row
 *  - serif name h-5 (18px)
 *  - author + like count row
 */
const PopularCardSkeleton = ({ delay = 0 }) => (
  <div
    className="flex items-center gap-4 bg-card border border-border rounded-lg px-4 py-3.5 animate-pulse"
    style={{ animationDelay: `${delay}ms` }}
    aria-hidden="true"
  >
    {/* Thumbnail */}
    <div className="shrink-0 w-18 h-18 rounded-sm bg-muted" />

    {/* Content */}
    <div className="flex flex-col flex-1 min-w-0 gap-2">
      {/* Category · prep-time */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-2.5 w-1.5" />
        <Skeleton className="h-2.5 w-12" />
      </div>
      {/* Name */}
      <Skeleton className="h-5 w-4/5" />
      {/* Author + likes */}
      <div className="flex items-center justify-between gap-2 mt-0.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  </div>
);

const PopularRecipesSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <PopularCardSkeleton key={i} delay={i * 55} />
    ))}
  </div>
);

export default PopularRecipesSkeleton;
