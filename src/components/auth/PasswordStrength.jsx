"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Password requirement helper — shown beneath the password field on Register.
 *
 * Three inline requirement lines that individually shift from muted-foreground
 * to a success treatment (check icon + foreground text) as each condition is
 * met while the user types.
 *
 * Design system:
 *  - Muted-foreground at rest (Caption/Meta scale: 13px sans).
 *  - Met state: small Lucide Check icon + foreground text.
 *    Using foreground rather than accent — keeps color discipline (accent
 *    used only once per screen as the design system mandates).
 *  - No animation on the transition — instant color shift, per Admin Mode
 *    philosophy of minimal motion on utility UI.
 *
 * Props:
 *  password — the current password string
 */

const REQUIREMENTS = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (p) => p.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
];

const PasswordStrength = ({ password }) => {
  return (
    <ul
      className="flex flex-col gap-1.5 mt-2"
      role="list"
      aria-label="Password requirements"
    >
      {REQUIREMENTS.map(({ id, label, test }) => {
        const met = password.length > 0 && test(password);
        return (
          <li
            key={id}
            className={cn(
              "flex items-center gap-2 text-[13px] font-sans transition-colors duration-150",
              met ? "text-foreground" : "text-muted-foreground",
            )}
            aria-label={`${label}: ${met ? "met" : "not met"}`}
          >
            {/* Check icon slot — always occupies space to prevent layout shift */}
            <span className="shrink-0 size-3.5 flex items-center justify-center">
              {met ? (
                <Check className="size-3.5 text-accent" aria-hidden />
              ) : (
                <span className="size-1.5 rounded-full bg-border" aria-hidden />
              )}
            </span>
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordStrength;
