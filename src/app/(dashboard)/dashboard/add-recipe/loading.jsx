import Skeleton from "@/components/ui/Skeleton";

/**
 * Add Recipe skeleton — mirrors RecipeForm's two-column xl:grid-cols-2 layout.
 * Left column:  Basic Information + Recipe Photo
 * Right column: Access & Pricing + Ingredients + Instructions
 * Footer:       static helper text + submit button skeleton
 *
 * Static:  page heading, all section labels, all field labels, ingredient column headers
 * Dynamic: subtitle (plan-dependent), all input values, submit button state
 */

// ── Left column ───────────────────────────────────────────────────────────────
const LeftColumnSkeleton = () => (
  <div className="flex flex-col gap-8">
    {/* Basic Information */}
    <section className="flex flex-col gap-5">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
        Basic Information
      </p>
      {/* Recipe Name */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
          Recipe Name
        </p>
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      {/* Short Description */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
          Short Description{" "}
          <span className="text-muted-foreground normal-case tracking-normal font-normal">
            (optional)
          </span>
        </p>
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
      {/* Category + Cuisine — 2 col */}
      <div className="grid grid-cols-2 gap-4">
        {["Category", "Cuisine"].map((label) => (
          <div key={label} className="flex flex-col gap-1.5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
              {label}
            </p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
      {/* Difficulty + Prep Time + Servings — 3 col */}
      <div className="grid grid-cols-3 gap-4">
        {["Difficulty", "Prep Time (min)", "Servings"].map((label) => (
          <div key={label} className="flex flex-col gap-1.5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
              {label}
            </p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        ))}
      </div>
    </section>

    {/* Recipe Photo */}
    <section className="flex flex-col gap-5">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
        Recipe Photo
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
          Cover Image
        </p>
        <Skeleton className="h-40 w-full rounded-md" />
      </div>
    </section>
  </div>
);

// ── Right column ──────────────────────────────────────────────────────────────
const RightColumnSkeleton = () => (
  <div className="flex flex-col gap-8">
    {/* Access & Pricing */}
    <section className="flex flex-col gap-5">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
        Access &amp; Pricing
      </p>
      <Skeleton className="h-16 w-full rounded-md" />
    </section>

    {/* Ingredients */}
    <section className="flex flex-col gap-5">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
        Ingredients
      </p>
      {/* Column header labels */}
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60 font-sans">
        <span className="w-20">Qty</span>
        <span className="w-20">Unit</span>
        <span className="flex-1">Name</span>
      </div>
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
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
        Instructions
      </p>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-1.5" />
          <Skeleton className="h-20 flex-1 rounded-md" />
        </div>
      ))}
    </section>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const AddRecipeLoading = () => (
  <div className="px-5 md:px-8 py-8">
    {/* Static heading; subtitle is plan-dependent (dynamic) */}
    <div className="mb-8">
      <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
        Add Recipe
      </h2>
      <div className="h-3 w-56 bg-muted/60 rounded-sm animate-pulse mt-2" />
    </div>

    <div className="flex flex-col gap-6 animate-pulse">
      {/* Two-column grid — mirrors xl:grid-cols-2 in RecipeForm */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-8 items-start">
        <LeftColumnSkeleton />
        <RightColumnSkeleton />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        <p className="text-[12px] font-sans text-muted-foreground hidden sm:block">
          Your recipe will be visible to the community after publishing.
        </p>
        <Skeleton className="h-10 w-full sm:w-36 rounded-md shrink-0" />
      </div>
    </div>
  </div>
);

export default AddRecipeLoading;
