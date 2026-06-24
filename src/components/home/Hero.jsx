"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";

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
  return (
    /*
     * -mt-16 pulls the hero flush behind the fixed navbar (h-16 = 64px).
     * The public layout adds pt-16 to <main>, so we cancel it intentionally —
     * the hero bleeds under the transparent navbar on desktop.
     * Mobile stacks vertically: image on top, text panel below.
     */
    <section className="relative -mt-16 w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background">

      {/* ══════════════════════════════════════════════════════════
          LEFT COLUMN — editorial text panel (desktop: 52%, mobile: full)
          ══════════════════════════════════════════════════════════ */}
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
          className="mt-8 mb-8 w-full max-w-[360px] h-px bg-border"
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

      {/* ══════════════════════════════════════════════════════════
          RIGHT COLUMN — editorial image panel (desktop: 48%, mobile: full-width above text)
          ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative order-1 lg:order-2 w-full lg:w-[48%] h-[60vw] sm:h-[55vw] lg:h-auto lg:min-h-screen"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        {/* Primary hero image — sharp corners, editorial feel */}
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85"
          alt="Chef plating an elegant dish — editorial food photography"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-center"
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

        {/* ── Caption card — overlapping bottom-left on desktop ──
            Surfaces recipe metadata at the image boundary — editorial pull-out moment.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
          className="absolute bottom-10 left-0 lg:-left-6 z-20 hidden lg:block"
        >
          <div className="bg-card border border-border rounded-lg px-5 py-4 shadow-none">
            {/* Serif dish name */}
            <p className="font-heading text-[16px] leading-snug tracking-[-0.01em] text-card-foreground">
              Seared Salmon, Dashi Broth
            </p>
            {/* Meta line */}
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
              25 min · Serves 2 · Premium
            </p>
            {/* Accent dot — the accent color's one appearance, a "Featured" signal */}
            <div className="mt-2.5 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-accent font-sans">
                Chef's Pick
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Issue number — top-right editorial stamp ──
            Thin mono text, low-opacity, purely typographic texture.
        */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1.1}
          className="absolute top-8 right-6 hidden lg:flex flex-col items-end gap-1 pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/60 mix-blend-overlay">
            Vol. 01
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary-foreground/60 mix-blend-overlay">
            2026
          </span>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          DECORATIVE VERTICAL RULE — desktop only, separates the two columns
          at the boundary. A single hairline, pure editorial texture.
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute top-1/4 bottom-1/4 left-[52%] w-px bg-border hidden lg:block pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
