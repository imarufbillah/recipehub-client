import Skeleton from "@/components/ui/Skeleton";

/**
 * Matches the Transactions page layout exactly:
 *
 * 1. TransactionStatStrip — 3 stat tiles side by side
 *    Each tile: micro-label + large mono value
 *
 * 2. Toolbar row — Type segmented control | Status select | Date range | Search
 *
 * 3. Table — 7 columns (Type | User | Recipe | Amount | Status | Date | Ref)
 *    + right-aligned copy/view icon actions
 */

// ── Stat strip skeleton ────────────────────────────────────────────────────────
const StatStripSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-card border border-border rounded-lg px-5 py-4 flex flex-col gap-2.5"
      >
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-7 w-20" />
      </div>
    ))}
  </div>
);

// ── Toolbar skeleton ───────────────────────────────────────────────────────────
const ToolbarSkeleton = () => (
  <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3 animate-pulse">
    {/* Type segmented control */}
    <div className="flex flex-col gap-1">
      <Skeleton className="h-2.5 w-8" />
      <Skeleton className="h-8 w-64 rounded-md" />
    </div>
    {/* Status select */}
    <div className="flex flex-col gap-1">
      <Skeleton className="h-2.5 w-10" />
      <Skeleton className="h-8 w-40 rounded-md" />
    </div>
    {/* Date range */}
    <div className="flex items-end gap-2">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-2.5 w-8" />
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-2.5 w-4" />
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>
    </div>
    {/* Search — right-aligned */}
    <div className="flex flex-col gap-1 ml-auto">
      <Skeleton className="h-2.5 w-12" />
      <Skeleton className="h-8 w-52 rounded-md" />
    </div>
  </div>
);

// ── Table skeleton ─────────────────────────────────────────────────────────────
// Columns: Type | User | Recipe | Amount | Status | Date | Ref + Actions
const HEADERS = ["Type", "User", "Recipe", "Amount", "Status", "Date", "Ref"];
const COL_WIDTHS = ["w-32", "w-44", "w-36", "w-20", "w-24", "w-28", "w-32"];

const TableSkeleton = () => (
  <div className="mt-5 w-full overflow-x-auto rounded-lg border border-border animate-pulse">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-muted/40">
          {HEADERS.map((h, i) => (
            <th key={h} className="px-4 py-2.5 text-left whitespace-nowrap">
              <Skeleton className={`h-2.5 ${COL_WIDTHS[i]}`} />
            </th>
          ))}
          <th className="px-4 py-2.5 text-right">
            <Skeleton className="h-2.5 w-14 ml-auto" />
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
            {/* Type badge */}
            <td className="px-4">
              <Skeleton className="h-5 w-28 rounded-sm" />
            </td>
            {/* User cell — avatar + name + email stacked */}
            <td className="px-4">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-6 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>
            </td>
            {/* Recipe name */}
            <td className="px-4">
              <Skeleton className="h-3 w-32" />
            </td>
            {/* Amount */}
            <td className="px-4">
              <Skeleton className="h-3 w-14" />
            </td>
            {/* Status badge */}
            <td className="px-4">
              <Skeleton className="h-5 w-20 rounded-sm" />
            </td>
            {/* Date */}
            <td className="px-4">
              <Skeleton className="h-3 w-24" />
            </td>
            {/* Ref mono */}
            <td className="px-4">
              <Skeleton className="h-3 w-28" />
            </td>
            {/* Actions */}
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
    {/* Page header — static text, but "X transactions" count is API-derived */}
    <div className="flex items-start justify-between gap-4 mb-6 animate-pulse">
      <div>
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
      {/* Export button placeholder */}
      <Skeleton className="h-8 w-20 rounded-md shrink-0" />
    </div>

    <StatStripSkeleton />
    <ToolbarSkeleton />
    <TableSkeleton />
  </div>
);

export default TransactionsSkeleton;
