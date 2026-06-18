"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FeaturedRecipeCard from "./FeaturedRecipeCard";

/**
 * Animated grid wrapper — staggered fade-up on scroll into view.
 * Kept as a separate "use client" island so the parent FeaturedRecipes
 * section can remain a server component.
 *
 * Motion intent (per design system):
 *  - 8–16px translate + opacity, ease-out, 600–900ms per item
 *  - Stagger 80ms per card
 *  - Triggers once when 20% of the grid enters the viewport
 */
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
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

const FeaturedRecipesGrid = ({ recipes }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {recipes.map((recipe, i) => (
        <motion.div
          key={recipe.id}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <FeaturedRecipeCard {...recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedRecipesGrid;
