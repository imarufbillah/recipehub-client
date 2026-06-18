import Link from "next/link";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Purchased — user dashboard page.
 *
 * Transaction reference IDs use the mono:true column flag so DashboardTable
 * renders them in font-mono (per design system: numeric IDs as data).
 * No actions on this view — purchased rows are read-only.
 */

const COLUMNS = [
  { key: "name", label: "Recipe" },
  { key: "author", label: "Author", width: "w-32" },
  { key: "price", label: "Price", width: "w-20" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "ref", label: "Ref", width: "w-32", mono: true },
];

const ROWS = [
  {
    id: "p1",
    name: "Dark Chocolate & Tahini Tart",
    author: "Nour Al-Rashid",
    price: "$4.99",
    date: "Jun 5, 2024",
    ref: "TXN-00041A",
  },
  {
    id: "p2",
    name: "Duck Confit with Puy Lentils & Gremolata",
    author: "Pierre Dubois",
    price: "$3.99",
    date: "Jul 22, 2024",
    ref: "TXN-00087C",
  },
];

const PurchasedPage = () => {
  return (
    <div className="px-5 md:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
          Purchased
        </h2>
        <p className="mt-1 text-[13px] font-sans text-muted-foreground">
          Premium recipes you&apos;ve unlocked.
        </p>
      </div>

      {ROWS.length > 0 ? (
        <DashboardTable
          columns={COLUMNS}
          rows={ROWS}
          actions={[]}
          pageSize={10}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <ShoppingBag
            className="size-8 text-muted-foreground/40 stroke-[1.25]"
            aria-hidden
          />
          <h3 className="font-heading text-[20px] leading-snug tracking-[-0.01em] text-foreground">
            No purchases yet
          </h3>
          <p className="text-[14px] font-sans text-muted-foreground max-w-xs">
            Browse premium recipes and unlock full ingredients and instructions.
          </p>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mt-1 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Link href="/recipes">Explore Recipes →</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PurchasedPage;
