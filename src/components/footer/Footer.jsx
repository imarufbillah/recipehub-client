import Link from "next/link";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiPinterestLine,
  RiYoutubeLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { Mail, MapPin, Phone } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Browse Recipes" },
  { href: "/recipes?sort=popular", label: "Popular" },
  { href: "/recipes?sort=new", label: "New Arrivals" },
  { href: "/submit", label: "Submit a Recipe" },
  { href: "/about", label: "About" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", icon: RiInstagramLine, label: "Instagram" },
  { href: "https://pinterest.com", icon: RiPinterestLine, label: "Pinterest" },
  { href: "https://twitter.com", icon: RiTwitterXLine, label: "X (Twitter)" },
  { href: "https://youtube.com", icon: RiYoutubeLine, label: "YouTube" },
  { href: "https://facebook.com", icon: RiFacebookLine, label: "Facebook" },
];

/**
 * Site footer — server component.
 *
 * Background: --secondary token (one step off --background) to ground the
 * footer visually as distinct from the page body without introducing a new color.
 * Hairline border-top separates it from the content above.
 *
 * Layout (desktop): 4 columns — Logo/tagline | Quick Links | Social | Contact
 * Layout (mobile):  2-column grid collapsing to single column at xs
 *
 * Typography: all sans — footer is utility, not editorial. Serif reserved
 * only for the wordmark treatment.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary border-t border-border">
      {/* ── Main columns ── */}
      <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ── Col 1 — Logo + tagline ── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors duration-200 w-fit"
            >
              RecipeHub
            </Link>

            <p className="text-[15px] leading-[1.6] text-muted-foreground font-sans max-w-[26ch]">
              A culinary media platform for home cooks who take cooking
              seriously.
            </p>

            {/* Social icons — muted default, foreground on hover */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon className="size-4.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2 — Quick Links ── */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 — Explore (secondary nav) ── */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/recipes?cuisine=italian", label: "Italian" },
                { href: "/recipes?cuisine=japanese", label: "Japanese" },
                { href: "/recipes?cuisine=french", label: "French" },
                {
                  href: "/recipes?cuisine=middle-eastern",
                  label: "Middle Eastern",
                },
                { href: "/recipes?cuisine=mexican", label: "Mexican" },
                { href: "/recipes?cuisine=bengali", label: "Bengali" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 — Contact Information ── */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-foreground font-sans">
              Contact
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:hello@recipehub.com"
                  className="flex items-start gap-3 text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans group/contact"
                >
                  <Mail
                    className="size-4 shrink-0 mt-0.5 text-muted-foreground group-hover/contact:text-foreground transition-colors duration-200"
                    aria-hidden
                  />
                  hello@recipehub.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15550001234"
                  className="flex items-start gap-3 text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans group/contact"
                >
                  <Phone
                    className="size-4 shrink-0 mt-0.5 text-muted-foreground group-hover/contact:text-foreground transition-colors duration-200"
                    aria-hidden
                  />
                  +1 (555) 000-1234
                </a>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-muted-foreground font-sans">
                <MapPin className="size-4 shrink-0 mt-0.5" aria-hidden />
                <span>
                  340 Pine Street, Suite 800
                  <br />
                  San Francisco, CA 94104
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright line ── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-360 px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-muted-foreground font-sans">
            © {currentYear} RecipeHub. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Use" },
              { href: "/cookies", label: "Cookie Settings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
