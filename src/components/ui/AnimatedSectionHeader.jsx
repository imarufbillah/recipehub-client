"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const AnimatedSectionHeader = (props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

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
