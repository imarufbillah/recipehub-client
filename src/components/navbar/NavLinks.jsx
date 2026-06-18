import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Browse Recipes" },
];

/**
 * Desktop nav links — sans micro-label style, uppercase, tight tracking.
 * Accepts an optional `pathname` prop to highlight the active link.
 * Server component — no interactivity needed here.
 */
const NavLinks = ({ pathname = "" }) => {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  // Micro-label: 11–12px, uppercase, +0.08em tracking, sans
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
