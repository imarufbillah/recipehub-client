import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches FeaturedRecipeCard exactly:
 *  - paddingBottom 70% image area
 *  - author line (12px)
 *  - serif name two lines (22px, h-6)
 *  - three micro-tag pills in a row
 *  - "View Recipe" ghost link
 */
const FeaturedCardSkeleton = ({ delay = 0 }) => (
  <div
    className="flex flex-col bg-card border border-border rounded-lg overflow-hidden animate-pulse"
    style={{ animationDelay: `${delay}ms` }}
    aria-hidden="true"
  >
    {/* Image — 70% padding-bottom aspect ratio */}
    <div className="relative w-full shrink-0" style={{ paddingBottom: "70%" }}>
      <div className="absolute inset-0 bg-muted" />
    </div>

    {/* Content block */}
    <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
      {/* Author */}
      <Skeleton className="h-3 w-24" />
      {/* Name — two lines */}
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      {/* Micro-tags */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-1.5" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-1.5" />
        <Skeleton className="h-3 w-12" />
      </div>
      {/* View Recipe link */}
      <Skeleton className="h-3 w-20 mt-1" />
    </div>
  </div>
);

const FeaturedRecipesSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <FeaturedCardSkeleton key={i} delay={i * 70} />
    ))}
  </div>
);

export default FeaturedRecipesSkeleton;
