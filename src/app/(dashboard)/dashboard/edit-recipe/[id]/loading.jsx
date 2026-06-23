import Skeleton from "@/components/ui/Skeleton";

/**
 * Edit Recipe page skeleton.
 * Same form shape as Add Recipe, but the page header has a "Cancel" ghost
 * link on the right and the subtitle shows the recipe name (API-fetched).
 */
const EditRecipeFormSkeleton = () => (
  <div className="flex flex-col gap-8 max-w-2xl animate-pulse">
    {/* Basic Information */}
    <section className="flex flex-col gap-5">
      <Skeleton className="h-2.5 w-36 mb-2" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-32" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </section>

    {/* Recipe Photo — shows existing image placeholder */}
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

    {/* Footer: Cancel + Save Changes */}
    <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
      <Skeleton className="h-3 w-28 hidden sm:block" />
      <div className="flex items-center gap-3 ml-auto">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  </div>
);

const EditRecipeLoading = () => (
  <div className="px-5 md:px-8 py-8">
    {/* Header with Cancel link on the right */}
    <div className="mb-8 flex items-start justify-between gap-4 animate-pulse">
      <div>
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3 w-48 mt-2" />
      </div>
      <Skeleton className="h-3 w-14 shrink-0" />
    </div>
    <EditRecipeFormSkeleton />
  </div>
);

export default EditRecipeLoading;
