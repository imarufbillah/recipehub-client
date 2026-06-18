/**
 * Ingredients column — server component.
 *
 * Design intent:
 *  - Serif H3 "Ingredients" heading.
 *  - Each ingredient is a line item with a hairline border-bottom divider —
 *    NOT bullet points. Reads like a printed ingredient list in a cookbook.
 *  - Quantity/unit presented in a slightly heavier weight, name in default weight.
 *  - Generous line-height; items should feel spacious, not cramped.
 *  - Optional section grouping (e.g., "For the sauce") via a muted uppercase label.
 *
 * Props:
 *  groups — array of { title?: string, items: { qty: string, unit?: string, name: string }[] }
 *           A single group with no title is the common case.
 */
const IngredientItem = ({ qty, unit, name }) => (
  <li className="flex items-baseline gap-3 py-3 border-b border-border last:border-b-0">
    {/* Quantity + unit — slightly emphasized, mono for numeric data */}
    <span className="shrink-0 min-w-14 text-[13px] font-mono text-muted-foreground uppercase tracking-[0.04em] text-right leading-snug">
      {qty}
      {unit ? ` ${unit}` : ""}
    </span>

    {/* Ingredient name — body default, sans */}
    <span className="text-[15px] font-sans text-foreground leading-snug">
      {name}
    </span>
  </li>
);

const RecipeIngredients = ({ groups = [] }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Section heading */}
      <h3 className="font-heading text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.01em] text-foreground">
        Ingredients
      </h3>

      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col">
          {/* Optional group title — muted micro-label */}
          {group.title && (
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans mb-1 pb-2 border-b border-border">
              {group.title}
            </p>
          )}

          <ul className="flex flex-col" role="list">
            {group.items.map((item, ii) => (
              <IngredientItem
                key={ii}
                qty={item.qty}
                unit={item.unit}
                name={item.name}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipeIngredients;
