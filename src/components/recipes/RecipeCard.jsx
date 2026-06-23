import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, Users, ArrowRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const RecipeCard = ({
  id,
  image,
  alt,
  name,
  category,
  cuisine,
  difficulty,
  prepTime,
  servings,
  isPremium = false,
  likeCount = 0,
  author,
}) => {
  return (
    <div
      className={cn(
        "group/card flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden",
        "transition-colors duration-200 hover:border-foreground/20",
      )}
    >
      {/* ── Image — 3:2 aspect ratio ── */}
      <div className="relative w-full aspect-3/2 shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.02]"
        />

        {/* Premium badge — crown icon, accent token, top-left */}
        {isPremium && (
          <div className="absolute top-3 left-3 z-10 flex items-center justify-center size-7 bg-accent text-accent-foreground rounded-sm">
            <Crown className="size-3.5" aria-label="Premium recipe" />
          </div>
        )}

        {/* Like count — bottom-right overlay */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-sm px-2 py-1">
          <Heart
            className="size-3 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <span className="text-[11px] font-sans font-medium text-muted-foreground tabular-nums">
            {likeCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
        {/* Author */}
        {author && (
          <p className="text-[12px] font-sans text-muted-foreground leading-none truncate">
            {author}
          </p>
        )}

        {/* Recipe name — serif H3 scale, grows to fill available space */}
        <h3 className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground line-clamp-2 flex-1">
          {name}
        </h3>

        {/* Stat row — servings + prep time */}
        {(servings || prepTime) && (
          <div className="flex items-center gap-3">
            {servings && (
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono">
                <Users className="size-3 shrink-0" aria-hidden />
                {servings}
              </span>
            )}
            {servings && prepTime && (
              <span className="text-border text-xs" aria-hidden>
                ·
              </span>
            )}
            {prepTime && (
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-mono">
                <Clock className="size-3 shrink-0" aria-hidden />
                {prepTime}
              </span>
            )}
          </div>
        )}

        {/* Micro-tags row — category · cuisine · difficulty */}
        <div className="pt-3 flex items-center gap-3 flex-wrap border-t border-border">
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {category}
          </span>

          <span className="text-border font-sans text-xs" aria-hidden>
            ·
          </span>

          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            {cuisine}
          </span>

          {difficulty && (
            <>
              <span className="text-border font-sans text-xs" aria-hidden>
                ·
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                {difficulty}
              </span>
            </>
          )}
        </div>

        {/* View Recipe button */}
        <Link
          href={`/recipes/${id}`}
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 self-start",
            "text-[12px] font-sans font-medium text-muted-foreground",
            "transition-colors duration-150 hover:text-primary",
            "focus-visible:outline-none focus-visible:underline underline-offset-2",
          )}
          aria-label={`View recipe: ${name}`}
        >
          View Recipe
          <ArrowRight
            className="size-3 shrink-0 transition-transform duration-150 group-hover/card:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
