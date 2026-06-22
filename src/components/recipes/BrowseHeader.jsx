const BrowseHeader = ({ total, hasFilters = false }) => {
  const formatted = total?.toLocaleString() ?? "—";

  return (
    <section className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 pt-12 pb-8 lg:pt-16 lg:pb-10">
      <div className="max-w-2xl">
        <h1 className="font-heading text-[clamp(28px,4vw,52px)] leading-tight tracking-[-0.02em] text-foreground">
          Browse Recipes
        </h1>

        <p className="mt-2 text-[15px] font-sans text-muted-foreground leading-relaxed">
          {total != null ? (
            <>
              {hasFilters ? "Found " : "Exploring "}
              <span className="text-foreground font-medium">
                {formatted}
              </span>{" "}
              {total === 1 ? "recipe" : "recipes"}
              {hasFilters
                ? " matching your filters."
                : " from our community of cooks."}
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
