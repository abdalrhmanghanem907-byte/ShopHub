import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Formats the product count with correct singular/plural.
function formatCount(count) {
  return `${count} ${count === 1 ? "product" : "products"}`;
}

export default function CategoryCard({ icon: Icon, name, productCount }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(name)}`}
      className="group flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <Icon size={30} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{name}</h3>
      <p className="mt-1 text-sm text-muted">{formatCount(productCount)}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
