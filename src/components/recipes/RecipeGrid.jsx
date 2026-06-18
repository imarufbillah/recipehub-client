"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RecipeCard from "./RecipeCard";

/**
 * Animated recipe grid — staggered fade-up on scroll into view.
 * Separated as a "use client" island so parent components can stay server-side.
 *
 * Motion intent (design system):
 *  - 12px translate + opacity, ease-out, 0.7s duration per card
 *  - Stagger: 80ms per card
 *  - Triggers once when 10% of the grid enters the viewport
 *
 * Grid: 4 col desktop / 2 col tablet / 1 col mobile, 24–32px gutters.
 *
 * Props:
 *  recipes — array of recipe objects matching RecipeCard props
 */
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
};

const RecipeGrid = ({ recipes }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
    >
      {recipes.map((recipe, i) => (
        <motion.div
          key={recipe.id}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <RecipeCard {...recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid;
