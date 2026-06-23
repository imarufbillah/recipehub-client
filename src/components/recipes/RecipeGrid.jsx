"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RecipeCard from "./RecipeCard";

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
          className="h-full"
        >
          <RecipeCard {...recipe} />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeGrid;
