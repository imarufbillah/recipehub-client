import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const FeaturedRecipeCard = ({
  id,
  image,
  alt,
  name,
  category,
  cuisine,
  prepTime,
}) => {
  return (
    <Link
      href={`/recipes/${id}`}
      className={cn(
        "group/card flex flex-col bg-card border border-border rounded-lg overflow-hidden",
        "transition-colors duration-200 hover:border-foreground/20",
      )}
    >
      {/* ── Image block — ~70% of card height ── */}
      <div className="relative w-full" style={{ paddingBottom: "70%" }}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.02]"
        />
      </div>

      {/* ── Content block — remaining ~30% ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
        {/* Recipe name — serif H3 scale */}
        <h3 className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground line-clamp-2">
          {name}
        </h3>

        {/* Micro-tags row — category · cuisine · prep time */}
        <div className="mt-auto flex items-center gap-3 flex-wrap">
          {/* Category tag */}
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {category}
          </span>

          <span className="text-border font-sans text-xs" aria-hidden>
            ·
          </span>

          {/* Cuisine tag */}
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {cuisine}
          </span>

          <span className="text-border font-sans text-xs" aria-hidden>
            ·
          </span>

          {/* Prep time — mono face per design system for numeric stats */}
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono">
            <Clock className="size-3 shrink-0" aria-hidden />
            {prepTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedRecipeCard;
