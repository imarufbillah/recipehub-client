import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

/**
 * Shared layout for all public-facing pages.
 * Renders the sticky Navbar once and offsets page content by the
 * navbar height (h-16 = 64px) so hero sections sit flush beneath it.
 * Footer renders below all page content on every public route.
 */
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
