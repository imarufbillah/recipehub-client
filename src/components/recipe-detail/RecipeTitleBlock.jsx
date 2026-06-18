import { Clock, ChefHat, Utensils, BarChart2 } from "lucide-react";

/**
 * Recipe title block — server component.
 *
 * Stack (top to bottom):
 *  1. Optional "Premium" accent badge — accent token, micro-label, radius-sm pill
 *  2. Serif H1 — largest serif moment on this page (44–56px desktop, 28–32px mobile)
 *  3. Author byline — "By [name]" in muted-foreground sans, 14px
 *  4. Metadata strip — category · cuisine · difficulty · prep time
 *     each as icon + label pairing, separated by thin vertical hairline dividers
 *     (not bullet points, not boxed badges) — magazine byline/info-strip feel
 *
 * Props:
 *  name        — recipe name
 *  author      — author display name
 *  category    — e.g. "Dinner"
 *  cuisine     — e.g. "Italian"
 *  difficulty  — e.g. "Intermediate"
 *  prepTime    — e.g. "45 min"
 *  isPremium   — boolean, shows the accent "Premium" badge when true
 */
const MetaDivider = () => (
  <span
    className="hidden sm:inline-block w-px h-3.5 bg-border self-center shrink-0"
    aria-hidden
  />
);

const MetaItem = ({ icon: Icon, label }) => (
  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans whitespace-nowrap">
    <Icon className="size-3 shrink-0 text-muted-foreground/70" aria-hidden />
    {label}
  </span>
);

const RecipeTitleBlock = ({
  name,
  author,
  category,
  cuisine,
  difficulty,
  prepTime,
  isPremium = false,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* ── Premium badge — accent token, only when isPremium ── */}
      {isPremium && (
        <div>
          <span className="inline-flex items-center bg-accent text-accent-foreground text-[11px] uppercase tracking-[0.08em] font-medium font-sans px-3 py-1 rounded-sm">
            Premium
          </span>
        </div>
      )}

      {/* ── H1 — dominant serif, page-title scale ── */}
      <h1 className="font-heading text-[clamp(28px,3.8vw,52px)] leading-[1.05] tracking-[-0.02em] text-foreground">
        {name}
      </h1>

      {/* ── Author byline ── */}
      {author && (
        <p className="text-[14px] font-sans text-muted-foreground leading-none -mt-1">
          By{" "}
          <span className="text-foreground font-medium hover:text-primary transition-colors duration-200 cursor-pointer">
            {author}
          </span>
        </p>
      )}

      {/* ── Metadata strip — icon+label pairs, hairline dividers ── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        {category && (
          <>
            <MetaItem icon={Utensils} label={category} />
            <MetaDivider />
          </>
        )}

        {cuisine && (
          <>
            <MetaItem icon={ChefHat} label={cuisine} />
            <MetaDivider />
          </>
        )}

        {difficulty && (
          <>
            <MetaItem icon={BarChart2} label={difficulty} />
            <MetaDivider />
          </>
        )}

        {prepTime && (
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono whitespace-nowrap">
            <Clock
              className="size-3 shrink-0 text-muted-foreground/70"
              aria-hidden
            />
            {prepTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeTitleBlock;
