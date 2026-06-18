import Navbar from "@/components/navbar/Navbar";

/**
 * Shared layout for all public-facing pages.
 * Renders the sticky Navbar once and offsets page content by the
 * navbar height (h-16 = 64px) so hero sections sit flush beneath it.
 */
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
};

export default PublicLayout;
