"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteRecipe } from "@/lib/apiClient";

/**
 * DeleteRecipeModal — destructive confirmation dialog.
 *
 * Design system notes:
 *  - DialogContent handles: portal, scrim (foreground at low opacity via
 *    the overlay), focus-trap, Escape-to-close, fade + upward translate
 *    entry animation — all from the shared Dialog primitive.
 *  - No close button (showCloseButton={false}) — the Cancel button IS the
 *    close affordance; an X in the corner on a destructive confirmation
 *    adds ambiguity about which action it performs.
 *  - Destructive button: the ONE place a solid destructive-fill button is
 *    appropriate — the color weight correctly signals irreversibility.
 *  - Single small Trash2 line-icon at top — not an illustration, not large.
 *    Left-aligned with the heading, reads as a type-level marker not decoration.
 *
 * Props:
 *  open        — boolean controlling Dialog open state
 *  onClose     — called when the dialog should close (cancel or after delete)
 *  recipeName  — shown in the supporting copy to name the specific record
 *  recipeId    — passed to the delete API call
 *  onDeleted   — optional callback fired after a successful delete (e.g. to
 *                remove the row from local state without a full page refresh)
 */
const DeleteRecipeModal = ({
  open,
  onClose,
  recipeName,
  recipeId,
  onDeleted,
}) => {
  const [isPending, startDelete] = useTransition();

  const handleOpenChange = (isOpen) => {
    if (!isOpen && !isPending) onClose();
  };

  const handleDelete = () => {
    startDelete(async () => {
      toast.promise(await deleteRecipe(recipeId), {
        loading: "Deleting recipe…",
        success: "Recipe deleted.",
        error: (err) => err?.message ?? "Could not delete the recipe.",
      });
      onDeleted?.(recipeId);
      onClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="rounded-xl px-7 py-8 sm:max-w-sm gap-0"
        showCloseButton={false}
      >
        {/* ── Icon + heading ── */}
        <DialogHeader className="mb-5">
          {/* Small destructive-token line-icon — left-aligned, not centered,
              reads as a typographic marker rather than an illustration */}
          <Trash2
            className="size-5 text-destructive stroke-[1.5] mb-3"
            aria-hidden
          />
          <DialogTitle className="font-heading text-[22px] leading-snug tracking-[-0.01em] text-card-foreground">
            Delete this recipe?
          </DialogTitle>
        </DialogHeader>

        {/* ── Supporting copy ── */}
        <p className="text-[14px] font-sans text-muted-foreground leading-relaxed mb-8">
          This will permanently remove{" "}
          <span className="text-foreground font-medium">
            &ldquo;{recipeName}&rdquo;
          </span>{" "}
          and cannot be undone.
        </p>

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isPending}
            className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
          >
            Cancel
          </Button>

          {/* Solid destructive fill — the one earned use of this color as a
              button background in the entire product. Weight = severity. */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="px-5 font-sans text-[13px] font-medium bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? "Deleting…" : "Delete Recipe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRecipeModal;
