import Image from "next/image";
import Link from "next/link";

const CuisineTile = ({ slug, name, image, alt, mobile = false }) => {
  return (
    <Link
      href={`/recipes?cuisine=${slug}`}
      className={[
        "group/tile relative block w-full overflow-hidden rounded-sm",
        mobile ? "h-50" : "h-full",
      ].join(" ")}
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

      {/* ── Text — bottom-left, serif name only ── */}
      <div className="absolute bottom-0 left-0 p-5 z-10">
        <p className="font-heading text-[clamp(20px,2.2vw,28px)] leading-tight tracking-[-0.02em] text-white">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default CuisineTile;
