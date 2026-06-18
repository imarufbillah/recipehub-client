"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroCaptionCard from "./HeroCaptionCard";

/**
 * Fade-up variants — subtle 12px translate + opacity, ease-out.
 * Per design system: 600–900ms for scroll-reveal / hero content.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut", delay },
  }),
};

const Hero = () => {
  return (
    /*
     * -mt-16 pulls the hero flush behind the fixed navbar (h-16 = 64px).
     * The public layout adds pt-16 to <main>, so we cancel it here
     * intentionally — the hero bleeds under the transparent navbar.
     */
    <section className="relative -mt-16 w-full min-h-screen flex items-stretch overflow-hidden">
      {/* ── Left column — 60% — headline / copy / CTA ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[60%] px-6 md:px-14 lg:pl-16 lg:pr-20 py-32 lg:py-0">
        {/* Eyebrow label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans mb-6"
        >
          A culinary media platform
        </motion.p>

        {/* Display headline — 72–96px desktop, 40–48px mobile */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="font-heading text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-[-0.03em] text-foreground"
        >
          Recipes
          <br />
          <span className="text-primary">worth</span>
          <br />
          keeping.
        </motion.h1>

        {/* Supporting copy — Body Large, muted, max ~18 words */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-8 text-[18px] leading-[1.6] text-muted-foreground font-sans max-w-[38ch]"
        >
          Discover, save, and share recipes written for people who take cooking
          seriously.
        </motion.p>

        {/* Single primary CTA — resist adding a second */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="mt-10"
        >
          <Button size="lg" asChild className="px-8 h-11 text-sm">
            <Link href="/recipes">Browse Recipes</Link>
          </Button>
        </motion.div>

        {/* Subtle ruled line below — editorial texture */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="mt-16 w-16 h-px bg-border hidden lg:block"
        />
      </div>

      {/* ── Right column — 40% — editorial image, bleeds to viewport edge ── */}
      <motion.div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[42%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
      >
        {/* Image — sharp corners (radius-sm only on left edge), full-bleed height */}
        <div className="relative h-full w-full overflow-hidden rounded-l-sm">
          <Image
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85"
            alt="Beautifully plated pasta dish on a dark surface — editorial food photography"
            fill
            priority
            sizes="42vw"
            className="object-cover object-center"
          />

          {/* Subtle left-edge gradient blending image into page background */}
          <div
            className="absolute inset-y-0 left-0 w-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background), transparent)",
            }}
          />
        </div>

        {/* Caption card — overlapping bottom-left corner of the image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="absolute bottom-12 -left-5 z-20"
        >
          <HeroCaptionCard dish="Pasta al Pomodoro" meta="30 min · Serves 2" />
        </motion.div>
      </motion.div>

      {/* ── Mobile image — full-width, stacks below text (handled in page) ── */}
      {/* Mobile layout is managed via page-level stacking in page.jsx */}
    </section>
  );
};

export default Hero;
