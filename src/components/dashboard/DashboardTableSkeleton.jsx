import Skeleton from "@/components/ui/Skeleton";

/**
 * Accurate skeleton for any DashboardTable instance.
 * Matches the real table DOM:
 *  - Rounded-lg border container
 *  - Header row: colCount cells at 10px height (micro-label scale)
 *  - Body: rowCount rows × colCount cells, last col is "Actions" (icon buttons)
 *
 * Props:
 *  colCount  — number of data columns (default 5)
 *  rowCount  — number of body rows to render (default 8)
 *  hasActions — whether to render the right-aligned actions cell (default true)
 */
const DashboardTableSkeleton = ({
  colCount = 5,
  rowCount = 8,
  hasActions = true,
}) => {
  const totalCols = colCount + (hasActions ? 1 : 0);

  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Record count label */}
      <Skeleton className="h-2.5 w-20" />

      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-150 border-collapse">
          {/* Header */}
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {Array.from({ length: colCount }).map((_, i) => (
                <th key={i} className="px-4 py-2.5 text-left whitespace-nowrap">
                  <Skeleton className="h-2.5 w-16 rounded-sm" />
                </th>
              ))}
              {hasActions && (
                <th className="px-4 py-2.5 text-right">
                  <Skeleton className="h-2.5 w-12 rounded-sm ml-auto" />
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rowCount }).map((_, ri) => (
              <tr
                key={ri}
                className="h-11 border-b border-border last:border-b-0"
                style={{ animationDelay: `${ri * 40}ms` }}
              >
                {Array.from({ length: colCount }).map((_, ci) => (
                  <td key={ci} className="px-4">
                    {/* First column is wider (recipe/user name) */}
                    <Skeleton
                      className={`h-3 rounded-sm ${ci === 0 ? "w-40" : ci === colCount - 1 ? "w-14" : "w-24"}`}
                    />
                  </td>
                ))}
                {hasActions && (
                  <td className="px-4">
                    <div className="flex justify-end gap-1">
                      <Skeleton className="size-7 rounded" />
                      <Skeleton className="size-7 rounded" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTableSkeleton;
