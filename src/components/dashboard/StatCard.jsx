import { cn } from "@/lib/utils";

/**
 * Stat card — reusable across user and admin overview pages.
 *
 * Design system premium stat treatment:
 *  - Card token background, hairline border, radius-lg.
 *  - Icon tinted with primary or accent token — one of the few acceptable
 *    icon-color moments in the system. Default: primary.
 *  - Micro-label UPPERCASE stat name (e.g., "TOTAL RECIPES") in muted-foreground.
 *  - The NUMBER itself is the design moment: rendered large in font-mono
 *    (numeric data per design system) — this is what separates premium stat
 *    cards from generic bootstrap widgets.
 *  - Two density modes controlled by `dense` prop:
 *      dense=false (user overview): px-6 py-6, large mono numeral (clamp 36–48px)
 *      dense=true  (admin overview): px-5 py-4, tighter mono numeral (clamp 28–36px)
 *
 * Props:
 *  label       — micro-label string, e.g. "Total Recipes"
 *  value       — display value string, e.g. "1,204" or "Premium"
 *  icon        — Lucide icon component
 *  iconColor   — "primary" | "accent" | "muted" (default "primary")
 *  dense       — boolean, admin mode tighter density (default false)
 *  children    — optional slot for custom content below the value
 *                (used by Premium Status card)
 */
const StatCard = ({
  label,
  value,
  icon: Icon,
  iconColor = "primary",
  dense = false,
  children,
}) => {
  const iconClass =
    {
      primary: "text-primary",
      accent: "text-accent",
      muted: "text-muted-foreground",
    }[iconColor] ?? "text-primary";

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg flex flex-col",
        dense ? "px-5 py-4 gap-3" : "px-6 py-6 gap-4",
      )}
    >
      {/* ── Icon + label row ── */}
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            className={cn("shrink-0", dense ? "size-3.5" : "size-4", iconClass)}
            aria-hidden
          />
        )}
        <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
          {label}
        </span>
      </div>

      {/* ── Stat value — font-mono large numeral ── */}
      <p
        className={cn(
          "font-mono font-semibold text-foreground leading-none tracking-tight",
          dense ? "text-[clamp(28px,3vw,36px)]" : "text-[clamp(36px,4vw,48px)]",
        )}
      >
        {value}
      </p>

      {/* ── Optional custom slot (e.g. Premium status badge / upgrade CTA) ── */}
      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
};

export default StatCard;
