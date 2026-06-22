import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFITS = [
  "Unlimited recipe publishing",
  "Premium profile badge",
  "Access to purchase individual recipes",
  "Priority recipe visibility in search",
  "Exclusive premium member community",
];

const PremiumAlreadyMember = () => {
  return (
    <div
      className={cn(
        "w-full",
        "bg-card border border-border rounded-xl",
        "px-10 py-14 flex flex-col items-center gap-0",
        "max-sm:px-6 max-sm:py-10",
      )}
    >
      {/* ── Confirmation block ── */}
      <div className="flex flex-col items-center text-center gap-4 pb-8">
        {/* Accent check icon — the one accent moment on this state */}
        <div
          className="flex items-center justify-center size-12 rounded-full bg-accent/10"
          aria-hidden
        >
          <Check className="size-5 text-accent stroke-[1.75]" />
        </div>

        {/* Serif H3 confirmation */}
        <h2 className="font-heading text-[clamp(22px,3vw,28px)] leading-snug tracking-[-0.02em] text-foreground">
          You&rsquo;re already a Premium member.
        </h2>

        {/* Muted supporting line */}
        <p className="text-[15px] leading-[1.6] text-muted-foreground font-sans max-w-[34ch]">
          Your subscription is active and renews monthly.
        </p>

        {/* Ghost button → Dashboard */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mt-1 text-[13px] font-sans text-muted-foreground hover:text-foreground"
        >
          <Link href="/dashboard">Go to Dashboard →</Link>
        </Button>
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-border" aria-hidden />

      {/* ── De-emphasized benefits reminder ── */}
      <ul
        className="w-full flex flex-col gap-4 pt-8"
        aria-label="Your Premium benefits"
      >
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <Check
              className="size-4 shrink-0 mt-0.5 text-muted-foreground stroke-[1.75]"
              aria-hidden
            />
            {/* Muted labels — de-emphasized, they already have these */}
            <span className="text-[15px] leading-[1.6] text-muted-foreground font-sans">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumAlreadyMember;
