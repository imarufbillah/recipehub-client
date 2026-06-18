"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/**
 * Report modal — now uses shadcn Dialog, RadioGroup, Textarea, Label.
 *
 * Dialog handles: portal, overlay scrim, focus-trap, Escape-to-close,
 * body scroll lock, and the close button — all removed from hand-rolled code.
 *
 * RadioGroup handles: accessible radio semantics, keyboard navigation,
 * data-checked state — custom dot indicators preserved via className.
 *
 * Design system constraints maintained:
 *  - Serif modal title (font-heading).
 *  - Radio selected state: primary-token outline dot (not a heavy color box).
 *  - Textarea: border-input, radius-md, ring on focus.
 *  - Ghost cancel + primary submit.
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) return;
    onSubmit?.(reason, detail);
    setSubmitted(true);
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      onClose();
      // Reset after Dialog exit animation
      setTimeout(() => {
        setReason("");
        setDetail("");
        setSubmitted(false);
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/*
       * DialogContent handles: overlay scrim, portal, focus-trap,
       * Escape-to-close, close button, body scroll lock, entry animation.
       * Override radius and padding to match RecipeHub design system (radius-xl).
       */}
      <DialogContent
        className="rounded-xl px-7 py-8 sm:max-w-md gap-0"
        showCloseButton={!submitted}
      >
        <DialogHeader className="mb-7">
          <DialogTitle className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground">
            Report this recipe
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="font-heading text-[18px] text-foreground">
              Thank you for your report.
            </p>
            <p className="text-[14px] font-sans text-muted-foreground leading-relaxed max-w-xs">
              Our team will review your submission and take action if needed.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenChange(false)}
              className="mt-2 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent px-0"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* ── Reason list — shadcn RadioGroup ── */}
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="flex flex-col gap-0 border-t border-border"
              aria-label="Select a reason"
            >
              {REPORT_REASONS.map(({ id, label }) => (
                <Label
                  key={id}
                  htmlFor={`reason-${id}`}
                  className={cn(
                    "flex items-center gap-3.5 py-3.5 border-b border-border cursor-pointer",
                    "font-normal text-[14px] transition-colors duration-150",
                    reason === id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/*
                   * RadioGroupItem: data-checked drives border-primary + bg-primary.
                   * The white indicator dot inside is handled by the shadcn component.
                   * Size overridden to match the design system's 16px radio dot.
                   */}
                  <RadioGroupItem
                    id={`reason-${id}`}
                    value={id}
                    className="size-4 shrink-0 border-input data-checked:border-primary data-checked:bg-primary"
                  />
                  {label}
                </Label>
              ))}
            </RadioGroup>

            {/* ── Optional detail textarea ── */}
            <div className="flex flex-col gap-2 mt-6">
              <Label
                htmlFor="report-detail"
                className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
              >
                Additional context{" "}
                <span className="normal-case tracking-normal text-muted-foreground/60 font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="report-detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Describe the issue in more detail…"
                rows={3}
                className="resize-none bg-card"
              />
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between gap-3 mt-7">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleOpenChange(false)}
                className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
              >
                Cancel
              </Button>
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
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
