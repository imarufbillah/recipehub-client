import Image from "next/image";
import Link from "next/link";

/**
 * Editorial cuisine tile — full-bleed cropped photo, serif cuisine name
 * overlaid at the bottom-left (magazine category tile treatment).
 *
 * Layers (bottom → top):
 *  1. Photography (fills the tile completely)
 *  2. Permanent bottom gradient scrim — ensures text legibility on any photo
 *  3. Hover darken overlay — subtle, not a color shift, just a dimming
 *  4. Text — serif name + muted recipe count, bottom-left
 *
 * Corner radius: rounded-sm (near-sharp) — per design system: "images and
 * large hero media should feel more architectural, sharper corners."
 *
 * Props:
 *  slug       — URL slug for the cuisine filter
 *  name       — display name (e.g. "Italian")
 *  recipeCount — e.g. 142
 *  image      — photo URL
 *  alt        — image alt text
 *  tall       — boolean, makes the tile taller (for layout asymmetry)
 */
const CuisineTile = ({ slug, name, recipeCount, image, alt, tall = false }) => {
  return (
    <Link
      href={`/recipes?cuisine=${slug}`}
      className="group/tile relative block w-full overflow-hidden rounded-sm"
      style={{ height: tall ? "420px" : "280px" }}
    >
      {/* ── Photography ── */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 group-hover/tile:scale-[1.03]"
      />

      {/* ── Permanent gradient scrim — bottom two-thirds, for text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.1 0.01 50 / 0.85) 0%, oklch(0.1 0.01 50 / 0.3) 45%, transparent 75%)",
        }}
      />

      {/* ── Hover darken overlay — dims the whole tile subtly ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-350 opacity-0 group-hover/tile:opacity-100"
        style={{ background: "oklch(0.1 0.01 50 / 0.25)" }}
      />

      {/* ── Text — bottom-left, serif name + muted recipe count ── */}
      <div className="absolute bottom-0 left-0 p-5 z-10">
        <p className="font-heading text-[clamp(20px,2.2vw,28px)] leading-tight tracking-[-0.02em] text-white">
          {name}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.08em] font-medium font-sans text-white/60">
          {recipeCount} recipes
        </p>
      </div>
    </Link>
  );
};

export default CuisineTile;
