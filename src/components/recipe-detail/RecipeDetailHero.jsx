import Image from "next/image";

/**
 * Recipe Detail Hero — asymmetric 55/45 split, committed editorial pattern.
 *
 * Left 55%: large food photograph, absolutely positioned, bleeds full viewport
 * height of the section with sharp corners. No rounding on the image itself —
 * architectural/editorial feel.
 *
 * Right 45%: reserved for the title block and action row (rendered as children
 * or as a sibling in the page — this component handles the image panel only,
 * keeping concerns separated and each component a server component).
 *
 * On mobile: image stacks above content, full-width, 3:2 aspect ratio,
 * sharp corners maintained.
 *
 * Props:
 *  image    — image URL
 *  alt      — image alt text
 *  priority — boolean, true for LCP (default true on detail page)
 */
const RecipeDetailHero = ({ image, alt, priority = true }) => {
  return (
    <>
      {/* ── Desktop: absolute left panel that bleeds full section height ── */}
      {/* The parent section in the page manages the 55/45 layout via CSS grid */}
      {/* This component is the image panel only */}
      <div className="hidden lg:block relative w-full h-full min-h-150 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="55vw"
          className="object-cover object-center"
        />

        {/* Subtle right-edge gradient — blends image into page background */}
        <div
          className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Mobile: full-width stacked image, 3:2 aspect, sharp corners ── */}
      <div className="lg:hidden w-full aspect-3/2 relative overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </>
  );
};

export default RecipeDetailHero;
