import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import Container from "../components/layout/Container";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import products from "../data/products";
import useSEO from "../hooks/useSEO";

const sortFunctions = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "rating-desc": (a, b) => b.rating - a.rating,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
};

export default function Products() {
  useSEO({
    title: "Products | ShopAbdalrhman",
    description:
      "Browse products at ShopAbdalrhman. Search, filter, and sort products by category and price.",
    path: "/products",
    type: "website",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  // Read the initial category from the URL (?category=Electronics).
  const urlCategory = searchParams.get("category") || "all";
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState("featured");

  // Derive available categories from the data (not hardcoded)
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );

  // Keep the category state in sync with the URL. This matters when the
  // user navigates from /categories via /products?category=X, or presses the
  // browser back/forward buttons. Without it, a stale category from the last
  // visit could hide matching products after searching.
  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const hasActiveFilters =
    search.trim() !== "" || category !== "all" || sort !== "featured";

  // Keep the URL in sync with the selected category (clean, minimal).
  const updateCategory = (value) => {
    setCategory(value);
    setSearchParams(value === "all" ? {} : { category: value });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("featured");
    setSearchParams({});
  };

  // Filter + sort derived array — never mutates the original products
  const visibleProducts = useMemo(() => {
    // Trim + collapse extra spaces so "  wireless  " matches "Wireless Headphones".
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort(sortFunctions[sort]);
  }, [search, category, sort]);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            All Products
          </h1>
          <p className="mt-3 text-muted">
            Discover products selected for quality, value, and everyday use.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {products.length} products
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8">
          <ProductFilters
            categories={categories}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={updateCategory}
            sort={sort}
            setSort={setSort}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results info */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing{" "}
            <span className="font-semibold text-ink">
              {visibleProducts.length}
            </span>{" "}
            of <span className="font-semibold text-ink">{products.length}</span>{" "}
            products
          </p>
        </div>

        {/* Grid or empty state */}
        {visibleProducts.length > 0 ? (
          <div className="mt-6">
            <ProductGrid products={visibleProducts} />
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <PackageSearch size={30} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">
              No products found
            </h2>
            <p className="mt-2 text-muted">
              Try adjusting your search or filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Clear Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
