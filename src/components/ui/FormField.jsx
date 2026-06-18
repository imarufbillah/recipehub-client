import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * FormField — shared label-above field wrapper used across all forms.
 *
 * Composes the shadcn Label with a consistent micro-label typographic style
 * (11px uppercase tracking) that matches the RecipeHub design system spec.
 * The input/textarea/select itself is passed as children.
 *
 * Props:
 *  htmlFor   — links label to input id
 *  label     — label text
 *  optional  — shows a de-emphasized "(optional)" suffix
 *  className — extra classes on the outer wrapper div
 *  children  — the input element
 */
const FormField = ({
  htmlFor,
  label,
  optional = false,
  className,
  children,
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <Label
      htmlFor={htmlFor}
      className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
    >
      {label}
      {optional && (
        <span className="normal-case tracking-normal text-muted-foreground/60 font-normal ml-1">
          (optional)
        </span>
      )}
    </Label>
    {children}
  </div>
);

export default FormField;
