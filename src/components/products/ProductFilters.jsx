import { Search, FilterX } from "lucide-react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductFilters({
  categories,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  hasActiveFilters,
  onClearFilters,
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
        {/* Search */}
        <div className="relative">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-line bg-background py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="sort-filter" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-auto"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="mt-4 border-t border-line pt-4">
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <FilterX size={16} />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
