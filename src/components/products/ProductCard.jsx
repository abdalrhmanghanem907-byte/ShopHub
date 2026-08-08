import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import useWishlist from "../../hooks/useWishlist";
import useCartStore from "../../store/cartStore";
import { useToast } from "../ui/Toast";

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);

  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : null;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart.`);
    setAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, 1500);
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
<div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name} details`}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && !product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
<button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            inWishlist
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={inWishlist}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors ${
            inWishlist
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-white/90 text-muted hover:bg-primary hover:text-white"
          }`}
        >
          <Heart
            size={18}
            fill={inWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {product.category}
        </p>

        {/* Product Name */}
        <Link
          to={`/products/${product.id}`}
          className="mt-1 line-clamp-1 text-base font-semibold text-ink transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                fill={
                  index < Math.round(product.rating)
                    ? "currentColor"
                    : "none"
                }
                className={
                  index < Math.round(product.rating)
                    ? ""
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="ml-1 text-xs text-muted">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">
            ${product.price.toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
            added
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          <span className="flex items-center gap-2">
            {added ? (
              <Check size={16} />
            ) : (
              <ShoppingCart size={16} />
            )}

            <span>{added ? "Added ✓" : "Add to Cart"}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
