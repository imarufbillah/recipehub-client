import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Recipe card — reusable across Browse Recipes and "My Recipes" dashboard.
 *
 * Design system spec:
 *  - Card token background, hairline border, radius-lg container.
 *  - Image at top with consistent 3:2 aspect ratio; sharp corners on image
 *    only (radius-none), rounded corners live on the card container via overflow-hidden.
 *  - Serif recipe name (H3 scale, 22px), single muted micro-tag row beneath.
 *  - Border-color shift on hover — no shadow pop, no scale beyond 1.02 on image.
 *  - "Featured" badge uses accent token (accent's primary job in the system).
 *
 * Props:
 *  id        — recipe slug / id for href
 *  image     — image URL
 *  alt       — image alt text
 *  name      — recipe name (serif)
 *  category  — e.g. "Dinner"
 *  cuisine   — e.g. "Italian"
 *  prepTime  — e.g. "35 min"
 *  featured  — optional boolean for "Featured" accent badge
 *  author    — optional author name
 */
const RecipeCard = ({
  id,
  image,
  alt,
  name,
  category,
  cuisine,
  prepTime,
  featured = false,
  author,
}) => {
  return (
    <Link
      href={`/recipes/${id}`}
      className={cn(
        "group/card flex flex-col bg-card border border-border rounded-lg overflow-hidden",
        "transition-colors duration-200 hover:border-foreground/20",
      )}
    >
      {/* ── Image — 3:2 aspect ratio, sharp corners via overflow-hidden on parent ── */}
      <div className="relative w-full aspect-3/2 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.02]"
        />

        {/* Featured badge — accent token, top-left corner */}
        {featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-accent text-accent-foreground text-[11px] uppercase tracking-[0.08em] font-medium font-sans px-2.5 py-1 rounded-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
        {/* Recipe name — serif H3 scale, 22px */}
        <h3 className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground line-clamp-2">
          {name}
        </h3>

        {/* Optional author */}
        {author && (
          <p className="text-[13px] text-muted-foreground font-sans leading-none">
            {author}
          </p>
        )}

        {/* Micro-tags row — category · cuisine · prep time */}
        <div className="mt-auto pt-3 flex items-center gap-3 flex-wrap border-t border-border">
          {/* Category */}
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {category}
          </span>

          <span className="text-border font-sans text-xs" aria-hidden>
            ·
          </span>

          {/* Cuisine */}
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {cuisine}
          </span>

          <span className="text-border font-sans text-xs" aria-hidden>
            ·
          </span>

          {/* Prep time — mono face for numeric data stats */}
          <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono">
            <Clock className="size-3 shrink-0" aria-hidden />
            {prepTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
