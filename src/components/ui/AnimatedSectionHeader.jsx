"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

/**
 * Scroll-reveal wrapper around SectionHeader.
 * Keeps SectionHeader itself a server component — this thin client island
 * handles the animation trigger only.
 *
 * Motion: fade-up 12px, 0.65s ease-out, fires once when header enters viewport.
 * Used by every below-fold section so SectionHeader headings reveal consistently.
 */
const AnimatedSectionHeader = (props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <SectionHeader {...props} />
    </motion.div>
  );
};

export default AnimatedSectionHeader;
