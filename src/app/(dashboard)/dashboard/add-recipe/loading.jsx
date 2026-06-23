import Skeleton from "@/components/ui/Skeleton";

/**
 * Add Recipe page skeleton.
 * The page header is static. The form itself is gated on session data
 * (isPremium, recipeCount) so we show an accurate form shape while
 * the session resolves.
 *
 * Matches RecipeForm sections exactly:
 *   Basic Info | Recipe Photo | Access & Pricing | Ingredients | Instructions | Submit
 */
const RecipeFormSkeleton = () => (
  <div className="flex flex-col gap-8 max-w-2xl animate-pulse">
    {/* Basic Information */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-36 mb-2" />
      {/* Recipe Name */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-32" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
      {/* Category + Cuisine */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-2.5 w-14" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>
      {/* Difficulty + Prep Time + Servings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </section>

    {/* Recipe Photo */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-28 mb-2" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-40 w-full rounded-md" />
      </div>
    </section>

    {/* Access & Pricing */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-36 mb-2" />
      <Skeleton className="h-16 w-full rounded-md" />
    </section>

    {/* Ingredients */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-24 mb-2" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-9 w-20 rounded-md shrink-0" />
          <Skeleton className="h-9 w-20 rounded-md shrink-0" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>
      ))}
    </section>

    {/* Instructions */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-24 mb-2" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-1.5" />
          <Skeleton className="h-20 flex-1 rounded-md" />
        </div>
      ))}
    </section>

    {/* Submit row */}
    <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
      <Skeleton className="h-3 w-64 hidden sm:block" />
      <Skeleton className="h-10 w-full sm:w-36 rounded-md" />
    </div>
  </div>
);

const AddRecipeLoading = () => (
  <div className="px-5 md:px-8 py-8">
    <div className="mb-8 animate-pulse">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-3 w-56 mt-2" />
    </div>
    <RecipeFormSkeleton />
  </div>
);

export default AddRecipeLoading;
