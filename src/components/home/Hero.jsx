import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag, Package, ShieldCheck } from "lucide-react";
import Container from "../layout/Container";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    alt: "Wireless headphones product",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    alt: "Smart watch product",
  },
];

const trustItems = [
  { icon: ShoppingBag, label: "Free Shipping", sub: "on orders $50+" },
  { icon: ShieldCheck, label: "Secure", sub: "checkout" },
  { icon: Package, label: "Easy", sub: "returns" },
];

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-light/60 via-background to-background">
      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
              <Sparkles size={16} />
              New Collection 2026
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Everything you need,
              <br className="hidden sm:block" /> all in one place.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
              Discover quality products, great prices, and a shopping experience
              designed around you.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-lg sm:w-auto"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:border-primary hover:text-primary sm:w-auto"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
              {trustItems.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon size={18} />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-xs text-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image area */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
              <img
                src={heroImages[0].src}
                alt={heroImages[0].alt}
                className="h-full w-full object-cover"
                loading="eager"
              />
              {/* Floating card */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lg backdrop-blur">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Package size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Free Shipping</p>
                  <p className="text-xs text-muted">On orders over $50</p>
                </div>
              </div>
            </div>

            {/* Small secondary image */}
            <div className="absolute -right-4 -top-6 hidden h-32 w-32 overflow-hidden rounded-2xl border-4 border-white object-cover shadow-lg sm:block lg:-right-6">
              <img
                src={heroImages[1].src}
                alt={heroImages[1].alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
