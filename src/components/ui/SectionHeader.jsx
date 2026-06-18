import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Reusable section header — serif H2 baseline-aligned left, ghost "View All"
 * link pinned right on the same row. Never centered — centered section headers
 * read as template defaults; left-aligned reads as editorial confidence.
 *
 * Props:
 *  title      — the H2 text
 *  href       — optional link target for "View All" (omit to hide the link)
 *  linkLabel  — overrides default "View All" label
 *  className  — extra classes on the wrapper
 */
const SectionHeader = ({ title, href, linkLabel = "View All", className }) => {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", className)}>
      <h2 className="font-heading text-[clamp(24px,3vw,40px)] leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </h2>

      {href && (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="shrink-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent px-0"
        >
          <Link href={href}>{linkLabel} →</Link>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
