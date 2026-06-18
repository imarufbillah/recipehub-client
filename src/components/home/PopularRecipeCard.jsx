import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Popular recipe card — compact, list-like anatomy.
 * Deliberately distinct from FeaturedRecipeCard:
 *  - Fixed square thumbnail (left, small) vs image-dominant tall block
 *  - Smaller serif name (18px vs 22px)
 *  - Horizontal layout vs vertical stack
 *  - Like count + author prominent vs micro-tags
 *  - Denser padding — signals "more items, scan quickly"
 *
 * Props:
 *  id         — recipe slug / id
 *  image      — thumbnail URL
 *  alt        — image alt text
 *  name       — recipe name
 *  author     — author display name
 *  likes      — like count (number)
 *  category   — e.g. "Breakfast"
 *  prepTime   — e.g. "20 min"
 */
const PopularRecipeCard = ({
  id,
  image,
  alt,
  name,
  author,
  likes,
  category,
  prepTime,
}) => {
  return (
    <Link
      href={`/recipes/${id}`}
      className={cn(
        "group/card flex items-center gap-4 bg-card border border-border rounded-lg",
        "px-4 py-3.5 transition-colors duration-200 hover:border-foreground/20",
      )}
    >
      {/* ── Thumbnail — fixed square, sharp corners ── */}
      <div className="relative shrink-0 w-18 h-18 overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="72px"
          className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.04]"
        />
      </div>

      {/* ── Content — takes remaining width ── */}
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">
        {/* Category + prep-time — micro-label, single row */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {category}
          </span>
          <span className="text-border text-xs" aria-hidden>
            ·
          </span>
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono">
            {prepTime}
          </span>
        </div>

        {/* Recipe name — serif, 18px (smaller than Featured's 22px) */}
        <h3 className="font-heading text-[18px] leading-snug tracking-[-0.01em] text-card-foreground truncate">
          {name}
        </h3>

        {/* Author + like count row */}
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-[13px] text-muted-foreground font-sans truncate">
            {author}
          </span>

          {/* Like count — minimal icon, muted, never primary */}
          <span className="flex items-center gap-1 shrink-0 text-[12px] text-muted-foreground font-sans">
            <Heart className="size-3.5 shrink-0" aria-hidden />
            <span>{likes.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PopularRecipeCard;
