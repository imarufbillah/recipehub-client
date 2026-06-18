/**
 * Home page — placeholder hero tall enough to test navbar scroll behavior.
 * The transparent navbar becomes opaque (card bg + border) after scrolling 80px.
 * Real hero section will replace this block when the home page is designed.
 */
const Home = () => {
  return (
    <>
      {/* Hero placeholder — full-viewport, dark bg to show transparent navbar */}
      <section className="relative h-screen bg-foreground flex items-center justify-center overflow-hidden -mt-16">
        <div className="text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted mb-4">
            Scroll down to test navbar transition
          </p>
          <h1 className="font-heading text-[64px] md:text-[88px] leading-none tracking-[-0.03em] text-background">
            RecipeHub
          </h1>
          <p className="mt-6 text-lg text-muted max-w-sm mx-auto font-sans">
            A culinary media platform for serious home cooks.
          </p>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted font-medium">
            Scroll
          </span>
          <div className="w-px h-10 bg-muted/40" />
        </div>
      </section>

      {/* Content block — gives enough height to trigger scroll and see navbar change */}
      <section className="py-40 flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-sans">
          Navbar should now have card background with hairline border.
        </p>
      </section>
    </>
  );
};

export default Home;
