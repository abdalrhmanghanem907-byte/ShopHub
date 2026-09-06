import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Globe, AtSign, Share2, MessageCircle } from "lucide-react";
import Container from "./Container";

const shopLinks = [
  { to: "/products", label: "allProducts" },
  { to: "/categories", label: "categories" },
  { to: "/wishlist", label: "wishlist" },
  { to: "/cart", label: "cart" },
];

const serviceLinks = [
  { to: "/orders", label: "trackOrder" },
  { to: "/profile", label: "myAccount" },
  { to: "/checkout", label: "checkout" },
  { to: "/login", label: "login" },
];

const socialIcons = [
  { label: "website", icon: Globe },
  { label: "email", icon: AtSign },
  { label: "share", icon: Share2 },
  { label: "support", icon: MessageCircle },
];

export default function Footer() {
  const { t } = useTranslation();
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
              {t("footerDescription")}
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {t("shop")}
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {t("customerService")}
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {currentYear} ShopAbdalrhman. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-2">
            {socialIcons.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={t(label)}
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
