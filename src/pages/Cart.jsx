import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import Container from "../components/layout/Container";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import useCartStore from "../store/cartStore";
import usePageTitle from "../hooks/usePageTitle";
import { useToast } from "../components/ui/Toast";

export default function Cart() {
  usePageTitle("Cart | ShopAbdalrhman");
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { showToast } = useToast();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      showToast("Your cart has been cleared.");
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm font-medium text-primary">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <ShoppingCart size={30} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">
              Your Cart is Empty
            </h2>
            <p className="mt-2 text-muted">
              Add some products to your cart and they'll appear here.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Clear cart */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleClearCart}
                className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>

            {/* Cart items + summary */}
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="lg:sticky lg:top-24 lg:self-start">
                <CartSummary />
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
