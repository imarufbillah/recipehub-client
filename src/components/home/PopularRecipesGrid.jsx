"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PopularRecipeCard from "./PopularRecipeCard";

/**
 * Animated grid wrapper for Popular recipe cards.
 * Stagger is tighter (60ms) than Featured (80ms) to suit the denser
 * list-like anatomy — faster cascade feels right for compact items.
 *
 * Grid: 1 column on mobile, 2 columns md+.
 * Cards are horizontal so 2 columns is already dense — 3 would be too tight.
 */
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay: i * 0.06,
    },
  }),
};

const PopularRecipesGrid = ({ recipes }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {recipes.map((recipe, i) => (
        <motion.div
          key={recipe.id}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <PopularRecipeCard {...recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default PopularRecipesGrid;
