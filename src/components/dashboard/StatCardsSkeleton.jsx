import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches StatCard exactly:
 *  - card background, hairline border, rounded-lg
 *  - icon (size-4) + micro-label row
 *  - large mono numeral (clamp 36–48px non-dense, 28–36px dense)
 *  - optional children slot
 *
 * Props:
 *  count  — number of cards (default 4)
 *  dense  — admin mode tighter padding (default false)
 */
const StatCardSkeleton = ({ dense = false }) => (
  <div
    className={`bg-card border border-border rounded-lg flex flex-col animate-pulse ${
      dense ? "px-5 py-4 gap-3" : "px-6 py-6 gap-4"
    }`}
    aria-hidden="true"
  >
    {/* Icon + label row */}
    <div className="flex items-center gap-2">
      <Skeleton
        className={dense ? "size-3.5 rounded-sm" : "size-4 rounded-sm"}
      />
      <Skeleton className="h-2.5 w-24 rounded-sm" />
    </div>
    {/* Large mono value */}
    <Skeleton className={`rounded-sm ${dense ? "h-8 w-20" : "h-10 w-24"}`} />
  </div>
);

const StatCardsSkeleton = ({ count = 4, dense = false }) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ${
      dense ? "gap-4" : "gap-5"
    } animate-pulse`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <StatCardSkeleton key={i} dense={dense} />
    ))}
  </div>
);

export default StatCardsSkeleton;
