export default function CheckoutSummary({ items, subtotal, shipping }) {
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {item.name}
              </p>
              <p className="text-xs text-muted">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-ink">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-3 border-t border-line pt-4 text-sm">
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
        <div className="flex items-center justify-between border-t border-line pt-3">
          <dt className="text-base font-semibold text-ink">Total</dt>
          <dd className="text-lg font-bold text-ink">${total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}
