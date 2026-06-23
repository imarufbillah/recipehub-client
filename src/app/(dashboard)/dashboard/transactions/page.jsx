import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransactionsClient from "@/components/dashboard/TransactionsClient";
import {
  getAllTransactions,
  getTransactionStats,
} from "@/lib/apiClient.server";

// ─── Date / currency formatters ───────────────────────────────────────────────

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

// ─── Row mapper — flat API shape, no nested objects ──────────────────────────
// Backend returns all user/recipe fields directly on tx. No tx.user or tx.recipe.

const mapRow = (tx) => ({
  id: tx._id,
  type: tx.type === "subscription" ? "subscription" : "recipe_purchase",
  amount: formatCurrency(tx.amount),
  rawDate: tx.createdAt,
  // Purchases: "completed" | "pending" | "failed"
  // Subscriptions: "active" (no completed/pending/failed — subscriptions are
  //   either active or they don't appear in this list)
  status:
    tx.status === "completed"
      ? "Completed"
      : tx.status === "active"
        ? "Active"
        : tx.status === "pending"
          ? "Pending"
          : tx.status === "failed"
            ? "Failed"
            : "—",
  user: {
    id: tx.userId,
    name: tx.userName ?? "—",
    email: tx.userEmail ?? "",
    image: tx.userImage ?? null, // may be null — UserCell handles fallback initials
  },
  // Only present when type === "recipe_purchase"; null for subscriptions
  recipeName: tx.recipeName ?? null,
  recipeId: tx.recipeId ?? null,
});

// ─── Page ─────────────────────────────────────────────────────────────────────

const TransactionsPage = async ({ searchParams }) => {
  const sp = await searchParams;

  const page = Number(sp.page ?? 1);
  const type = sp.type ?? "all";
  const status = sp.status ?? "";
  const from = sp.from ?? "";
  const to = sp.to ?? "";
  const q = sp.q ?? "";

  // Build query params for the API — omit empty/default values
  const apiParams = {
    page,
    limit: 20,
    ...(type && type !== "all" ? { type } : {}),
    ...(status ? { status } : {}),
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(q ? { q } : {}),
  };

  // Fetch transactions list and aggregate stats in parallel; degrade gracefully
  const [txData, statsData] = await Promise.allSettled([
    getAllTransactions(apiParams),
    getTransactionStats(),
  ]);

  const txResult =
    txData.status === "fulfilled"
      ? txData.value
      : { transactions: [], totalPages: 1, page: 1, total: 0 };
  const statsResult = statsData.status === "fulfilled" ? statsData.value : null;

  const rows = (txResult.transactions ?? []).map(mapRow);
  const totalPages = txResult.totalPages ?? 1;
  const totalCount = txResult.total ?? txResult.totalCount ?? rows.length;

  // Stats endpoint returns exact fields: totalRevenue, subscriptionCount, recipePurchaseCount
  const stats = statsResult
    ? {
        totalRevenue: formatCurrency(statsResult.totalRevenue ?? 0),
        subscriptionCount: statsResult.subscriptionCount ?? 0,
        recipePurchaseCount: statsResult.recipePurchaseCount ?? 0,
      }
    : {
        totalRevenue: formatCurrency(
          rows.reduce((sum, r) => {
            const n = parseFloat(r.amount.replace(/[^0-9.]/g, "")) || 0;
            return sum + n;
          }, 0),
        ),
        subscriptionCount: rows.filter((r) => r.type === "subscription").length,
        recipePurchaseCount: rows.filter((r) => r.type === "recipe_purchase")
          .length,
      };

  return (
    <div className="px-5 md:px-8 py-8">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
            Transactions
          </h2>
          <p className="mt-1 text-[13px] font-sans text-muted-foreground">
            {totalCount.toLocaleString()}{" "}
            {totalCount === 1 ? "transaction" : "transactions"}
          </p>
        </div>

        {/* Export — visual affordance only */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-[13px] shrink-0"
        >
          <Download className="size-3.5" aria-hidden />
          Export
        </Button>
      </div>

      {/* ── All interactive content delegated to client component ── */}
      <TransactionsClient
        initialRows={rows}
        totalPages={totalPages}
        currentPage={page}
        totalCount={totalCount}
        stats={stats}
        initialType={type}
        initialStatus={status}
        initialFrom={from}
        initialTo={to}
        initialQ={q}
      />
    </div>
  );
};

export default TransactionsPage;
