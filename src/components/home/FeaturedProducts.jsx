import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import ProductCard from "../products/ProductCard";
import products from "../../data/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted">
              Handpicked products you'll love.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
