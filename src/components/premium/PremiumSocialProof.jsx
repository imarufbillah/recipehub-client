import Image from "next/image";
import { cn } from "@/lib/utils";

const QUOTES = [
  {
    quote: "Worth every cent. I've published 30 recipes since upgrading.",
    name: "Layla M.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=56&q=80&auto=format",
  },
  {
    quote: "The premium badge alone changed how people interact with my work.",
    name: "Tobias R.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&q=80&auto=format",
  },
  {
    quote: "Finally a food platform that treats cooks like professionals.",
    name: "Sena K.",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=56&q=80&auto=format",
  },
];

const PremiumSocialProof = () => {
  return (
    <div className="w-full">
      {/* Horizontal strip — flex row with hairline separators between items */}
      <div className="flex items-stretch divide-x divide-border">
        {QUOTES.map(({ quote, name, avatar }, i) => (
          <div
            key={name}
            className={cn(
              "flex flex-col items-center text-center gap-3 px-5 py-0",
              // First and last get no extra side padding to stay flush with card edges
              i === 0 && "pl-0",
              i === QUOTES.length - 1 && "pr-0",
            )}
          >
            {/* Quote — italic muted sans */}
            <p className="text-[13px] leading-[1.65] text-muted-foreground font-sans italic">
              &ldquo;{quote}&rdquo;
            </p>

            {/* Attribution — avatar + name */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="relative flex size-6 shrink-0 rounded-full overflow-hidden bg-muted">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  sizes="24px"
                  className="object-cover object-center"
                />
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumSocialProof;
