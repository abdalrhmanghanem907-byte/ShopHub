import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useCartStore from "../../store/cartStore";

export default function CartSummary() {
  const navigate = useNavigate();
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Order Summary
      </h2>

      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium text-ink">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="font-medium text-ink">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-4">
          <dt className="text-base font-semibold text-ink">Total</dt>
          <dd className="text-lg font-bold text-ink">${total.toFixed(2)}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary-dark"
      >
        Proceed to Checkout
        <ArrowRight size={18} />
      </button>

      <p className="mt-4 text-center text-xs text-muted">
        Free shipping on orders over $50.
      </p>
    </div>
  );
}
