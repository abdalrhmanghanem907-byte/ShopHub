import { useState, useRef, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  CheckCircle2,
  Info,
  Truck,
  RotateCcw,
} from "lucide-react";
import Container from "../layout/Container";
import QuantitySelector from "./QuantitySelector";
import useWishlist from "../../hooks/useWishlist";
import useCartStore from "../../store/cartStore";
import { useToast } from "../ui/Toast";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const addToCart = useCartStore((s) => s.addToCart);
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  // Clear the pending timeout on unmount to prevent
  // setState on an unmounted component (which caused the white screen).
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity} × ${product.name} added to cart.`);
    setAdded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    showToast(
      inWishlist
        ? `${product.name} removed from wishlist.`
        : `${product.name} added to wishlist.`
    );
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Main product layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT: image */}
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="flex aspect-square items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full rounded-2xl object-contain"
              />
            </div>
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* RIGHT: details */}
          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.round(product.rating) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.round(product.rating) ? "" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-ink">
                {product.rating}
              </span>
              <span className="text-sm text-muted">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-ink">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle2 size={16} />
              In Stock
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-muted">
              {product.description}
            </p>

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary-dark sm:max-w-xs"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

<button
                type="button"
                onClick={handleToggleWishlist}
                aria-label={
                  inWishlist
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                aria-pressed={inWishlist}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                  inWishlist
                    ? "border-primary bg-primary text-white hover:bg-primary-dark"
                    : "border-line text-muted hover:border-primary hover:text-primary"
                }`}
              >
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Temporary added message */}
            {added && (
              <p className="mt-3 text-sm font-medium text-green-600">
                Added to cart ✓
              </p>
            )}

            {/* Product information */}
            <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Info size={18} className="text-primary" />
                Product Information
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-muted">Category</dt>
                  <dd className="font-medium text-ink">{product.category}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-muted">Availability</dt>
                  <dd className="font-medium text-green-600">In Stock</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-muted">Rating</dt>
                  <dd className="font-medium text-ink">{product.rating} / 5</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Reviews</dt>
                  <dd className="font-medium text-ink">
                    {product.reviews.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Shipping / Returns */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Truck size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Shipping</h3>
                  <p className="mt-1 text-xs text-muted">
                    Free shipping on orders over $50.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <RotateCcw size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Returns</h3>
                  <p className="mt-1 text-xs text-muted">30-day easy returns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
