import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Container from "../components/layout/Container";
import ProductCard from "../components/products/ProductCard";
import useWishlist from "../hooks/useWishlist";
import products from "../data/products";
import usePageTitle from "../hooks/usePageTitle";
import { useToast } from "../components/ui/Toast";

export default function Wishlist() {
  const { t } = useTranslation();
  usePageTitle(`${t("wishlist")} | ShopAbdalrhman`);
  const { wishlistIds, clearWishlist } = useWishlist();
  const { showToast } = useToast();

  const wishlistProducts = products.filter((p) =>
    wishlistIds.includes(String(p.id))
  );

  const handleClearWishlist = () => {
    if (window.confirm(t("confirmClearWishlist"))) {
      clearWishlist();
      showToast(t("wishlistCleared"));
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("wishlistTitle")}
          </h1>
          <p className="mt-3 text-muted">
            {t("wishlistDescription")}
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {wishlistProducts.length}{" "}
            {t(wishlistProducts.length === 1 ? "savedItem" : "savedItems")}
          </p>
        </div>

        {/* Clear wishlist */}
        {wishlistProducts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleClearWishlist}
              className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
              {t("clearWishlist")}
            </button>
          </div>
        )}

        {/* Products grid or empty state */}
        {wishlistProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <Heart size={30} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">
              {t("wishlistEmpty")}
            </h2>
            <p className="mt-2 text-muted">
              {t("wishlistEmptyMessage")}
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <ShoppingBag size={16} />
              {t("exploreProducts")}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
