import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "../../store/cartStore";
import { useToast } from "../ui/Toast";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const { showToast } = useToast();

  const itemTotal = item.price * item.quantity;

  const handleRemove = () => {
    removeFromCart(item.id);
    showToast(`${item.name} removed from cart.`);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      {/* Image + name (navigate to product) */}
      <Link
        to={`/products/${item.id}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-ink transition-colors hover:text-primary">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-muted">${item.price.toFixed(2)}</p>
        </div>
      </Link>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="inline-flex items-center rounded-xl border border-line bg-white">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-l-xl text-muted transition-colors hover:bg-gray-50 hover:text-primary"
          >
            <Minus size={16} />
          </button>
          <span
            aria-live="polite"
            className="flex h-10 w-12 items-center justify-center border-x border-line text-sm font-semibold text-ink"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            aria-label={`Increase quantity of ${item.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-r-xl text-muted transition-colors hover:bg-gray-50 hover:text-primary"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Item total */}
        <div className="w-24 text-right">
          <p className="text-sm font-semibold text-ink">
            ${itemTotal.toFixed(2)}
          </p>
        </div>

{/* Remove */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
