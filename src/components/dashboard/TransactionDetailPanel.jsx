"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatFullDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
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

// ─── Status badge — panel version (same token rules as table) ─────────────────

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
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm w-fit",
        styles,
      )}
    >
      {status}
    </Badge>
  );
};

// ─── Type badge ───────────────────────────────────────────────────────────────

const TypeBadge = ({ type }) => {
  const isSubscription = type?.toLowerCase() === "subscription";
  return (
    <Badge
      className={cn(
        "text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm w-fit",
        isSubscription
          ? "bg-accent/15 text-accent border-transparent"
          : "bg-secondary text-secondary-foreground border-transparent",
      )}
    >
      {isSubscription ? "Subscription" : "Recipe Purchase"}
    </Badge>
  );
};

// ─── Divider between groups ───────────────────────────────────────────────────

const GroupDivider = () => (
  <div className="border-t border-border" aria-hidden />
);

// ─── Label / value pair ───────────────────────────────────────────────────────

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
      {label}
    </p>
    <div className="text-[14px] font-sans text-foreground">{children}</div>
  </div>
);

// ─── User avatar ──────────────────────────────────────────────────────────────

const UserAvatar = ({ user, size = 40 }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <span
      className="relative flex shrink-0 rounded-full overflow-hidden bg-muted"
      style={{ width: size, height: size }}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name ?? "avatar"}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-[0.04em] select-none">
          {initials}
        </span>
      )}
    </span>
  );
};

// ─── Main panel ───────────────────────────────────────────────────────────────

const TransactionDetailPanel = ({ transaction, onClose }) => {
  const isOpen = Boolean(transaction);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Prevent body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const copyId = () => {
    if (!transaction?.id) return;
    navigator.clipboard.writeText(transaction.id).then(() => {
      toast.success("Transaction ID copied.");
    });
  };

  const isSubscription = transaction?.type?.toLowerCase() === "subscription";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Scrim — foreground token at low opacity, synced with panel ── */}
          <motion.div
            key="tx-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: "oklch(from var(--foreground) l c h / 0.25)",
            }}
            onClick={onClose}
            aria-hidden
          />

          {/* ── Panel — slides in from right ── */}
          <motion.aside
            key="tx-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Transaction detail"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50",
              "w-full sm:w-100",
              "bg-card border-l border-border",
              "flex flex-col overflow-hidden",
            )}
          >
            {/* ── Panel header ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <h2 className="text-[14px] font-sans font-semibold text-foreground tracking-[-0.01em]">
                Transaction Detail
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className={cn(
                  "size-7 flex items-center justify-center rounded-md",
                  "text-muted-foreground hover:text-foreground transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Panel body — scrollable ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
              {/* ── Group 1: PAYMENT ── */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                  Payment
                </p>

                {/* Amount — largest element, most important fact */}
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                    Amount
                  </p>
                  <p className="font-mono font-semibold text-foreground leading-none tracking-tight text-[clamp(28px,3vw,36px)]">
                    {transaction?.amount ?? "—"}
                  </p>
                </div>

                <Field label="Status">
                  <StatusBadge status={transaction?.status} />
                </Field>

                <Field label="Transaction ID">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-muted-foreground break-all">
                      {transaction?.id ?? "—"}
                    </span>
                    <button
                      type="button"
                      onClick={copyId}
                      aria-label="Copy transaction ID"
                      className={cn(
                        "shrink-0 size-6 flex items-center justify-center rounded",
                        "text-muted-foreground/50 hover:text-foreground transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      )}
                    >
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                </Field>

                <Field label="Date & Time">
                  <span className="text-[14px] font-sans text-foreground">
                    {formatFullDate(transaction?.rawDate)}
                  </span>
                  {transaction?.rawDate && (
                    <span className="block text-[12px] font-sans text-muted-foreground mt-0.5">
                      {formatTime(transaction.rawDate)}
                    </span>
                  )}
                </Field>
              </div>

              <GroupDivider />

              {/* ── Group 2: TYPE CONTEXT ── */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                  Type Context
                </p>

                <Field label="Transaction Type">
                  <TypeBadge type={transaction?.type} />
                </Field>

                {isSubscription ? (
                  /* Subscription — just name + Premium badge */
                  <Field label="Plan">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-sans text-foreground">
                        Premium Membership
                      </span>
                      <Badge className="text-[10px] uppercase tracking-[0.08em] font-medium font-sans h-auto px-2 py-0.5 rounded-sm bg-accent/15 text-accent border-transparent">
                        Premium
                      </Badge>
                    </div>
                  </Field>
                ) : (
                  /* Recipe Purchase — recipe name in serif + muted ID in mono */
                  <>
                    <Field label="Recipe">
                      <span
                        className="text-[15px] text-foreground leading-snug"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {transaction?.recipeName ?? "—"}
                      </span>
                    </Field>
                    {transaction?.recipeId && (
                      <Field label="Recipe ID">
                        <span className="font-mono text-[12px] text-muted-foreground">
                          {transaction.recipeId}
                        </span>
                      </Field>
                    )}
                  </>
                )}
              </div>

              <GroupDivider />

              {/* ── Group 3: USER ── */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans">
                  User
                </p>

                <div className="flex items-center gap-3">
                  <UserAvatar user={transaction?.user} size={40} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-sans font-medium text-foreground truncate leading-tight">
                      {transaction?.user?.name ?? "—"}
                    </span>
                    <span className="text-[12px] font-sans text-muted-foreground truncate leading-tight mt-0.5">
                      {transaction?.user?.email ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel footer ── */}
            <div className="shrink-0 px-6 py-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-[13px] text-muted-foreground hover:text-foreground gap-2"
                asChild
              >
                <Link
                  href={
                    transaction?.user?.id
                      ? `/dashboard/manage-users?userId=${transaction.user.id}`
                      : "/dashboard/manage-users"
                  }
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  View User Profile
                </Link>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransactionDetailPanel;
