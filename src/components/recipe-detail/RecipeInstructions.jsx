/**
 * Instructions column — server component.
 *
 * Design intent:
 *  - Serif H3 "Instructions" heading.
 *  - Steps as ordered list — the step NUMBER is a small display element,
 *    not a generic browser <ol> marker. Rendered as a mono/serif numeral
 *    beside the step text, treated as typographic texture.
 *  - Step text: Body Large (18px) sans, 1.6 line-height — actively read while
 *    cooking, so maximum legibility is the priority.
 *  - Generous vertical spacing between steps (not cramped).
 *  - Optional "tip" field per step — muted italic sans callout beneath the step.
 *
 * Props:
 *  steps — array of { text: string, tip?: string }
 */
const RecipeInstructions = ({ steps = [] }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Section heading */}
      <h3 className="font-heading text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.01em] text-foreground">
        Instructions
      </h3>

      <ol className="flex flex-col gap-10" role="list">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-6 items-start">
            {/* ── Step number — typographic display element ── */}
            {/*
             * Mono face (per design system: numeric stats presented as data).
             * Large, muted, tight — acts as a visual anchor, not a label.
             * The number intentionally contrasts with the sans body text beside it.
             */}
            <span
              className="shrink-0 font-mono text-[clamp(28px,3vw,42px)] leading-none text-muted-foreground/25 select-none pt-0.5"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* ── Step content ── */}
            <div className="flex flex-col gap-3 pt-1">
              {/* Step text — Body Large, highest legibility */}
              <p className="text-[18px] leading-[1.65] font-sans text-foreground">
                {step.text}
              </p>

              {/* Optional tip — muted italic callout */}
              {step.tip && (
                <p className="text-[14px] leading-[1.6] font-sans italic text-muted-foreground border-l-2 border-border pl-4">
                  {step.tip}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;
