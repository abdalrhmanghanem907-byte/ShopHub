import { Link } from "react-router-dom";
import { ShoppingCart, Globe, AtSign, Share2, MessageCircle } from "lucide-react";
import Container from "./Container";

const shopLinks = [
  { to: "/products", label: "All Products" },
  { to: "/categories", label: "Categories" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
];

const serviceLinks = [
  { to: "/orders", label: "Track Order" },
  { to: "/profile", label: "My Account" },
  { to: "/checkout", label: "Checkout" },
  { to: "/login", label: "Login" },
];

const socialIcons = [
  { label: "Website", icon: Globe },
  { label: "Email", icon: AtSign },
  { label: "Share", icon: Share2 },
  { label: "Support", icon: MessageCircle },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <ShoppingCart size={18} />
              </span>
              <span className="text-xl font-bold tracking-tight text-ink">
                ShopAbdalrhman
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              ShopAbdalrhman is a modern online store offering a premium shopping
              experience. Discover quality products across all categories, all
              in one place.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {currentYear} ShopAbdalrhman. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialIcons.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
