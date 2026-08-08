import { Truck, Zap, Gift } from "lucide-react";

const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 9.99,
    time: "Delivery in 5–7 business days",
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 19.99,
    time: "Delivery in 2–3 business days",
    icon: Zap,
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0,
    time: "Available for orders over $50",
    icon: Gift,
    requiresFree: true,
  },
];

export default function ShippingMethod({ value, onChange, subtotal }) {
  const freeEligible = subtotal >= 50;

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Shipping Method
      </h2>

      <div className="mt-5 space-y-3">
        {shippingOptions.map((option) => {
          const Icon = option.icon;
          const disabled = option.requiresFree && !freeEligible;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
                value === option.id
                  ? "border-primary bg-primary-light/50 ring-1 ring-primary"
                  : "border-line hover:border-primary/40"
              } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={value === option.id}
                onChange={() => onChange(option.id)}
                disabled={disabled}
                className="h-4 w-4 accent-primary"
              />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon size={20} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-ink">
                  {option.name}
                </span>
                <span className="block text-xs text-muted">{option.time}</span>
              </span>
              <span className="text-sm font-semibold text-ink">
                {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
              </span>
            </label>
          );
        })}
      </div>

      {!freeEligible && (
        <p className="mt-3 text-xs text-muted">
          Free Shipping unlocks when your subtotal reaches $50.
        </p>
      )}
    </div>
  );
}
