import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// ─── Compact stat card — Admin Mode density (16-20px padding, not 24-32px) ───

const StripCard = ({ label, children, className }) => (
  <div
    className={cn(
      "bg-card border border-border rounded-lg flex flex-col gap-2.5 px-5 py-4",
      className,
    )}
  >
    <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
      {label}
    </p>
    {children}
  </div>
);

// ─── Type badge — inline within stat cards ────────────────────────────────────

const TypeBadge = ({ variant }) => {
  const styles =
    variant === "subscription"
      ? "bg-accent/15 text-accent border-transparent"
      : "bg-secondary text-secondary-foreground border-transparent";

  return (
    <Badge
      className={cn(
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm w-fit",
        styles,
      )}
    >
      {variant === "subscription" ? "Subscription" : "Recipe"}
    </Badge>
  );
};

// ─── Main stat strip ──────────────────────────────────────────────────────────

const TransactionStatStrip = ({
  totalRevenue = "$0.00",
  subscriptionCount = 0,
  recipePurchaseCount = 0,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {/* ── Total Revenue ── */}
    <StripCard label="Total Revenue">
      <p className="font-mono font-semibold text-foreground leading-none tracking-tight text-[clamp(22px,2.5vw,30px)]">
        {totalRevenue}
      </p>
    </StripCard>

    {/* ── Premium Subscriptions ── */}
    <StripCard label="Premium Subscriptions">
      <div className="flex items-end justify-between gap-2">
        <p className="text-[clamp(22px,2.5vw,30px)] font-sans font-semibold text-foreground leading-none tracking-tight">
          {subscriptionCount.toLocaleString()}
        </p>
        <TypeBadge variant="subscription" />
      </div>
    </StripCard>

    {/* ── Recipe Purchases ── */}
    <StripCard label="Recipe Purchases">
      <div className="flex items-end justify-between gap-2">
        <p className="text-[clamp(22px,2.5vw,30px)] font-sans font-semibold text-foreground leading-none tracking-tight">
          {recipePurchaseCount.toLocaleString()}
        </p>
        <TypeBadge variant="recipe" />
      </div>
    </StripCard>
  </div>
);

export default TransactionStatStrip;
