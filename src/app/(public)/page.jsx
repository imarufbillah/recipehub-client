import Image from "next/image";
import Hero from "@/components/home/Hero";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import PopularRecipes from "@/components/home/PopularRecipes";
import BrowseByCuisine from "@/components/home/BrowseByCuisine";

const Home = () => {
  return (
    <>
      {/* Hero — asymmetric 60/40 editorial split (desktop) */}
      <Hero />

      {/*
       * Mobile-only image block — stacks below the hero text/CTA.
       * Full-width, sharp corners, no caption card (keeps mobile clean).
       * Hidden on lg+ because the desktop Hero already shows the image
       * in the right-column absolute panel.
       */}
      <div className="lg:hidden w-full aspect-4/3 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"
          alt="Beautifully plated pasta dish — editorial food photography"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Featured Recipes — image-dominant cards, staggered scroll reveal */}
      <FeaturedRecipes />

      {/* Popular Recipes — compact thumbnail-left cards, secondary bg break */}
      <PopularRecipes />

      {/* Browse by Cuisine — asymmetric editorial photo-tile grid */}
      <BrowseByCuisine />
    </>
  );
};

export default Home;
