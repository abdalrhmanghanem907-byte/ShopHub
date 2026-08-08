import { useMemo, useState } from "react";
import {
  Search,
  PackageSearch,
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  Folder,
  Clapperboard,
  Layers,
} from "lucide-react";
import Container from "../components/layout/Container";
import CategoryCard from "../components/home/CategoryCard";
import products from "../data/products";
import useSEO from "../hooks/useSEO";

// Map known category names to Lucide icons.
const categoryIcons = {
  Electronics: Laptop,
  Fashion: Shirt,
  "Home & Living": Home,
  Sports: Dumbbell,
  Beauty: Sparkles,
  Accessories: Clapperboard,
  Entertainment: Clapperboard,
};

// Fallback for unknown categories.
const fallbackIcon = Folder;

// Build a reusable category list from the products data.
function buildCategories() {
  return [...new Set(products.map((p) => p.category))].map((name) => ({
    name,
    count: products.filter((p) => p.category === name).length,
    icon: categoryIcons[name] || fallbackIcon,
  }));
}

export default function Categories() {
  useSEO({
    title: "Categories | ShopAbdalrhman",
    description:
      "Explore ShopAbdalrhman product categories including electronics, accessories, fashion, and home & living.",
    path: "/categories",
    type: "website",
  });
  const [search, setSearch] = useState("");

  // Derived from products — recalculated only when needed.
  const allCategories = useMemo(buildCategories, []);

  const totalCategories = allCategories.length;

  // Case-insensitive, instant category search.
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (query === "") return allCategories;
    return allCategories.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );
  }, [search, allCategories]);

  const clearSearch = () => setSearch("");

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Shop by Category
          </h1>
          <p className="mt-3 text-muted">
            Explore our collection by category.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {totalCategories} categories
          </p>
        </div>

        {/* Category search */}
        <div className="mx-auto mt-8 max-w-md">
          <label htmlFor="category-search" className="sr-only">
            Search categories
          </label>
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="category-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Category grid or empty state */}
        {filteredCategories.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <PackageSearch size={30} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">
              No categories found
            </h2>
            <p className="mt-2 text-muted">
              Try searching for another category.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Layers size={16} />
              View All Categories
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
