"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Report modal — design system modal pattern.
 *
 * - Card background, radius-xl, generous padding.
 * - Appears: soft fade + 8px upward translate (per design system modal spec).
 * - Scrim: foreground token at low opacity (not pure black).
 * - Serif modal title.
 * - Radio reason list: selected state uses primary-token outline dot —
 *   NOT a heavy colored box around the whole option.
 * - Optional textarea — styled per Input Field pattern (card fill,
 *   border token, radius-md, label above in micro-label style, ring on focus).
 * - Primary "Submit Report" button + ghost cancel.
 * - Body scroll locked while open, Escape key closes.
 *
 * Props:
 *  open      — boolean controlling visibility
 *  onClose   — callback to close the modal
 *  onSubmit  — (reason: string, detail: string) => void
 */

const REPORT_REASONS = [
  { id: "spam", label: "Spam or self-promotion" },
  { id: "offensive", label: "Offensive or harmful content" },
  { id: "copyright", label: "Copyright or plagiarism issue" },
  { id: "inaccurate", label: "Inaccurate or misleading recipe" },
  { id: "other", label: "Other" },
];

const ReportModal = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const firstRadioRef = useRef(null);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus first radio on open
      setTimeout(() => firstRadioRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key to close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) return;
    onSubmit?.(reason, detail);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after exit animation (300ms)
    setTimeout(() => {
      setReason("");
      setDetail("");
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Scrim — foreground token at low opacity (not pure black) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "oklch(from var(--foreground) l c h / 0.45)",
            }}
            onClick={handleClose}
            aria-hidden
          />

          {/* ── Modal panel ── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "fixed z-50 inset-x-4 top-1/2 -translate-y-1/2",
              "sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md",
              "bg-card border border-border rounded-xl shadow-none",
              "px-7 py-8",
            )}
          >
            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 mb-7">
              <h2
                id="report-modal-title"
                className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground"
              >
                Report this recipe
              </h2>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="shrink-0 mt-0.5 size-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" />
              </button>
            </div>

            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <p className="font-heading text-[18px] text-foreground">
                  Thank you for your report.
                </p>
                <p className="text-[14px] font-sans text-muted-foreground leading-relaxed max-w-xs">
                  Our team will review your submission and take action if
                  needed.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="mt-2 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent px-0"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* ── Reason radio list ── */}
                <fieldset className="flex flex-col gap-0 border-t border-border">
                  <legend className="sr-only">Select a reason</legend>

                  {REPORT_REASONS.map(({ id, label }, i) => {
                    const isSelected = reason === id;
                    return (
                      <label
                        key={id}
                        className={cn(
                          "flex items-center gap-3.5 py-3.5 border-b border-border cursor-pointer",
                          "transition-colors duration-150",
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {/* Hidden native radio for a11y */}
                        <input
                          type="radio"
                          name="report-reason"
                          value={id}
                          checked={isSelected}
                          onChange={() => setReason(id)}
                          className="sr-only"
                          ref={i === 0 ? firstRadioRef : null}
                        />

                        {/* Custom radio dot — primary outline when selected */}
                        <span
                          className={cn(
                            "shrink-0 size-4 rounded-full border transition-all duration-150",
                            "flex items-center justify-center",
                            isSelected ? "border-primary" : "border-border",
                          )}
                          aria-hidden
                        >
                          {isSelected && (
                            <span className="size-2 rounded-full bg-primary" />
                          )}
                        </span>

                        {/* Label — body default sans */}
                        <span className="text-[14px] font-sans leading-snug">
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                {/* ── Optional detail textarea ── */}
                <div className="flex flex-col gap-2 mt-6">
                  {/* Label — above input, micro-label style per design system */}
                  <label
                    htmlFor="report-detail"
                    className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
                  >
                    Additional context{" "}
                    <span className="normal-case tracking-normal text-muted-foreground/60">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="report-detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="Describe the issue in more detail…"
                    rows={3}
                    className={cn(
                      "w-full bg-card border border-input rounded-md",
                      "px-3 py-2.5 text-[14px] font-sans text-foreground",
                      "placeholder:text-muted-foreground resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
                      "transition-all duration-200",
                    )}
                  />
                </div>

                {/* ── Footer buttons ── */}
                <div className="flex items-center justify-between gap-3 mt-7">
                  {/* Ghost cancel — left */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
                  >
                    Cancel
                  </Button>

                  {/* Primary submit — right, disabled until a reason is selected */}
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    disabled={!reason}
                    className="px-5 font-sans text-[13px] font-medium"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
