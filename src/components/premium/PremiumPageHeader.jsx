const PremiumPageHeader = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Eyebrow badge */}
      <span className="inline-flex items-center w-fit bg-accent/10 text-accent border border-accent/20 rounded-sm px-3 py-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans">
        RecipeHub Premium
      </span>

      {/* H1 */}
      <h1 className="font-heading text-[clamp(32px,4.5vw,56px)] leading-none tracking-tight text-foreground max-w-[12ch]">
        Your kitchen, fully unlocked.
      </h1>

      {/* Editorial positioning — who this is for, not what it includes */}
      <p className="text-[16px] leading-[1.65] text-muted-foreground font-sans max-w-[38ch]">
        For cooks who treat the kitchen seriously. One subscription removes
        every limit — publish freely, build an audience, and access the recipes
        worth paying for.
      </p>

      {/* Secondary line — sets expectation without repeating card features */}
      <p className="text-[15px] leading-[1.65] text-muted-foreground font-sans max-w-[36ch]">
        No ads. No paywalled tutorials. Just the tools that let your cooking
        speak for itself.
      </p>
    </div>
  );
};

export default PremiumPageHeader;
