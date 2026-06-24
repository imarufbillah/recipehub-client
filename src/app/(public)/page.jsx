import Hero from "@/components/home/Hero";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import PopularRecipes from "@/components/home/PopularRecipes";
import BrowseByCuisine from "@/components/home/BrowseByCuisine";
import TrustSection from "@/components/home/TrustSection";

const Home = () => {
  return (
    <>
      {/* Hero — full-bleed editorial split, image + text columns, mobile stacked */}
      <Hero />

      {/* Featured Recipes — image-dominant cards, staggered scroll reveal */}
      <FeaturedRecipes />

      {/* Popular Recipes — compact thumbnail-left cards, secondary bg break */}
      <PopularRecipes />

      {/* Browse by Cuisine — asymmetric editorial photo-tile grid */}
      <BrowseByCuisine />

      {/* Trust / Value — magazine pull-quote layout, dark section */}
      <TrustSection />
    </>
  );
};

export default Home;
