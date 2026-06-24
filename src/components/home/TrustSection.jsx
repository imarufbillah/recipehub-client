"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut", delay },
  }),
};

const PROOF_POINTS = [
  {
    stat: "12,000+",
    body: "Recipes tested, refined, and written for home cooks who want results — not approximations.",
  },
  {
    stat: "Community-first.",
    body: "Every recipe carries a real author. Rate, save, and follow the cooks whose taste matches yours.",
  },
  {
    stat: "No noise.",
    body: "No life stories before the recipe. No auto-play videos. Just the recipe, exactly when you need it.",
  },
];

const TrustSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <section className="w-full py-28 lg:py-40 bg-foreground">
      <div
        ref={ref}
        className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-0"
      >
        {/* ── Left — large serif statement (7/12 cols) ── */}
        <div className="lg:w-7/12 lg:pr-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-[11px] uppercase tracking-[0.08em] font-medium font-sans text-background/40 mb-8"
          >
            Why RecipeHub
          </motion.p>

          {/*
           * Display statement — 56–72px desktop, 36px mobile.
           * Tight tracking, high contrast against the dark bg.
           * One confident assertion, not a product description.
           */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.12}
            className="font-heading text-[clamp(36px,5.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-background"
          >
            Cooking deserves
            <br />
            better than a
            <br />
            <span className="text-accent dark:text-primary">
              five-star blog post.
            </span>
          </motion.h2>

          {/* Ruled line — editorial texture, desktop only */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.25}
            className="hidden lg:block mt-14 w-12 h-px bg-background/20"
          />
        </div>

        {/* ── Right — stacked proof points (5/12 cols) ── */}
        <div className="lg:w-5/12 lg:pt-2 flex flex-col divide-y divide-background/10">
          {PROOF_POINTS.map(({ stat, body }, i) => (
            <motion.div
              key={stat}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2 + i * 0.12}
              className="py-7 first:pt-0 last:pb-0"
            >
              {/*
               * Stat/label — mono face for numeric values (per design system),
               * sans for short declarative phrases. Primary color on the stat
               * only — one accent moment per proof point, max.
               */}
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent dark:text-primary mb-3">
                {stat}
              </p>

              {/* Body — Body Default, muted against the dark background */}
              <p className="text-[15px] leading-[1.6] font-sans text-background/70">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
