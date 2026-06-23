"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Copy,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TransactionDetailPanel from "@/components/dashboard/TransactionDetailPanel";
import TransactionStatStrip from "@/components/dashboard/TransactionStatStrip";
import useDebounce from "@/hooks/useDebounce";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const truncateId = (id) => {
  if (!id || id.length <= 16) return id ?? "—";
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
};

// ─── Badges ───────────────────────────────────────────────────────────────────

const TypeBadge = ({ type }) => {
  const isSubscription = type?.toLowerCase() === "subscription";
  return (
    <Badge
      className={cn(
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm whitespace-nowrap",
        isSubscription
          ? "bg-accent/15 text-accent border-transparent"
          : "bg-secondary text-secondary-foreground border-transparent",
      )}
    >
      {isSubscription ? "Subscription" : "Recipe Purchase"}
    </Badge>
  );
};

const StatusBadge = ({ status }) => {
  const styles =
    {
      completed: "bg-accent/10 text-accent border-transparent",
      active: "bg-accent/10 text-accent border-transparent",
      pending: "bg-muted text-muted-foreground border-transparent",
      failed: "bg-destructive/10 text-destructive border-transparent",
    }[status?.toLowerCase()] ??
    "bg-muted text-muted-foreground border-transparent";

  return (
    <Badge
      className={cn(
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm whitespace-nowrap",
        styles,
      )}
    >
      {status}
    </Badge>
  );
};

// ─── User cell — avatar + name + email stacked ────────────────────────────────

const UserCell = ({ user }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-2.5 min-w-0">
      {/* Avatar — 24px per spec */}
      <span className="relative flex shrink-0 size-6 rounded-full overflow-hidden bg-muted">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "avatar"}
            fill
            sizes="24px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-[9px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em] select-none">
            {initials}
          </span>
        )}
      </span>

      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-sans text-foreground truncate leading-tight">
          {user?.name ?? "—"}
        </span>
        <span className="text-[11px] font-sans text-muted-foreground truncate leading-tight">
          {user?.email ?? ""}
        </span>
      </div>
    </div>
  );
};

// ─── Type filter — segmented pill toggle ─────────────────────────────────────

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "subscription", label: "Subscriptions" },
  { value: "recipe_purchase", label: "Recipe Purchases" },
];

