import TransactionsSkeleton from "@/components/dashboard/TransactionsSkeleton";

/**
 * Transactions page loading state.
 * Covers stat strip + toolbar + table — all API-fetched.
 */
const TransactionsLoading = () => <TransactionsSkeleton />;

export default TransactionsLoading;
