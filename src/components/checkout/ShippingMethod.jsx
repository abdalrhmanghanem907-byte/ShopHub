import { Truck, Zap, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";

const shippingOptions = [
  {
    id: "standard",
    name: "standardShipping",
    price: 9.99,
    time: "deliveryIn57",
    icon: Truck,
  },
  {
    id: "express",
    name: "expressShipping",
    price: 19.99,
    time: "deliveryIn23",
    icon: Zap,
  },
  {
    id: "free",
    name: "freeShipping",
    price: 0,
    time: "availableOver50",
    icon: Gift,
    requiresFree: true,
  },
];

export default function ShippingMethod({ value, onChange, subtotal }) {
  const { t } = useTranslation();
  const freeEligible = subtotal >= 50;

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        {t("shippingMethod")}
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
                  {t(option.name)}
                </span>

                <span className="block text-xs text-muted">
                  {t(option.time)}
                </span>
              </span>

              <span className="text-sm font-semibold text-ink">
                {option.price === 0
                  ? t("free")
                  : `$${option.price.toFixed(2)}`}
              </span>
            </label>
          );
        })}
      </div>

      {!freeEligible && (
        <p className="mt-3 text-xs text-muted">
          {t("freeShippingUnlocks")}
        </p>
      )}
    </div>
  );
}