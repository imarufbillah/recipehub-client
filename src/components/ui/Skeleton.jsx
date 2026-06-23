import { cn } from "@/lib/utils";

/**
 * Skeleton — single animated muted block.
 * All skeletons in the project compose from this primitive.
 * Accepts any className for sizing/shaping.
 */
const Skeleton = ({ className }) => (
  <div
    className={cn("animate-pulse rounded-sm bg-muted", className)}
    aria-hidden="true"
  />
);

export default Skeleton;
