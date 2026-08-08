import { CreditCard, Banknote } from "lucide-react";

export default function PaymentMethod({
  value,
  onChange,
  register,
  errors,
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Payment Method
      </h2>

      <div className="mt-5 space-y-3">
        {/* Credit / Debit Card */}
        <label
          className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
            value === "card"
              ? "border-primary bg-primary-light/50 ring-1 ring-primary"
              : "border-line hover:border-primary/40"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={value === "card"}
            onChange={() => onChange("card")}
            className="h-4 w-4 accent-primary"
          />
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
            <CreditCard size={20} />
          </span>
          <span className="text-sm font-semibold text-ink">
            Credit / Debit Card
          </span>
        </label>

        {/* Card fields (UI only) */}
        {value === "card" && (
          <div className="ml-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="cardNumber"
                className="mb-1 block text-sm font-medium text-ink"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                placeholder="4242 4242 4242 4242"
                {...register("cardNumber", {
                  required: "Card Number is required",
                  minLength: { value: 12, message: "Enter a valid card number" },
                })}
                className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {errors.cardNumber && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="expiry"
                className="mb-1 block text-sm font-medium text-ink"
              >
                Expiry Date
              </label>
              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                {...register("expiry", { required: "Expiry is required" })}
                className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {errors.expiry && (
                <p className="mt-1 text-xs text-red-600">{errors.expiry.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="mb-1 block text-sm font-medium text-ink"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                placeholder="123"
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: { value: /^\d{3,4}$/, message: "CVV must be 3–4 digits" },
                })}
                className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-600">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Cash on Delivery */}
        <label
          className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
            value === "cash"
              ? "border-primary bg-primary-light/50 ring-1 ring-primary"
              : "border-line hover:border-primary/40"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={value === "cash"}
            onChange={() => onChange("cash")}
            className="h-4 w-4 accent-primary"
          />
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Banknote size={20} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink">
              Cash on Delivery
            </span>
            <span className="block text-xs text-muted">
              Pay when your order arrives.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