const TypeFilter = ({ value, onChange }) => (
  <div
    role="group"
    aria-label="Filter by transaction type"
    className="flex items-center gap-0.5 rounded-md border border-border p-0.5 bg-muted/40"
  >
    {TYPE_OPTIONS.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        aria-pressed={value === opt.value}
        className={cn(
          "px-3 h-7 rounded text-[12px] font-sans font-medium transition-colors duration-150 whitespace-nowrap",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          value === opt.value
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

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

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = ({ onClearFilters }) => (
  <tr>
    <td colSpan={7}>
      <div className="flex flex-col items-center justify-center gap-3 py-16 px-4">
        <Receipt
          className="size-8 text-muted-foreground/40 stroke-[1.25]"
          aria-hidden
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            className="text-[15px] text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            No transactions found
          </p>
          <p className="text-[13px] font-sans text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className={cn(
            "mt-1 text-[13px] font-sans text-muted-foreground underline underline-offset-2",
            "hover:text-foreground transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
          )}
        >
          Clear filters
        </button>
      </div>
    </td>
  </tr>
);

// ─── Main client component ────────────────────────────────────────────────────

const TransactionsClient = ({
  initialRows = [],
  totalPages = 1,
  currentPage = 1,
  totalCount = 0,
  stats = {},
  initialType = "all",
  initialStatus = "",
  initialFrom = "",
  initialTo = "",
  initialQ = "",
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // ── Filter state (mirrors URL, used for controlled inputs) ──
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [fromDate, setFromDate] = useState(initialFrom);
  const [toDate, setToDate] = useState(initialTo);
  const [searchQ, setSearchQ] = useState(initialQ);

  // Debounced search value — navigation fires 300ms after typing stops
  const debouncedSearch = useDebounce(searchQ, 300);

  // ── Hover state — track which row is hovered ──
  const [hoveredId, setHoveredId] = useState(null);

  // ── Detail panel ──
  const [selectedTx, setSelectedTx] = useState(null);

  // ── Build URL and navigate ────────────────────────────────────────────────

  const buildUrl = useCallback(
    ({ type, status, from, to, q, page } = {}) => {
      const params = new URLSearchParams();
      const t = type ?? typeFilter;
      const s = status ?? statusFilter;
      const f = from ?? fromDate;
      const to_ = to ?? toDate;
      const qv = q ?? searchQ;
      const p = page ?? 1;

      if (t && t !== "all") params.set("type", t);
      if (s) params.set("status", s);
      if (f) params.set("from", f);
      if (to_) params.set("to", to_);
      if (qv) params.set("q", qv);
      if (p > 1) params.set("page", String(p));

      const qs = params.toString();
      return `/dashboard/transactions${qs ? `?${qs}` : ""}`;
    },
    [typeFilter, statusFilter, fromDate, toDate, searchQ],
  );

  const navigate = (overrides) =>
    startTransition(() => router.push(buildUrl(overrides)));

  // Fire navigation when debounced search settles — same pattern as
  // AdvancedFilterBar on the browse recipes page.
  useEffect(() => {
    if (debouncedSearch !== initialQ) {
      navigate({ q: debouncedSearch, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keep local input in sync when URL changes externally
  // (browser back/forward, "Clear filters" button)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQ(initialQ);
  }, [initialQ]);

  // ── Filter handlers ────────────────────────────────────────────────────────

  const handleTypeChange = (val) => {
    setTypeFilter(val);
    navigate({ type: val, page: 1 });
  };

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
    navigate({ status: val, page: 1 });
  };

  const handleFromChange = (e) => {
    const val = e.target.value;
    setFromDate(val);
    navigate({ from: val, page: 1 });
  };

  const handleToChange = (e) => {
    const val = e.target.value;
    setToDate(val);
    navigate({ to: val, page: 1 });
  };

  const handleSearchChange = (e) => {
    setSearchQ(e.target.value);
  };

  const clearFilters = () => {
    setTypeFilter("all");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setSearchQ("");
    startTransition(() => router.push("/dashboard/transactions"));
  };

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(id)
      .then(() => toast.success("Transaction ID copied."));
  };

  // ── Shared input/label class ──────────────────────────────────────────────

  const inputClass = cn(
    "h-8 rounded-md border border-input bg-background px-3",
    "text-[13px] font-sans text-foreground placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "transition-colors duration-150",
  );

  const labelClass =
    "block text-[10px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans mb-1";

  return (
    <>
      {/* ── Stat strip ── */}
      <TransactionStatStrip
        totalRevenue={stats.totalRevenue ?? "$0.00"}
        subscriptionCount={stats.subscriptionCount ?? 0}
        recipePurchaseCount={stats.recipePurchaseCount ?? 0}
      />

      {/* ── Toolbar ── */}
      <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3">
        {/* Type filter — segmented control */}
        <div className="flex flex-col gap-1">
          <p className={labelClass}>Type</p>
          <TypeFilter value={typeFilter} onChange={handleTypeChange} />
        </div>

        {/* Status filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tx-status-filter" className={labelClass}>
            Status
          </label>
          <select
            id="tx-status-filter"
            value={statusFilter}
            onChange={handleStatusChange}
            className={cn(
              inputClass,
              "pr-8 appearance-none cursor-pointer w-40",
            )}
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Date range */}
        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="tx-from" className={labelClass}>
              From
            </label>
            <input
              id="tx-from"
              type="date"
              value={fromDate}
              onChange={handleFromChange}
              className={cn(inputClass, "w-36")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tx-to" className={labelClass}>
              To
            </label>
            <input
              id="tx-to"
              type="date"
              value={toDate}
              onChange={handleToChange}
              className={cn(inputClass, "w-36")}
            />
          </div>
        </div>

        {/* Search — right-aligned via ml-auto */}
        <div className="flex flex-col gap-1 ml-auto">
          <label htmlFor="tx-search" className={labelClass}>
            Search
          </label>
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
              aria-hidden
            />
            <input
              id="tx-search"
              type="search"
              placeholder="ID or name / email…"
              value={searchQ}
              onChange={handleSearchChange}
              className={cn(inputClass, "pl-8 w-52")}
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="mt-5">
        {/* Record count */}
        <p className="text-[11px] uppercase tracking-[0.06em] font-medium text-muted-foreground font-sans mb-3">
          {totalCount.toLocaleString()}{" "}
          {totalCount === 1 ? "transaction" : "transactions"}
        </p>

        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-225 border-collapse">
            {/* ── Header ── */}
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {[
                  { label: "User", width: "" },
                  { label: "Type", width: "w-36" },
                  { label: "Amount", width: "w-28 text-right" },
                  { label: "Date", width: "w-32" },
                  { label: "Status", width: "w-28" },
                  { label: "Transaction ID", width: "w-44" },
                  { label: "Actions", width: "w-px text-right" },
                ].map((col) => (
                  <th
                    key={col.label}
                    scope="col"
                    className={cn(
                      "px-4 py-2.5",
                      "text-[10px] uppercase tracking-[0.09em] font-semibold text-muted-foreground font-sans",
                      "whitespace-nowrap",
                      col.width,
                      col.label === "Amount" || col.label === "Actions"
                        ? "text-right"
                        : "text-left",
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* ── Body ── */}
            <tbody>
              {initialRows.length === 0 ? (
                <EmptyState onClearFilters={clearFilters} />
              ) : (
                initialRows.map((row) => {
                  const isHovered = hoveredId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onMouseEnter={() => setHoveredId(row.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={cn(
                        "h-11 border-b border-border last:border-b-0 transition-colors duration-100",
                        isHovered ? "bg-secondary/40" : "bg-transparent",
                      )}
                    >
                      {/* User */}
                      <td className="px-4">
                        <UserCell user={row.user} />
                      </td>

                      {/* Type */}
                      <td className="px-4">
                        <TypeBadge type={row.type} />
                      </td>

                      {/* Amount — right-aligned mono */}
                      <td className="px-4 text-right">
                        <span className="font-mono text-[13px] text-foreground font-medium">
                          {row.amount}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4">
                        <span className="text-[12px] font-sans text-muted-foreground whitespace-nowrap">
                          {formatDate(row.rawDate)}
                        </span>
                        {row.rawDate && (
                          <span className="block text-[11px] font-sans text-muted-foreground/70">
                            {formatTime(row.rawDate)}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4">
                        <StatusBadge status={row.status} />
                      </td>

                      {/* Transaction ID — truncated + copy on hover */}
                      <td className="px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-mono text-[11px] text-muted-foreground"
                            title={row.id}
                          >
                            {truncateId(row.id)}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyId(e, row.id)}
                            aria-label="Copy transaction ID"
                            className={cn(
                              "size-5 flex items-center justify-center rounded",
                              "text-muted-foreground/40 hover:text-muted-foreground transition-all duration-150",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              isHovered
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none",
                            )}
                          >
                            <Copy className="size-3" />
                          </button>
                        </div>
                      </td>

                      {/* Actions — View icon on hover */}
                      <td className="px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedTx(row)}
                          aria-label="View transaction detail"
                          className={cn(
                            "size-7 flex items-center justify-center rounded ml-auto",
                            "text-muted-foreground/40 hover:text-foreground transition-all duration-150",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isHovered
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none",
                          )}
                        >
                          <Eye className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <CompactPagination
          current={currentPage}
          total={totalPages}
          onChange={(p) => navigate({ page: p })}
        />
      </div>

      {/* ── Detail panel (portal-like overlay) ── */}
      <TransactionDetailPanel
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </>
  );
};

export default TransactionsClient;
