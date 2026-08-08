import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, setQuantity }) {
  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="inline-flex items-center rounded-xl border border-line bg-white">
      <button
        type="button"
        onClick={decrease}
        aria-label="Decrease quantity"
        className="flex h-12 w-12 items-center justify-center rounded-l-xl text-muted transition-colors hover:bg-gray-50 hover:text-primary"
      >
        <Minus size={18} />
      </button>
      <span
        aria-live="polite"
        className="flex h-12 w-14 items-center justify-center border-x border-line text-base font-semibold text-ink"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={increase}
        aria-label="Increase quantity"
        className="flex h-12 w-12 items-center justify-center rounded-r-xl text-muted transition-colors hover:bg-gray-50 hover:text-primary"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
