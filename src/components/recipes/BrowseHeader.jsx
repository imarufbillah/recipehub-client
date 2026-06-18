/**
 * Browse Recipes page header — server component.
 *
 * Design intent:
 *  - Compact utility-page header, NOT a full hero.
 *  - Left-aligned serif H1 (page title scale: 44–56px desktop / 28–32px mobile).
 *  - Muted-foreground sans subline with total recipe count.
 *  - Generous but measured top padding — this page prioritises the filter
 *    bar and grid, so the header should feel like a section opening, not a
 *    landing page statement.
 *
 * Props:
 *  totalCount — total number of recipes (dynamic, passed from server)
 */
const BrowseHeader = ({ totalCount }) => {
  const formattedCount = totalCount?.toLocaleString() ?? "—";

  return (
    <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 pt-12 pb-8 lg:pt-16 lg:pb-10">
      <div className="max-w-2xl">
        {/* Page H1 — serif, H1 scale */}
        <h1 className="font-heading text-[clamp(28px,4vw,52px)] leading-tight tracking-[-0.02em] text-foreground">
          Browse Recipes
        </h1>

        {/* Subline — muted sans, recipe count indicator */}
        <p className="mt-2 text-[15px] font-sans text-muted-foreground leading-relaxed">
          {totalCount != null ? (
            <>
              Exploring{" "}
              <span className="text-foreground font-medium">
                {formattedCount}
              </span>{" "}
              {totalCount === 1 ? "recipe" : "recipes"} from our community of
              cooks.
            </>
          ) : (
            "Discover recipes from our community of cooks."
          )}
        </p>
      </div>
    </section>
  );
};

export default BrowseHeader;
