"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";

const HERO_IMAGES = {
  light: {
    src: "/recipehub-light-mode-banner.jpeg",
    alt: "Cooked food with sliced vegetables in white bowl",
  },
  dark: {
    src: "/recipehub-dark-mode-banner.jpeg",
    alt: "A plate of food on a wooden table",
  },
};

/**
 * Stagger fade-up — subtle 14px translate + opacity, smooth deceleration.
 * Per design system: 600–900ms for hero content, ease-out easing.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.0, ease: "easeOut", delay },
  }),
};

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const image =
    mounted && resolvedTheme === "dark" ? HERO_IMAGES.dark : HERO_IMAGES.light;

  return (
    <section className="relative -mt-16 w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* Left column */}
      <div className="relative z-10 flex flex-col justify-center order-2 lg:order-1 w-full lg:w-[52%] px-6 sm:px-10 md:px-14 lg:pl-16 xl:pl-24 lg:pr-12 py-16 lg:py-0 lg:min-h-screen">
        {/* Top editorial rule + eyebrow — desktop only */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="hidden lg:flex items-center gap-4 mb-8"
        >
          <div className="w-10 h-px bg-primary" />
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            A culinary media platform
          </p>
        </motion.div>

        {/* Mobile eyebrow — no ruled line (cleaner at small size) */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="lg:hidden text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans mb-5"
        >
          A culinary media platform
        </motion.p>

        {/* ── Display headline ──
            Three-line editorial stack, tight leading.
            "worth" in primary (burnt sienna) — per design system: scarcity rule,
            one warm accent moment per screen.
        */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-heading text-[clamp(44px,6.5vw,96px)] leading-[0.93] tracking-[-0.03em] text-foreground"
        >
          Recipes
          <br />
          <span className="text-primary italic">worth</span>
          <br />
          keeping.
        </motion.h1>

        {/* Hairline divider — editorial texture between headline and body */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="mt-8 mb-8 w-full max-w-90 h-px bg-border"
        />

        {/* ── Supporting copy ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="text-[17px] leading-[1.65] text-muted-foreground font-sans max-w-[40ch]"
        >
          Discover, save, and share recipes written for people who take cooking
          seriously.
        </motion.p>

        {/* ── Primary CTA + secondary ghost link ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.58}
          className="mt-10 flex items-center gap-6"
        >
          <Button size="lg" asChild className="px-8 h-11 text-[14px]">
            <Link href="/recipes">Browse Recipes</Link>
          </Button>

          {/* Ghost link — restrained secondary action */}
          <Link
            href="/register"
            className="text-[13px] font-medium font-sans text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-foreground"
          >
            Join free
          </Link>
        </motion.div>

        {/* ── Stats row — social proof, mono numerals as data chips ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.72}
          className="mt-14 pt-10 border-t border-border"
        >
          <HeroStats />
        </motion.div>
      </div>

      {/* Right column */}
      <motion.div
        className="relative order-1 lg:order-2 w-full lg:w-[48%] h-[60vw] sm:h-[55vw] lg:h-auto lg:min-h-screen"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        {/* Primary hero image — theme-aware: warm/bright in light mode, moody/dark in dark mode */}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 1920px) 100vw, 100vw"
          className="object-cover object-center transition-opacity duration-500"
        />

        {/* Left-edge gradient — blends image into the text column on desktop */}
        <div
          className="absolute inset-y-0 left-0 w-20 lg:w-32 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
        />

        {/* Bottom gradient — fades image into background on mobile for clean text stack */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
