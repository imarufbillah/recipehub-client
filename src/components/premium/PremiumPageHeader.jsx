import { Check } from "lucide-react";

const BENEFIT_HIGHLIGHTS = [
  "Publish unlimited recipes",
  "Earn a Premium profile badge",
  "Purchase any recipe on the platform",
  "Priority visibility in search",
];

const PremiumPageHeader = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Eyebrow badge */}
      <span className="inline-flex items-center w-fit bg-accent/10 text-accent border border-accent/20 rounded-sm px-3 py-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans">
        RecipeHub Premium
      </span>

      {/* H1 — Page Title scale, serif, left-aligned */}
      <h1 className="font-heading text-[clamp(32px,4.5vw,56px)] leading-none tracking-tight text-foreground max-w-[12ch]">
        Your kitchen, fully unlocked.
      </h1>

      {/* Supporting copy */}
      <p className="text-[16px] leading-[1.65] text-muted-foreground font-sans max-w-[38ch]">
        One subscription. Unlimited publishing, exclusive access, and the tools
        serious cooks actually need.
      </p>

      {/* Benefit highlights — accent checks, left-aligned teaser */}
      <ul className="flex flex-col gap-3" aria-label="What you get">
        {BENEFIT_HIGHLIGHTS.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check
              className="size-4 shrink-0 text-accent stroke-[1.75]"
              aria-hidden
            />
            <span className="text-[14px] font-sans text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumPageHeader;
