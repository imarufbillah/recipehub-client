import ThemeToggle from "@/components/navbar/ThemeToggle";
import Link from "next/link";

/**
 * Single-focus layout for auth pages (login, register) and standalone
 * focus moments (payment success).
 *
 * No Navbar, no Footer — just the brand and the task at hand.
 *
 * Structure:
 *  - Minimal top strip: wordmark left, theme toggle right.
 *  - Full viewport height canvas: vertically centers the card.
 *  - Plain background-token canvas — atmospheric photo overlay is
 *    handled per-page via an absolute-positioned layer if desired.
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top strip ── */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        {/* Wordmark — smaller than public navbar */}
        <Link
          href="/"
          className="font-heading text-[20px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors duration-200"
        >
          RecipeHub
        </Link>

        <ThemeToggle />
      </header>

      {/* ── Main canvas — vertically centered ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
