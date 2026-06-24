import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Browse Recipes" },
  { href: "/premium", label: "Premium" },
];

const NavLinks = ({ pathname = "", isPremium = false, isPending = false }) => {
  const visibleLinks = links.filter(
    ({ href }) => !(href === "/premium" && isPremium),
  );

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        {visibleLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          const isDynamicPremium = href === "/premium";

          // Placeholder for dynamic premium link
          if (isDynamicPremium && isPending) {
            return (
              <li key={href} aria-hidden="true">
                <span className="block h-3 w-14 rounded-sm bg-muted animate-pulse" />
              </li>
            );
          }

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
