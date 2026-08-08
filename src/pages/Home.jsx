import { useMemo } from "react";
import {
  Laptop,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Clapperboard,
  Folder,
} from "lucide-react";
import Container from "../components/layout/Container";
import Hero from "../components/home/Hero";
import CategoryCard from "../components/home/CategoryCard";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import WhyShopAbdalrhman from "../components/home/WhyShopAbdalrhman";
import Newsletter from "../components/home/Newsletter";
import products from "../data/products";
import useSEO from "../hooks/useSEO";
import { SITE_URL } from "../config/seo";

// Map known category names to Lucide icons.
const categoryIcons = {
  Electronics: Laptop,
  Fashion: Shirt,
  "Home & Living": HomeIcon,
  Sports: Dumbbell,
  Beauty: Sparkles,
  Accessories: Clapperboard,
};

const fallbackIcon = Folder;

// Build categories dynamically from the product data (no hardcoding).
function buildCategories() {
  return [...new Set(products.map((p) => p.category))].map((name) => ({
    name,
    productCount: products.filter((p) => p.category === name).length,
    icon: categoryIcons[name] || fallbackIcon,
  }));
}

export default function Home() {
  useSEO({
    title: "ShopAbdalrhman | Online Store",
    description:
      "ShopAbdalrhman is an online store offering electronics, fashion, accessories, and home & living products.",
    path: "/",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ShopAbdalrhman",
      url: `${SITE_URL}/`,
    },
  });
  const categories = useMemo(buildCategories, []);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted">
              Explore our most popular categories.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </Container>
      </section>

      <FeaturedProducts />
      <PromoBanner />
<WhyShopAbdalrhman />
      <Newsletter />
    </>
  );
}
