import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches the recipe detail page layout exactly:
 *
 * Desktop (lg+): 55/45 asymmetric grid, min-h viewport
 *   Left 55%  — full-bleed image area
 *   Right 45% — title block (badge? + H1 + author + meta strip) + action row
 *
 * Mobile: stacked — image (aspect-3/2) → title block → action row
 *
 * Below the hero: hairline rule + two-column content body
 *   Left 5/12  — ingredients heading + list
 *   Right 7/12 — instructions heading + steps
 */

// ── Title block skeleton ────────────────────────────────────────────────────────
const TitleBlockSkeleton = () => (
  <div className="flex flex-col gap-5 animate-pulse">
    {/* Optional premium badge */}
    <Skeleton className="h-5 w-20 rounded-sm" />
    {/* H1 — three lines, narrowing */}
    <div className="flex flex-col gap-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-4/5" />
      <Skeleton className="h-10 w-2/3" />
    </div>
    {/* Author byline */}
    <Skeleton className="h-3.5 w-32" />
    {/* Meta strip — 4 icon+label pairs */}
    <div className="flex items-center gap-4 pt-1">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-px" />
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-3 w-px" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-px" />
      <Skeleton className="h-3 w-14" />
    </div>
  </div>
);

// ── Action row skeleton (like / favorite / buy / report) ───────────────────────
const ActionRowSkeleton = () => (
  <div className="flex items-center gap-3 mt-8 animate-pulse">
    <Skeleton className="h-10 w-28 rounded-md" />
    <Skeleton className="h-10 w-10 rounded-md" />
    <Skeleton className="h-10 w-10 rounded-md" />
    <Skeleton className="h-10 w-10 rounded-md" />
  </div>
);

// ── Content body skeleton (ingredients + instructions) ─────────────────────────
const ContentBodySkeleton = () => (
  <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-16 lg:py-24 animate-pulse">
    <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 gap-14">
      {/* Ingredients column */}
      <div className="lg:col-span-5 lg:border-r lg:border-border lg:pr-16 flex flex-col gap-4">
        <Skeleton className="h-5 w-28" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-3.5 w-8 shrink-0" />
            <Skeleton
              className="h-3.5 flex-1"
              style={{ maxWidth: `${55 + (i % 3) * 15}%` }}
            />
          </div>
        ))}
      </div>

      {/* Instructions column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Skeleton className="h-5 w-24" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1.5 flex-1 pt-0.5">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
              {i % 2 === 0 && <Skeleton className="h-3.5 w-3/5" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Full page skeleton ──────────────────────────────────────────────────────────
const RecipeDetailSkeleton = () => (
  <>
    {/* Hero section */}
    <section className="w-full bg-background">
      <div className="mx-auto max-w-360">
        {/* Desktop 55/45 */}
        <div className="hidden lg:grid lg:grid-cols-[55fr_45fr] lg:min-h-[calc(100vh-4rem)]">
          {/* Image panel */}
          <div className="bg-muted animate-pulse" />
          {/* Right: title + actions */}
          <div className="flex flex-col justify-center px-10 xl:px-16 py-20">
            <div className="max-w-xl">
              <TitleBlockSkeleton />
              <ActionRowSkeleton />
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="lg:hidden">
          <div className="w-full aspect-3/2 bg-muted animate-pulse" />
          <div className="px-6 py-10">
            <TitleBlockSkeleton />
            <ActionRowSkeleton />
          </div>
        </div>
      </div>
    </section>

    {/* Separator */}
    <div className="w-full border-t border-border" />

    {/* Content body */}
    <ContentBodySkeleton />
  </>
);

export default RecipeDetailSkeleton;
