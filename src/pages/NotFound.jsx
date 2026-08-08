import { Link } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import Container from "../components/layout/Container";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found | ShopAbdalrhman");

  return (
    <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <Container>
        <div className="mx-auto max-w-xl">
          {/* Branding */}
          <Link
            to="/"
            className="inline-flex items-center gap-2"
            aria-label="ShopAbdalrhman home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <ShoppingCart size={20} />
            </span>
            <span className="text-xl font-bold tracking-tight text-ink">
              ShopAbdalrhman
            </span>
          </Link>

          <p className="mt-10 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to shopping.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-all hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <ShoppingCart size={18} />
              Browse Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
