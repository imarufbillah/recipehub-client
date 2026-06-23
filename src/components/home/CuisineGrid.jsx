"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CuisineTile from "./CuisineTile";

const tileVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.07 },
  }),
};

// Row heights: rows 1 & 2 each = 200px (tall tile spans both → 200+gap+200 ≈ 412px)
// Row 3 = 220px for the wider bottom band.
const GRID_STYLE = {
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "200px 200px 220px",
};

const CuisineGrid = ({ cuisines }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref}>
      {/* ── Desktop asymmetric grid ── */}
      <div className="hidden md:grid gap-3" style={GRID_STYLE}>
        {cuisines.map((cuisine, i) => (
          <motion.div
            key={cuisine.slug}
            custom={i}
            variants={tileVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={getGridStyle(i)}
            className="h-full min-h-0"
          >
            <CuisineTile {...cuisine} />
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: single-column stack ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {cuisines.map((cuisine, i) => (
          <motion.div
            key={cuisine.slug}
            custom={i}
            variants={tileVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <CuisineTile {...cuisine} mobile />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * Maps tile index to CSS grid placement for the asymmetric desktop layout.
 *
 * Index → grid position:
 *  0 → col 1, rows 1–2 (tall anchor tile, left)
 *  1 → col 2, row 1
 *  2 → col 3, row 1
 *  3 → col 2–3, row 2 (wide, spans two columns)
 *  4 → col 1, row 3
 *  5 → col 2–3, row 3 (wide, spans two columns)
 */
const getGridStyle = (i) => {
  const placements = [
    { gridColumn: "1", gridRow: "1 / 3" }, // tile 0 — tall, left
    { gridColumn: "2", gridRow: "1" }, // tile 1 — top middle
    { gridColumn: "3", gridRow: "1" }, // tile 2 — top right
    { gridColumn: "2 / 4", gridRow: "2" }, // tile 3 — wide, middle-right
    { gridColumn: "1", gridRow: "3" }, // tile 4 — bottom left
    { gridColumn: "2 / 4", gridRow: "3" }, // tile 5 — wide, bottom right
  ];
  return placements[i] ?? {};
};

export default CuisineGrid;
