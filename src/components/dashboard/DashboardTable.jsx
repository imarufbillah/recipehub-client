"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Status badge ────────────────────────────────────────────────────────────

// Maps status strings to shadcn Badge className overrides.
// Badge base: rounded-4xl — override to rounded-sm to match design system pill style.
const STATUS_STYLES = {
  active:
    "bg-secondary text-secondary-foreground border-transparent rounded-sm",
  inactive: "bg-muted text-muted-foreground border-transparent rounded-sm",
  blocked: "bg-destructive/10 text-destructive border-transparent rounded-sm",
  featured: "bg-accent text-accent-foreground border-transparent rounded-sm",
  pending: "bg-muted text-muted-foreground border-transparent rounded-sm",
  resolved:
    "bg-secondary text-secondary-foreground border-transparent rounded-sm",
  open: "bg-destructive/10 text-destructive border-transparent rounded-sm",
  premium: "bg-accent/15 text-accent border-transparent rounded-sm",
  free: "bg-muted text-muted-foreground border-transparent rounded-sm",
};

export const StatusBadge = ({ status }) => {
  const extra = STATUS_STYLES[status?.toLowerCase()] ?? STATUS_STYLES.inactive;
  return (
    <Badge
      className={cn(
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5",
        extra,
      )}
    >
      {status}
    </Badge>
  );
};

// ─── Compact pagination ───────────────────────────────────────────────────────

const buildPages = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current]);
  if (current > 1) set.add(current - 1);
  if (current < total) set.add(current + 1);
  const sorted = [...set].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
};

const CompactPagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;
  const pages = buildPages(current, total);
  return (
    <nav
      className="flex items-center justify-end gap-0.5 pt-3"
      aria-label="Table pagination"
    >
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
        className={cn(
          "size-7 flex items-center justify-center rounded transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          current > 1
            ? "text-muted-foreground hover:text-foreground"
            : "text-muted-foreground/30 cursor-not-allowed",
        )}
      >
        <ChevronLeft className="size-3.5" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`e-${i}`}
            className="w-6 text-center text-[11px] text-muted-foreground/40 font-sans select-none"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => p !== current && onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === current ? "page" : undefined}
            className={cn(
              "min-w-7 h-7 px-1.5 flex items-center justify-center rounded",
              "text-[11px] font-sans transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              p === current
                ? "text-primary font-semibold underline underline-offset-2 decoration-primary/50 cursor-default"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={current >= total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
        className={cn(
          "size-7 flex items-center justify-center rounded transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          current < total
            ? "text-muted-foreground hover:text-foreground"
            : "text-muted-foreground/30 cursor-not-allowed",
        )}
      >
        <ChevronRight className="size-3.5" />
      </button>
    </nav>
  );
};

// ─── Main table ───────────────────────────────────────────────────────────────

const DashboardTable = ({
  columns = [],
  rows = [],
  actions = [],
  pageSize = 10,
  // When provided, pagination is server-driven — DashboardTable just renders
  // the controls and calls onPageChange(n) instead of slicing rows locally.
  serverPagination = null, // { totalPages, currentPage }
  onPageChange = null,
}) => {
  const [localPage, setLocalPage] = useState(1);

  const isServer = Boolean(serverPagination);
  const totalPages = isServer
    ? Math.max(1, serverPagination.totalPages)
    : Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = isServer
    ? serverPagination.currentPage
    : Math.min(localPage, totalPages);
  const visibleRows = isServer
    ? rows
    : rows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handlePageChange = (p) => {
    if (isServer) onPageChange?.(p);
    else setLocalPage(p);
  };

  return (
    <div className="flex flex-col">
      {/* Row count label */}
      <p className="text-[11px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans mb-3">
        {rows.length.toLocaleString()}{" "}
        {rows.length === 1 ? "record" : "records"}
      </p>

      {/* Table wrapper — horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-150 border-collapse">
          {/* ── Header ── */}
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-2.5 text-left",
                    "text-[10px] uppercase tracking-[0.09em] font-semibold text-muted-foreground font-sans",
                    "whitespace-nowrap",
                    col.width,
                  )}
                >
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th
                  scope="col"
                  className="px-4 py-2.5 text-right text-[10px] uppercase tracking-[0.09em] font-semibold text-muted-foreground font-sans w-px whitespace-nowrap"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-4 py-10 text-center text-[13px] font-sans text-muted-foreground"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, ri) => (
                <tr
                  key={row.id ?? ri}
                  className="h-11 border-b border-border last:border-b-0 transition-colors duration-100 hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 text-[13px] font-sans text-foreground whitespace-nowrap"
                    >
                      {col.renderFn ? (
                        col.renderFn(row)
                      ) : col.badge ? (
                        <StatusBadge status={row[col.key]} />
                      ) : col.mono ? (
                        <span className="font-mono text-[12px] text-muted-foreground">
                          {row[col.key]}
                        </span>
                      ) : col.hrefFn ? (
                        <Link
                          href={col.hrefFn(row)}
                          className="hover:text-primary hover:underline underline-offset-2 transition-colors duration-150"
                        >
                          {row[col.key]}
                        </Link>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}

                  {/* ── Per-row ghost icon actions, right-aligned ── */}
                  {actions.length > 0 && (
                    <td className="px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-0.5">
                        {actions.map(
                          ({
                            icon: Icon,
                            iconFn,
                            label,
                            labelFn,
                            onClick,
                            variant,
                          }) => {
                            const ResolvedIcon = iconFn ? iconFn(row) : Icon;
                            const resolvedLabel = labelFn
                              ? labelFn(row)
                              : label;
                            return (
                              <button
                                key={label}
                                type="button"
                                onClick={() => onClick?.(row)}
                                aria-label={resolvedLabel}
                                title={resolvedLabel}
                                className={cn(
                                  "size-7 flex items-center justify-center rounded",
                                  "transition-colors duration-150",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                  variant === "destructive"
                                    ? "text-muted-foreground/50 hover:text-destructive"
                                    : "text-muted-foreground/50 hover:text-foreground",
                                )}
                              >
                                <ResolvedIcon
                                  className="size-3.5"
                                  aria-hidden
                                />
                              </button>
                            );
                          },
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Compact pagination */}
      <CompactPagination
        current={safePage}
        total={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default DashboardTable;
