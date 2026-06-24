/**
 * HeroStats — a trio of editorial data chips rendered as a horizontal row.
 * Font-mono for the numerals (per design system: numeric stats as data).
 * Server component — purely presentational.
 */
const HeroStats = () => {
  const stats = [
    { value: "2,400+", label: "Recipes" },
    { value: "180+", label: "Contributors" },
    { value: "4.9", label: "Avg. Rating" },
  ];

  return (
    <div className="flex items-center gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="font-mono text-[22px] leading-none tracking-tight text-foreground">
            {stat.value}
          </span>
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
