const PremiumPageHeader = () => {
  return (
    <div className="flex flex-col items-center text-center gap-5">
      {/* Accent badge — one of the system's designated accent uses */}
      <span className="inline-flex items-center bg-accent/10 text-accent border border-accent/20 rounded-sm px-3 py-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans">
        RecipeHub Premium
      </span>

      {/* H1 — Page Title scale, serif, tight tracking */}
      <h1 className="font-heading text-[clamp(28px,4.5vw,52px)] leading-[1.05] tracking-tight text-foreground max-w-[14ch]">
        Your kitchen, fully unlocked.
      </h1>

      {/* Single muted supporting line — max 20 words, plain statement */}
      <p className="text-[15px] leading-[1.6] text-muted-foreground font-sans max-w-[44ch]">
        Publish unlimited recipes, earn a premium badge, and unlock access to
        purchase any recipe on the platform.
      </p>
    </div>
  );
};

export default PremiumPageHeader;
