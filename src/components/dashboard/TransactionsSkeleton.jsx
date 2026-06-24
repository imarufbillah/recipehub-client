import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches the Transactions page layout exactly:
 *
 * Static:  "Transactions" heading, Export button, table column headers
 * Dynamic: transaction count (subtitle), stat strip values, toolbar inputs, all row data
 *
 * 1. TransactionStatStrip — 3 stat tiles (labels static, values dynamic)
 * 2. Toolbar row — Type | Status | Date range | Search (labels static, inputs dynamic)
 * 3. Table — 7 columns with static headers + skeleton row data
 */

// ── Stat strip skeleton ────────────────────────────────────────────────────────
const STAT_LABELS = ["Total Revenue", "Subscriptions", "Recipe Purchases"];

const StatStripSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {STAT_LABELS.map((label) => (
      <div
        key={label}
        className="bg-card border border-border rounded-lg px-5 py-4 flex flex-col gap-2.5"
      >
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
          {label}
        </p>
        <Skeleton className="h-7 w-20" />
      </div>
    ))}
  </div>
);

// ── Toolbar skeleton ───────────────────────────────────────────────────────────
const ToolbarSkeleton = () => (
  <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3 animate-pulse">
    <div className="flex flex-col gap-1">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
        Type
      </p>
      <Skeleton className="h-8 w-64 rounded-md" />
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
        Status
      </p>
      <Skeleton className="h-8 w-40 rounded-md" />
    </div>
    <div className="flex items-end gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
          From
        </p>
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
          To
        </p>
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>
    </div>
    <div className="flex flex-col gap-1 ml-auto">
      <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
        Search
      </p>
      <Skeleton className="h-8 w-52 rounded-md" />
    </div>
  </div>
);

// ── Table skeleton ─────────────────────────────────────────────────────────────
const HEADERS = ["Type", "User", "Recipe", "Amount", "Status", "Date", "Ref"];
const COL_WIDTHS = ["w-32", "w-44", "w-36", "w-20", "w-24", "w-28", "w-32"];

const TableSkeleton = () => (
  <div className="mt-5 w-full overflow-x-auto rounded-lg border border-border animate-pulse">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {HEADERS.map((h) => (
            <th
              key={h}
              className="px-4 py-2.5 text-left whitespace-nowrap text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
            >
              {h}
            </th>
          ))}
          <th className="px-4 py-2.5 text-right text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, ri) => (
          <tr
            key={ri}
            className="h-14 border-b border-border last:border-b-0"
            style={{ animationDelay: `${ri * 35}ms` }}
          >
            <td className="px-4">
              <Skeleton className="h-5 w-28 rounded-sm" />
            </td>
            <td className="px-4">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-6 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>
            </td>
            <td className="px-4">
              <Skeleton className="h-3 w-32" />
            </td>
            <td className="px-4">
              <Skeleton className="h-3 w-14" />
            </td>
            <td className="px-4">
              <Skeleton className="h-5 w-20 rounded-sm" />
            </td>
            <td className="px-4">
              <Skeleton className="h-3 w-24" />
            </td>
            <td className="px-4">
              <Skeleton className="h-3 w-28" />
            </td>
            <td className="px-4">
              <div className="flex justify-end gap-1">
                <Skeleton className="size-7 rounded" />
                <Skeleton className="size-7 rounded" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TransactionsSkeleton = () => (
  <div className="px-5 md:px-8 py-8">
    {/* Static heading + Export button */}
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Transactions
        </h2>
        {/* Transaction count is API-derived */}
        <div className="h-3 w-32 bg-muted/60 rounded-sm animate-pulse mt-2" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-[13px] shrink-0"
        disabled
      >
        <Download className="size-3.5" aria-hidden />
        Export
      </Button>
    </div>

    <StatStripSkeleton />
    <ToolbarSkeleton />
    <TableSkeleton />
  </div>
);

export default TransactionsSkeleton;
